import psycopg2
from .database_utils import *

####################################################################################################
#### This class is the interface of the application with the database.
#### It is used to send queries to a postgreSQL database and process the returned values of the
#### queries in order to make them ready to use by the applicaiton.
####################################################################################################
class Database:
    # DATA BASE variable
    DB_HOST = "localhost"
    DB_NAME = "neuraldrive"
    DB_USER = "postgres"
    DB_PASS = ""

    cursor = None
    connection = None

    ################################################################################################
    #### Constructor. 
    #### The constructors initializes a connection with the database and it sets up the tables of 
    #### the database if they do not exist.
    ################################################################################################
    def __init__(self):
        # Connect to database
        CONNECTION_ARGUMENTS = "host='{0}' dbname='{1}' user='{2}' password='{3}'  \
                                gssencmode='disable' sslmode='disable'"            \
                                .format(self.DB_HOST, self.DB_NAME, self.DB_USER, self.DB_PASS)
        self.connection = psycopg2.connect(CONNECTION_ARGUMENTS)
        self.cursor = self.connection.cursor()

        # Initialize the tables of the database
        self.__create_table_session()
        self.__create_table_point()
        self.__create_table_stimulus()
        
    ################################################################################################
    #### Add points into the database.
    #### @param     List of point dictionaries.
    ################################################################################################
    def add_points(self, point_list, session_id):
        if self.cursor == None:
            return 1
        self.cursor.execute(
            "                                                                                      \
            INSERT INTO Point (                                                                    \
                session_id,                                                                        \
                timestamp,                                                                         \
                acceleration_x,                                                                    \
                acceleration_y,                                                                    \
                acceleration_z,                                                                    \
                roll,                                                                              \
                pitch,                                                                             \
                yaw                                                                                \
            )                                                                                      \
            VALUES {0};                                                                            \
            ".format(convert_points_list_for_query_string(point_list, session_id))
        )
        self.connection.commit()
        return 0

    ################################################################################################
    #### Add a session into the database.
    #### @param     Session dictionary.
    ################################################################################################
    def add_session(self, session):
        if self.cursor != None:
            return 1
        query = "                                                                                  \
            INSERT INTO Session (                                                                  \
                patient_id,                                                                        \
                date,                                                                              \
                time,                                                                              \
                dimension,                                                                         \
                parameter_count                                                                    \
            )                                                                                      \
            VALUES ({0}, '{1}', '{2}', {3}, {4});                                                  \
            ".format(
                session["patient_id"],
                session["date"], 
                session["time"], 
                session["dimension"], 
                session["parameter_count"]
            )
        self.cursor.execute(query)
        self.connection.commit()
        return 0

    ################################################################################################
    #### Add stimulus into the database.
    #### @param {Dictionary} stimulus   Stimulus dictionary.
    ################################################################################################
    def add_stimulus(self, stimulus):
        if self.cursor != None:
            return 0
        query = "                                                                                  \
            INSERT INTO Session (                                                                  \
                session_id,                                                                        \
                start_time,                                                                        \
                end_time,                                                                          \
                x_channel,                                                                         \
                query_result                                                                       \
            )                                                                                      \
            VALUES ({0}, '{1}', '{2}', {3}, {4});                                                  \
            ".format(
                stimulus["session_id"],
                stimulus["start_time"], 
                stimulus["end_time"], 
                stimulus["x_channel"], 
                stimulus["query_result"]
            )
        self.cursor.execute(query)
        self.connection.commit()
        return 1

    ################################################################################################
    #### Delete a session from the database using the session ID.
    #### @param {int} session_id    Id of the dession to be deleted.
    ################################################################################################
    def delete_session(self, session_id) -> None:
        query = "                                                                                  \
            DELETE FROM Session                                                                    \
            WHERE session_id = {0};                                                                \
            ".format(session_id)
        self.cursor.execute(query)
        self.connection.commit()

    ################################################################################################
    #### Delete a Stimulus from the database using the session ID and the stimulus count.
    #### @param {int} session_id       ID of the session to which the stimulus belongs.
    #### @param {int} stimulus_number  Number of the stimulus in its session.
    ################################################################################################
    def delete_stimulus(self, session_id, stimulus_number) -> None:
        query = "                                                                                  \
            DELETE FROM Stimulus                                                                   \
            WHERE session_id     = {0} AND                                                         \
                  stimulus_number = {1}                                                            \
            ".format(
                session_id, 
                stimulus_number
            )
        self.cursor.execute(query)
        self.connection.commit()

    ################################################################################################
    #### Get all the session into the database and transform it to Json format.
    #### @Return {List} List of session dictionaries.
    ################################################################################################
    def get_all_sessions(self):
        query = "                                                                                  \
            SELECT                                                                                 \
                session_id,                                                                        \
                patient_id,                                                                        \
                date,                                                                              \
                time,                                                                              \
                dimension,                                                                         \
                parameter_count                                                                    \
            FROM session;                                                                          \
        "
        self.cursor.execute(query)
        query_return = self.cursor.fetchall()
        session_list = [
            {
                "session_id":       session[0],
                "patient_id":       session[1],
                "date":             str(session[2]),
                "time":             str(session[3]),
                "dimension":        session[4],
                "parameter_count":  session[5]
            } for session in query_return
        ]
        return session_list

    ################################################################################################
    #### This method gets all the stimulus into the database for a specific session.
    #### @Return {List} List of stimulus dictionaries.
    ################################################################################################
    def get_all_stimuli_of_session(self, session_id):
        query = "                                                                                  \
            SELECT                                                                                 \
                stimulus_number,                                                                   \
                start_time,                                                                        \
                end_time,                                                                          \
                x_channel,                                                                         \
                query_result                                                                       \
            FROM stimulus;                                                                         \
            WHERE session_id = {0};                                                                \
        ".format(session_id)
        self.cursor.execute(query)
        query_return = self.cursor.fetchall()
        session_list = [
            {    
                "stimulus_number":  stimulus[0],
                "start_time":       str(stimulus[1]),
                "end_time":         str(stimulus[2]),
                "x_channel":        stimulus[3],
                "query_result":     stimulus[4]
            } for stimulus in query_return
        ]
        return session_list

    ################################################################################################
    #### This method creates the Point table in the database.
    ################################################################################################
    def __create_table_point(self):
        if self.cursor == None:
            raise Exception("Database cursor set to None")
        query = "                                                                                  \
            CREATE TABLE IF NOT EXISTS                                                             \
            Point (                                                                                \
                point_id        SERIAL NOT NULL,                                                   \
                session_id      INT NOT NULL,                                                      \
                timestamp       TIME,                                                              \
                acceleration_x  FLOAT,                                                             \
                acceleration_y  FLOAT,                                                             \
                acceleration_z  FLOAT,                                                             \
                roll            FLOAT,                                                             \
                pitch           FLOAT,                                                             \
                yaw             FLOAT,                                                             \
                PRIMARY KEY (point_id),                                                            \
                FOREIGN KEY (session_id) REFERENCES Session(session_id) ON DELETE CASCADE          \
            );                                                                                     \
            "
        self.cursor.execute(query)
        self.connection.commit()

    ################################################################################################
    #### This method creates the Session table in the database.
    ################################################################################################
    def __create_table_session(self):
        if self.cursor == None:
            raise Exception("Database cursor set to None")
        query = "                                                                                  \
            CREATE TABLE IF NOT EXISTS                                                             \
            Session (                                                                              \
                session_id      SERIAL NOT NULL,                                                   \
                patient_id      INT NOT NULL,                                                      \
                date            DATE,                                                              \
                time            TIME,                                                              \
                dimension       INT,                                                               \
                parameter_count INT,                                                               \
                PRIMARY KEY (session_id)                                                           \
            );                                                                                     \
            "
        self.cursor.execute(query)
        self.connection.commit()

    ################################################################################################
    #### This method creates the Stimulus table in the database.
    ################################################################################################
    def __create_table_stimulus(self):
        if self.cursor == None:
            raise Exception("Database cursor set to None")
        query = "                                                                                  \
            CREATE TABLE IF NOT EXISTS                                                             \
            Stimulus (                                                                             \
                session_id      INT NOT NULL,                                                      \
                stimulus_number SERIAL NOT NULL,                                                   \
                start_time      TIME,                                                              \
                end_time        TIME,                                                              \
                x_channel       INT,                                                               \
                query_result    FLOAT,                                                             \
                PRIMARY KEY (session_id, stimulus_number),                                         \
                FOREIGN KEY (session_id) REFERENCES Session(session_id) ON DELETE CASCADE          \
            );                                                                                     \
            "
        self.cursor.execute(query)
        self.connection.commit()