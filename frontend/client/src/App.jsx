import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5001');

function App() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const sendMessage = () => {
    socket.emit('send_message', message);
    setMessage('');
  };

  useEffect(() => {
    socket.on('message', (data) => {
      setChat((prev) => [...prev, data]);
    });

    return () => socket.off('message');
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Live Chat</h2>
      <div>
        {chat.map((msg, i) => (
          <p key={i}>{msg}</p>
        ))}
      </div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
