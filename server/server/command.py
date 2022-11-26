from enum import Enum

class Action(str, Enum):
    GET_VIZUALIZATIONS = 'GET_VIZUALIZATIONS'
    EXECUTE_QUERY = 'EXECUTE_QUERY'
    RECEIVE_DATA_WATCH = 'RECEIVE_DATA_WATCH'
    START_SESSION = 'START_SESSION'

class Session_status(Enum):
    STOP = 0
    START = 1
