from enum import Enum
from inspect import _void
import json
from lib2to3.pgen2.token import STAR
import sys
from typing import Callable, Union
from command import Command
from algorithm.NeuroAlgorithmPrediction import NeuroAlgorithmPrediction


class Mode(Enum):
    SERIAL = 0
    STAR = 1


class CommandHandler:
    def __init__(self, socketIO):
        self.current_handler = None
        self.socketIO = socketIO


    def handle_command(self, command: int, arg: Union[int, dict, str]) -> Union[None, list, int]:
        if command == Command.START_ALGORITHM.value:
            Algo = NeuroAlgorithmPrediction()
            Algo.generate_space(int(arg["dimention"]),int(arg["n_param"]))
            response = Algo.run()
            data = { 
                "data" : json.dumps(response[0]), 
                "position" : json.dumps(response[1]), 
                "n_param" :  Algo.n_param,
                "dimention" : Algo.dimention}
            return data
            

        elif command == Command.RECEIVE_DATA_WATCH.value:
           self.socketIO.emit('message', arg, room=ssid)


    def release(self, *_) -> None:
        if self.current_handler != None:
            self.current_handler.release()
        sys.exit(0)


