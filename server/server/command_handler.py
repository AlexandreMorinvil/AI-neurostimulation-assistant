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
            x_chanel = int(arg["A"]) + int(arg["B"])*self.current_session.algorithm.dimention
            print("x_chanel = ", x_chanel)
            output = self.current_session.algorithm.execute_query(x_chanel,float(arg["y_value"]))
            print("EXECUTE_QUERY")
            # print(output[0])
            data = {
                "predict_heat_map" : json.dumps(output[0]),
                "position": json.dumps(output[1]),
                "values": json.dumps(output[2]),
                "next_query": output[3]
                }
            print(data)
            return data

        elif action == Action.RECEIVE_DATA_WATCH.value:
            print(arg["value"])
            if(self.ssid):
                # print(arg["value"])
                self.socketIO.emit('message', arg["value"], room=self.ssid)
