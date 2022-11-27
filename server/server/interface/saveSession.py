from datetime import date
from datetime import datetime
import os
import json

SAVE_SESSIONS_PATH = 'storage'

class SaveSession():
    session_id = None
    patient_id = None
    date = None
    time = None
    parameter_count = None
    points = []
    querys = []

    def __init__(self, session_id, patient_id,parameter_count, points,querys) -> None:
        self.session_id = session_id
        self.patient_id = patient_id
        self.date = date.today().strftime("%d/%m/%Y")
        self.time = datetime.now().strftime("%H:%M:%S")
        self.parameter_count = parameter_count
        self.points = points
        self.querys = querys



def save_session_local(session):
    print(' save localy --------------------------')
    print(session.__dict__)
    json_object = json.dumps(session.__dict__, indent=4)
    
    with open("storage/"+ str(session.session_id) + ".json", "w") as outfile:
        outfile.write(json_object)

    return get_all_save_sessions()

def get_all_save_sessions():
    listSaveSessionsID = []
    for file in get_files():
        id = int(file.split('.')[0])
        listSaveSessionsID.append(id)
        print(id)
    return listSaveSessionsID

def get_files():
   for file in os.listdir(SAVE_SESSIONS_PATH):
        if os.path.isfile(os.path.join(SAVE_SESSIONS_PATH, file)):
            yield file


def get_session_by_ID(id):
    f = open(SAVE_SESSIONS_PATH+'/'+ str(id) + '.json')
    data = json.load(f)
    print(data)
    return(data)