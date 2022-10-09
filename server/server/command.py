from enum import Enum

class Command(Enum):
    START_SESSION = 0
    CONNECT_WATCH = 1
    RECEIVE_DATA_WATCH = 2
    EXECUTE_QUERY = 3
    
