from flask import Flask
from flask_socketio import SocketIO, send
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

@app.route('/')
def index():
    return "Flask Chat Server is running!"

@socketio.on('send_message')
def handle_message(data):
    print('Received message:', data)
    send(data, broadcast=True)

if __name__ == '__main__':
    socketio.run(app, host='127.0.0.1', port=5001)

