import json
import psycopg2
from interface.session import Session

#############################################################################
#### This class represent the data base of our application.
#### It is use to communicate whith a postgre data base and
#### to stock the current connected drones.
#############################################################################
class Database:
    # DATA BASE variable
    DB_HOST = "0.0.0.0"
    DB_NAME = "NeuralDriveDB"
    DB_USER = "postgres"
    DB_PASS = "postgres"


    #############################################################################
    #### this fonction is call at the ceation of the object, it try to connect
    #### the server with the data base
    #############################################################################
    def __init__(self):
        try:
            self.conn = psycopg2.connect(
                dbname=self.DB_NAME,
                user=self.DB_USER,
                password=self.DB_PASS,
                host=self.DB_HOST,
            )
            self.cur = self.conn.cursor()
            self.cur.execute(
                "CREATE TABLE IF NOT EXISTS Mission ( id INT NOT NULL, watch_data VARCHAR[], heat_map VARCHAR[],PRIMARY KEY (Id));"
            )
            self.conn.commit()
        except psycopg2.Error:
            pass

    #############################################################################
    #### Add mission into the database
    #### @param {Mission} mission
    #############################################################################
    def add_session_save(self, session):
        if self.cur != None:
            self.cur.execute(
                "INSERT INTO mission (id, watch_data, heat_map) VALUES ({0}, ARRAY{1}, ARRAY{2});".format(
                    session.id, session.watch_data, session.heat_map
                )
            )
            self.conn.commit()
            return 1
        return 0

    #############################################################################
    #### Get all the missions into the database and transform it to Json format
    #### @Return {Json} lis of mission
    #############################################################################
    def get_all_session_save(self):
        query = "SELECT * FROM mission;"
        self.cur.execute(query)
        return self.cur.fetchall()


    #############################################################################
    #### Delete a mission on the data base using the ID
    #### @param {String} id
    #############################################################################
    def delete_mission(self, mission) -> None:
        query = "DELETE FROM mission WHERE id = '{0}';".format(mission["id"])
        self.cur.execute(query)
        self.conn.commit()

if __name__ == '__main__':  
    db = Database()
    #session_save = Session_save(1, [0,0,1,1],  [0,0,1,1])
    #db.add_session_save(session_save)
    sessionsRAW = db.get_all_session_save()
    list_sessions = []
    for session in sessionsRAW:
        new_session = Session(session[0], session[1], session[2])
        print(new_session.__dict__)
        list_sessions.append(new_session)

    
