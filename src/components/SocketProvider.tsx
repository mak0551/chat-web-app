"use client";
import { createContext, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

export const SocketContext = createContext<Socket | null>(null);

export default function SocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io("http://localhost:5000", {
      withCredentials: true,
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
}
