import { io } from 'socket.io-client';

const socket = io("http://localhost:5000", {
  transports: ["websocket"],
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 500,
  reconnectionDelayMax: 2000,
});


socket.on("connect", () => {
  console.log("Socket connected with ID:", socket.id);
});

socket.on("reconnect", (attemptNumber) => {
  console.log(`Socket reconnected after ${attemptNumber} attempts`);
});

socket.on("connect_error", (err) => {
  console.error("Socket connection error:", err);
});

socket.on("disconnect", (reason) => {
  console.warn("Socket disconnected due to:", reason);
  if (reason === "io server disconnect") {
    socket.connect();
  }
});

export default socket;