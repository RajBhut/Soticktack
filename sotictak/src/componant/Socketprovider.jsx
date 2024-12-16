import React, { createContext, useEffect, useState } from "react";
import io from "socket.io-client";

const SocketContext = createContext();

export default function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const url = "https://soticktack-59a552ec0a64.herokuapp.com";
  // const url = "http://localhost:3000";
  useEffect(() => {
    const newSocket = io(url, {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    newSocket.on("connect", () => {
      setSocket(newSocket);

      newSocket.emit("get_available_games");
    });

    newSocket.on("avalable_games_out", (data) => {});

    newSocket.on("connect_error", (error) => {});

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}

export { SocketContext };
