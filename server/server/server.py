import json
import signal
from flask import Flask, request
from flask_cors import CORS, cross_origin
from flask_socketio import SocketIO
from flask import jsonify
from flask.wrappers import Response
from command_handler import CommandHandler
import numpy as np


app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")
CORS(app)
ssid = None


command_handler = CommandHandler(socketio)

signal.signal(signal.SIGINT, command_handler.release)
signal.signal(signal.SIGTERM, command_handler.release)



users = {}
@socketio.on('disconnect')
def on_disconnect():
    users.pop(request.sid,'No user found')
    socketio.emit('current_users', users)
    print("User disconnected!\nThe users are: ", users)

@socketio.on('message')
def messaging(message, methods=['GET', 'POST']):
    print('received message: ' + str(message))
    ssid = request.sid
    command_handler.ssid = ssid
    socketio.emit('message', 'reponseVersNoe', room=request.sid)

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
    print(data)
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