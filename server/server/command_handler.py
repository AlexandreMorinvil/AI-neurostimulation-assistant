import json
from typing import Union
from command import Action
from command import Session_status
from algorithm.NeuroAlgorithmPrediction import NeuroAlgorithmPrediction
from algorithm.vizualization import generate_heatmap_image
from interface.session import Session

####################################################################################################
#### This class execute process depend of the command and the choosen mode
####################################################################################################
class CommandHandler:
    def __init__(self, socketIO):
        self.socketIO = socketIO
        self.ssid = None
        self.current_session = None

    ################################################################################################
    #### Execute command and return resulting values
    ################################################################################################
    def handle_command(self, action: int, arg: Union[int, dict, str]) -> Union[None, list, int]:
        
        print("Action :", action, ", Arguments :", arg)

        if action == Action.EXECUTE_QUERY.value:
            # Arguments parsing
            parameters_value_list = [int(value) for value in arg["parameters_value_list"]]
            tremor_metric = float(arg["tremor_metric"])
            
            # Handling : Execute query and generate vizualzations
            algorithm = self.current_session.algorithm
            position, next_query = algorithm.execute_query(parameters_value_list, tremor_metric)

            # Response format
            return {
                "suggested_parameters_list":            json.dumps(next_query)
            }

        elif action == Action.GET_VIZUALIZATIONS.value:

            # Arguments parsing
            first_parameter_index = int(arg["first_parameter"])
            second_parameter_index = int(arg["second_parameter"])
            first_parameter_name = str(arg["first_parameter_name"])
            second_parameter_name = str(arg["second_parameter_name"])
            
            # Handling : Generate vizualzations
            algorithm = self.current_session.algorithm
            heatmap_base64_jpeg_image = generate_heatmap_image(algorithm.ymu, 
                                                               algorithm.dimensions_list,
                                                               first_parameter_index,
                                                               second_parameter_index,
                                                               second_parameter_name,
                                                               first_parameter_name)

            # Response format
            return {
                "heatmap_base64_jpeg_image" :           json.dumps(heatmap_base64_jpeg_image),
                "parameter_graph_base64_jpeg_image":    "",
            }

        elif action == Action.RECEIVE_DATA_WATCH.value:
            print(arg["value"])
            if(self.ssid):
                self.socketIO.emit('message', arg["value"], room=self.ssid)
    
        elif action == Action.START_SESSION.value:
            # Arguments parsing
            dimensions = arg["dimensions"]

            # Handling : Create session
            self.current_session = Session(1, NeuroAlgorithmPrediction())
            self.current_session.algorithm.generate_space(dimensions)
            
            # Response format
            return  { 
                "status" : Session_status.START.value
            }
