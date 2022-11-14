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


    def connect(self):
        try:
            self.conn = psycopg2.connect(
                dbname=self.DB_NAME,
                user=self.DB_USER,
                password=self.DB_PASS,
                host=self.DB_HOST,
            )
            self.cur = self.conn.cursor()
            self.cur.execute(
                "CREATE TABLE IF NOT EXISTS Session ( id INT NOT NULL, watch_data VARCHAR[], heat_map VARCHAR[], username VARCHAR(20),PRIMARY KEY (Id));"
            )
            self.conn.commit()
            return True
        except psycopg2.Error:
            return False

    #############################################################################
    #### Add mission into the database
    #### @param {Mission} mission
    #############################################################################
    def add_session(self, session):
        print(session)
        if self.cur != None:
            self.cur.execute(
                "INSERT INTO Session (id, watch_data, heat_map, username) VALUES ({0}, ARRAY{1}, ARRAY{2}, '{3}');".format(
                   session['id'], session['watch_data'], session['heat_map'], session['username']
                )
            )
            self.conn.commit()
            return 1
        return 0

    #############################################################################
    #### Get all the missions into the database and transform it to Json format
    #### @Return {Json} lis of mission
    #############################################################################
    def get_all_session(self):
        query = "SELECT * FROM Session;"
        self.cur.execute(query)
        return self.cur.fetchall()


    #############################################################################
    #### Delete a mission on the data base using the ID
    #### @param {String} id
    #############################################################################
    def delete_session(self, id) -> None:
        query = "DELETE FROM mission WHERE id = '{0}';".format(id)
        self.cur.execute(query)
        self.conn.commit()

if __name__ == '__main__':  
    db = Database()
    db.connect()
    session= Session(1, [0,0,1,1],  [0,0,1,1])
    #db.add_session(session)
    sessionsRAW = db.get_all_session()
    list_sessions = []
    for session in sessionsRAW:
        new_session = Session(session[0], session[1], session[2])
        print(new_session.__dict__)
        list_sessions.append(new_session)
    db.delete_session('1')

    
