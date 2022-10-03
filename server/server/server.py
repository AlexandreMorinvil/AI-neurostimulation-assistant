import signal
from flask import Flask, request
from flask_cors import CORS, cross_origin
from flask_socketio import SocketIO
from flask import jsonify
from flask.wrappers import Response
from command_handler import CommandHandler

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
    #message['from'] = request.sid
    #socketio.emit('message', message, room=request.sid)
    #socketio.emit('message', message, room=message['to'])

@app.route("/packet/", methods=["POST", "GET"])
def packet() -> Response:
    response = "packet accepted"
    socketio.emit('message', '1', room=ssid)
    return jsonify({"content": response})


@app.route("/command", methods=["POST", "GET"])
def command() -> Response:
    data = request.get_json()
    response = None
    if data != None:
        response = command_handler.handle_command(data["action"], data["arg"])
    return jsonify({"content": response})






if __name__ == '__main__':
    socketio.run(app, debug=True)