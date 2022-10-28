from enum import Enum

class Action(Enum):
    START_SESSION = 0
    CONNECT_WATCH = 1
    RECEIVE_DATA_WATCH = 2
    EXECUTE_QUERY = 3
    GET_WATCH_DATA = 4

class Session_status(Enum):
    STOP = 0
    START = 1
    



