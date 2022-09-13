from enum import Enum
import sys
from .database import Database


class Mode(Enum):
    CRAZYFLIE = 0
    SIMULATION = 1


class CommandHandler:
    def __init__(self):
        self.database = Database()
        self.current_handler = None
        self.current_mode = 2


    # def handle_command(
    #     self, command: int, arg: Union[int, dict, str]
    # ) -> Union[None, list, int]:
    #     if command == Command.MODE.value:
    #         self.change_mode(arg)
    #     elif command == Command.NEW_MISSION.value:
    #         self.database.add_mission(arg)

    #     elif command == Command.MISSION_HISTORY.value:
    #         return self.database.get_mission_history()

    #     elif command == Command.DELETE_MISSION.value:
    #         self.database.delete_mission(arg)

    #     else:
    #         if self.current_handler != None:
    #             return self.current_handler.handle_command(command, str(arg))


    def release(self, *_) -> None:
        if self.current_handler != None:
            self.current_handler.release()
        sys.exit(0)

    def get_state(self) -> str:
        return "You are connected !"
