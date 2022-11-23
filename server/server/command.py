from enum import Enum

class Action(str, Enum):
    START_SESSION = 'START_SESSION'
    CONNECT_WATCH = 'CONNECT_WATCH'
    RECEIVE_DATA_WATCH = 'RECEIVE_DATA_WATCH'
    EXECUTE_QUERY = 'EXECUTE_QUERY'
    GET_WATCH_DATA = 'GET_WATCH_DATA'

class Session_status(Enum):
    STOP = 0
    START = 1
