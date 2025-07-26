"use client";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

// Replace this with your real token retrieval logic
const TOKEN =
  typeof window !== "undefined" ? localStorage.getItem("token") : "";
console.log("Socket token:", TOKEN);
let socket: Socket;

if (typeof window !== "undefined") {
  socket = io("http://localhost:5000", {
    withCredentials: true,
    auth: {
      token: TOKEN,
    },
  });
}

// Demo: Hardcoded user IDs (replace with real auth/user logic)
const CURRENT_USER_ID = "6882069c215e3255b79e35b6";
const RECIPIENT_ID = "688207377947a71db1bbdb29";

export default function Home() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    { sender: string; content: string; createdAt: string }[]
  >([]);
  const [roomId, setRoomId] = useState<string | null>(null);

  useEffect(() => {
    if (!socket) {
      console.log("Socket not initialized");
      return;
    }

    console.log("Setting up socket events");

    socket.on("connect", () => {
      console.log("Connected to server:", socket.id);
      socket.emit("join room", { recipientId: RECIPIENT_ID });
    });

    socket.on("room joined", (roomId: string) => {
      console.log("Joined room:", roomId);
      setRoomId(roomId);
      setMessages([]);
    });

    socket.on("receive message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    return () => {
      socket.off("room joined");
      socket.off("receive message");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() && roomId) {
      socket.emit("send message", { roomId, content: message });
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-4 rounded shadow w-full max-w-md">
        <h1 className="text-xl font-bold mb-4">💬 Chat App</h1>
        <div className="h-60 overflow-y-auto border p-2 mb-4 rounded">
          {messages.map((msg, idx) => (
            <div key={idx} className="mb-1">
              <span className="font-semibold">{msg.sender}: </span>
              <span>{msg.content}</span>
              <span className="text-xs text-gray-400 ml-2">
                {new Date(msg.createdAt).toLocaleTimeString()}
              </span>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 border rounded p-2"
            placeholder="Type your message"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={!roomId}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
