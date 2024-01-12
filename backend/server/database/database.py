import os
from unqlite import UnQLite

class Database:

    # Create an in-memory database.
    db = UnQLite(os.path.join(os.path.expanduser("~"), "NeurostimAI", "neurostimai.db"))

    sessions = None
    smartwatch_accelerometer_points = None
    smartwatch_gyroscope_points = None

    """
    Constructor.    
    """
    def __init__(self):
        self.create_collections()

    """
    Create the collections if they do not exist.    
    """
    def create_collections(self) -> None:

        self.db = UnQLite(os.path.join(os.path.expanduser("~"), 
                         "NeurostimAI", 
                         "neurostimai.db"))

        self.sessions = self.db.collection('sessions')
        self.sessions.create()

        self.smartwatch_accelerometer_points = self.db.collection('SmartwatchAaccelerometerPoints')
        self.sessions.create()

        self.smartwatch_gyroscope_points = self.db.collection('SmartwatchGyroscopePoints')
        self.sessions.create()

    """
    Add session to the database.
    """
    def add_session(self, session: dict) -> None:
        self.sessions.store(session)

    """
    Add smartwatch accelerometer points to the database.
    """
    def add_smartwatch_accelerometer_points(self, smartwatch_accelerometer_points: list) -> None:
        self.smartwatch_accelerometer_points.store(smartwatch_accelerometer_points)

    """
    Add smartwatch gyroscope points to the database.
    """
    def add_smartwatch_gyroscope_points(self, smartwatch_gyroscope_points: list) -> None:
        self.add_smartwatch_gyroscope_points.store(smartwatch_gyroscope_points)

    """
    Get sessions from the database.
    """
    def get_sessions(self) -> list:
        sessions = self.sessions.fetch()
        return sessions

# Main function
if __name__ == '__main__':
    database = Database()
    print('Test')