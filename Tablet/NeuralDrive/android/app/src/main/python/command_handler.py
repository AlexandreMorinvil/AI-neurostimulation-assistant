from enum import Enum
from inspect import _void
import json
from lib2to3.pgen2.token import STAR
import sys
from typing import Callable, Union
from command import Action
from command import Session_status
from algorithm.NeuroAlgorithmPrediction import NeuroAlgorithmPrediction
from interface.session import Session
from interface.watchData import WatchData
import numpy as np
import random
#from database import Database

####################################################################################################
#### Represent the different mode available to tranfer data
#### SERIAL : watch - tablet - server - dataBase 
#### STAR : all data is pass to the server
####################################################################################################
class Mode(Enum):
    SERIAL = 0
    STAR = 1

####################################################################################################
#### This class execute process depend of the command and the choosen mode
####################################################################################################
class CommandHandler:
    def __init__(self, socketIO):
        self.stack_watch_data = []
        self.current_handler = None
        self.socketIO = socketIO
        self.ssid = None
        self.current_session = None
        # self.db : Database = Database()
        # self.db.connect()

####################################################################################################
#### START_SESSION : Create a new session.
#### EXECUTE_QUERY : Execute one iteration of the algorithme
#### RECEIVE_DATA_WATCH : debug canal to recive watch data
####################################################################################################
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


        elif action == Action.GET_WATCH_DATA.value:

            ### SIMULATION SANS MONTRE ##############################
            for i in range(10):
                n = str(random.randint(0, 9))
                data = WatchData(n,n,n,n,n,n).__dict__
                self.stack_watch_data.append(data)
            #########################################################

            if(len(self.stack_watch_data) > 0):
                data = self.stack_watch_data.copy()
                self.free_stack_watch_data()
                # print(data)
                print(data)
                return json.dumps(data)

        elif action == Action.SAVE_SESSION.value:
            print("save session")
            self.db.add_session(arg["session"])
            sessions = self.db.get_all_session()
            print(sessions)
            return sessions

        elif action == Action.DELETE_SESSION.value:
            print("delete session")
            self.db.delete_session(arg["id"])

        elif action == Action.GET_ALL_SESSION.value:
            sessions = self.db.get_all_session()
            print(sessions)
            return sessions






    def release(self, *_) -> None:
        if self.current_handler != None:
            self.current_handler.release()
        sys.exit(0)

    def push_watch_data_in_stack(self, data):
        self.stack_watch_data += data
        #print(self.stack_watch_data)
        print("push in stack")


    def free_stack_watch_data(self):
        self.stack_watch_data = []
        print("free stack")
