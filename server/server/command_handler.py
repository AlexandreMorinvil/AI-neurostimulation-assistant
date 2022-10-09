from enum import Enum
from inspect import _void
import json
from lib2to3.pgen2.token import STAR
import sys
from typing import Callable, Union
from command import Command
from algorithm.NeuroAlgorithmPrediction import NeuroAlgorithmPrediction
from interface.session import Session


class Mode(Enum):
    SERIAL = 0
    STAR = 1


class CommandHandler:
    def __init__(self, socketIO):
        self.current_handler = None
        self.socketIO = socketIO
        self.ssid = None
        self.current_session = None


    def handle_command(self, command: int, arg: Union[int, dict, str]) -> Union[None, list, int]:
        if command == Command.START_SESSION.value:
            self.current_session = Session(1, NeuroAlgorithmPrediction())
            self.current_session.algorithm.generate_space(int(arg["dimention"]),int(arg["n_param"]))
            data = { 
                "data" : "start new session"}
            return data

        
        elif command == Command.EXECUTE_QUERY.value:
            output = self.current_session.algorithm.execute_query(int(arg["x_chanel"]),float(arg["y_value"]))
            print("EXECUTE_QUERY")
            data = { 
                "predict_heat_map" : json.dumps(output[0]),
                "position": json.dumps(output[1])
                }
            return data

        elif command == Command.RECEIVE_DATA_WATCH.value:
            print(arg["value"])
            if(self.ssid):
                print(arg["value"])
                self.socketIO.emit('message', arg["value"], room=self.ssid)


    def release(self, *_) -> None:
        if self.current_handler != None:
            self.current_handler.release()
        sys.exit(0)


