import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [socket, setSocket] = useState<null | WebSocket>(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    
    socket.onopen = () => {
      console.log("Connected to WebSocket Server");
      setSocket(socket);
    };

    socket.onmessage = (message) => {
      console.log("Message from WebSocket Server : ", message.data);
    };

    socket.onclose = () => {
      console.log("Disconnected from WebSocket Server");
    };

    return () => {
      socket.close();
    }

  }, []);

  if(!socket) {
    return <div>
      Connecting to WebSocket Server...
    </div>
  }

  return (
    <>

    </>
  )
}

export default App
