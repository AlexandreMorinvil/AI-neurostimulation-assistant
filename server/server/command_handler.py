import json
from typing import Union
from command import Action
from command import Session_status
from algorithm.NeuroAlgorithmPrediction import NeuroAlgorithmPrediction
from interface.session import Session
from .algorithm.vizualization import generate_heatmap_image

####################################################################################################
#### This class execute process depend of the command and the choosen mode
####################################################################################################
class CommandHandler:
    def __init__(self, socketIO):
        self.socketIO = socketIO
        self.ssid = None
        self.current_session = None

    ################################################################################################
    #### START_SESSION : Create a new session.
    #### EXECUTE_QUERY : Execute one iteration of the algorithme
    #### RECEIVE_DATA_WATCH : debug canal to recive watch data
    ################################################################################################
    def handle_command(self, action: int, arg: Union[int, dict, str]) -> Union[None, list, int]:
        
        print("Action :", action, ", Arguments :", arg)
        
        if action == Action.START_SESSION.value:
            # Arguments parsing
            dimention = int(arg["dimention"])
            n_param = int(arg["n_param"])

            # Handling : Create session
            self.current_session = Session(1, NeuroAlgorithmPrediction())
            self.current_session.algorithm.generate_space(dimention, n_param)
            
            # Response format
            return  { 
                "status" : Session_status.START.value
            }

        elif action == Action.EXECUTE_QUERY.value:
            # Arguments parsing
            A = int(arg["A"])
            B = int(arg["B"])
            y_value = float(arg["y_value"])
            
            # Handling : Execute query and generate vizualzations
            x_chanel = int(A) + int(B) * self.current_session.algorithm.dimension
            algorithm = self.current_session.algorithm
            position, values, next_query = algorithm.execute_query(x_chanel, y_value)
            heatmap_base64_jpeg_image = generate_heatmap_image(algorithm.ymu, 
                                                               [algorithm.dimension] * 2, 
                                                               "parameter #1", 
                                                               "parameter #2")

            # Response format
            return {
                "heatmap_base64_jpeg_image" : json.dumps(heatmap_base64_jpeg_image),
                "position":                   json.dumps(position),
                "values":                     json.dumps(values),
                "next_query":                 json.dumps(next_query)
            }

        elif action == Action.RECEIVE_DATA_WATCH.value:
            print(arg["value"])
            if(self.ssid):
                self.socketIO.emit('message', arg["value"], room=self.ssid)
