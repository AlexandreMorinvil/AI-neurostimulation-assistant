from enum import Enum

class Action(str, Enum):
    START_SESSION = 'START_SESSION'
    RECEIVE_DATA_WATCH = 'RECEIVE_DATA_WATCH'
    EXECUTE_QUERY = 'EXECUTE_QUERY'
    GET_VIZUALIZATIONS = 'GET_VIZUALIZATIONS'

class Session_status(Enum):
    STOP = 0
    START = 1
