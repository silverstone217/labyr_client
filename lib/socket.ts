import { ENDPOINT_URL } from "@/utils/envVariables";
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const getSocket = (): Socket => {
  if (!socket) {
    socket = io(ENDPOINT_URL, {
      transports: ["websocket"], // optionnel mais recommandé
    });
  }
  return socket;
};
