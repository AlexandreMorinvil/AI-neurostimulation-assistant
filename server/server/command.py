from enum import Enum

class Action(Enum):
    START_SESSION = 0
    CONNECT_WATCH = 1
    RECEIVE_DATA_WATCH = 2
    EXECUTE_QUERY = 3
    GET_WATCH_DATA = 4
    SAVE_SESSION = 5
    DELETE_SESSION = 6
    GET_ALL_SESSION = 7

class Session_status(Enum):
    STOP = 0
    START = 1
    



