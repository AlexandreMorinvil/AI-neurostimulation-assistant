from flask import Flask, request
from flask_cors import CORS
from flask_socketio import emit, SocketIO

from database.database import Database

# Server initializations
app = Flask(__name__)
app.config['SECRET_KEY'] = 'dev'
CORS(app)

socketio = SocketIO(app, cors_allowed_origins="*")

####################################################################################################
### SocketIO
####################################################################################################
connections_set = set()
database = Database()

@socketio.on('connect')
def handle_connection():
    connections_set.add(request.sid)
    print("New User {request.sid} connected.\nCurrent users :", connections_set)

@socketio.on('disconnect')
def handle_disconnection():
    connections_set.discard(request.sid)
    print("User disconnected. Current users : ", connections_set)

@socketio.on('fetch_all_sessions')
def handle_fetch_all_sessions():
    all_sessions = database.get_sessions()
    emit(all_sessions, json=True)

@socketio.on('store_session')
def handle_store_session(session):
    database.add_session(session)

@socketio.on('store_smartwatch_accelerometer_points')
def handle_store_smartwatch_accelerometer_points(smartwatch_accelerometer_points):
    database.add_smartwatch_accelerometer_points(smartwatch_accelerometer_points)

@socketio.on('store_smartwatch_gyroscope_points')
def handle_store_smartwatch_gyroscope_points(smartwatch_gyroscope_points):
    database.add_smartwatch_gyroscope_points(smartwatch_gyroscope_points)

####################################################################################################
### Flask static frontend
####################################################################################################

@app.route("/")
def index():
    return 'Placeholder'

####################################################################################################
### Main function
####################################################################################################

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=9500)
