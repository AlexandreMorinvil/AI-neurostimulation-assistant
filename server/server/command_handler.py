import json
from typing import Union
from command import Action
from command import Session_status
from algorithm.NeuroAlgorithmPrediction import NeuroAlgorithmPrediction
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
    #### START_SESSION : Create a new session.
    #### EXECUTE_QUERY : Execute one iteration of the algorithme
    #### RECEIVE_DATA_WATCH : debug canal to recive watch data
    ################################################################################################
    def handle_command(self, action: int, arg: Union[int, dict, str]) -> Union[None, list, int]:
        if action == Action.START_SESSION.value:
            self.current_session = Session(1, NeuroAlgorithmPrediction())
            self.current_session.algorithm.generate_space(int(arg["dimention"]),int(arg["n_param"]))
            
            data = { "status" : Session_status.START.value}
            return data

        elif action == Action.EXECUTE_QUERY.value:
            x_chanel = int(arg["A"]) + int(arg["B"])*self.current_session.algorithm.dimension
            
            print("EXECUTE_QUERY for parameters :", int(arg["A"]), int(arg["B"]))
            heatmap_base64_jpeg_image, position, values, next_query = \
                self.current_session.algorithm.execute_query(x_chanel,float(arg["y_value"]))
            
            data = {
                "heatmap_base64_jpeg_image" : json.dumps(heatmap_base64_jpeg_image),
                "position":                   json.dumps(position),
                "values":                     json.dumps(values),
                "next_query":                 json.dumps(next_query)
            }
            return data

        elif action == Action.RECEIVE_DATA_WATCH.value:
            print(arg["value"])
            if(self.ssid):
                self.socketIO.emit('message', arg["value"], room=self.ssid)
