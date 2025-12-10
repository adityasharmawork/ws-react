import { useEffect, useState } from 'react'
import './App.css'

function useSocket() {
  const [socket, setSocket] = useState<null | WebSocket>(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");

    socket.onopen = () => {
      console.log("Connected to WebSocket Server");
      setSocket(socket);
    };

    socket.onclose = () => {
      console.log("Disconnected from WebSocket Server");
    };

    return () => {
      socket.close();
    }

  }, []);

  return socket;
}

function App() {
  const socket = useSocket();
  const [latestMessage, setLatestMessage] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (!socket) return;
    socket.onmessage = (message) => {
      console.log("Message from WebSocket Server : ", message.data);
      setLatestMessage(message.data);
    };
  }, [socket]);

  if (!socket) {
    return <div>
      Connecting to WebSocket Server...
    </div>
  }

  return (
    <>
      {latestMessage}
      <br /> <br />
      <input type="text" onChange={(e) => setMessage(e.target.value)} />
      <button onClick={() => socket.send(message)}>
        Send
      </button>
    </>
  )
}

export default App
