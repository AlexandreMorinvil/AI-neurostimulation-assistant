from datetime import date
from datetime import datetime
import json

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