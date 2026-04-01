"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getSocket } from "@/lib/socket";
import type { Socket } from "socket.io-client";

type SocketContextType = {
  socket: Socket;
  socketId: string | null;
};

const SocketContext = createContext<SocketContextType | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  // ✅ socket créé UNE seule fois (pas de setState)
  const socket = getSocket();

  const [socketId, setSocketId] = useState<string | null>(null);

  useEffect(() => {
    const handleConnect = () => {
      console.log("Connected:", socket.id);
      setSocketId(socket.id ?? null);
    };

    socket.on("connect", handleConnect);

    return () => {
      socket.off("connect", handleConnect);
      socket.disconnect();
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket, socketId }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within SocketProvider");
  }
  return context;
};
