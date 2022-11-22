import logging
import json
import signal
from flask import Flask, request
from flask_cors import CORS, cross_origin
from flask_socketio import SocketIO, emit
from flask import jsonify
from flask.wrappers import Response
from command_handler import CommandHandler
import numpy as np


app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")
CORS(app)
ssid = None

logging.getLogger('socketio').setLevel(logging.ERROR)
logging.getLogger('engineio').setLevel(logging.ERROR)
logging.getLogger('werkzeug').setLevel(logging.ERROR)

command_handler = CommandHandler(socketio)

signal.signal(signal.SIGINT, command_handler.release)
signal.signal(signal.SIGTERM, command_handler.release)



users = set()
watches = set()
@socketio.on('connect')
def handle_connection():
    users.add(request.sid)
    print("New User {request.sid} connected.  Current users :", users)

@socketio.on('disconnect')
def handle_disconnection():
    users.discard(request.sid)
    print("User disconnected. Current users : ", users)

@socketio.on('watch_packet')
def handle_watch_packet(watch_packet):
    emit('watch_packet', watch_packet, broadcast=True, includde_self=False)

####################################################################################################
#### Only for debug
####################################################################################################
@app.route("/packet/", methods=["POST", "GET"])
def packet() -> Response:
    data = request.data.decode('UTF-8')
    print(data)
    response = "packet accepted"
    socketio.emit('message', '1', room=ssid)
    return jsonify({"content": response})


####################################################################################################
#### Only for debug
####################################################################################################
@app.route("/watch_packet/", methods=["POST", "GET"])
def watch_packet() -> Response:
    data = request.data.decode('UTF-8')
    print(len(command_handler.stack_watch_data))
    if(len(command_handler.stack_watch_data)<50):
        command_handler.push_watch_data_in_stack(json.loads(data))
    response = "packet accepted"
    socketio.emit('message', data, room=ssid)
    return jsonify({"content": response})


####################################################################################################
#### Recive command form client
#### See command enum
####################################################################################################
@app.route("/command", methods=["POST", "GET"])
def command() -> Response:
    data = request.get_json()
    print(data)
    response = None
    if data != None:
        response = command_handler.handle_command(data["action"], data["arg"])
    return jsonify({"content": response})


if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0')