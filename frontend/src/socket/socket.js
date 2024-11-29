import {io} from 'socket.io-client'

console.log("Creating socket instance...");
const socket = io("http://localhost:5000", {
    transports: ["websocket"],
    reconnection: true, // Enable reconnection
    reconnectionAttempts: 10, // Retry 10 times
    reconnectionDelay: 500, // Initial delay between retries (ms)
    reconnectionDelayMax: 2000, // Max delay between retries (ms)
  });
  
  socket.on("connect", () => {
    console.log("Socket connected with ID:", socket.id);
  });
  
  socket.on("reconnect", (attemptNumber) => {
    console.log(`Socket reconnected after ${attemptNumber} attempts`);
  });
  
  socket.on("connect_error", (err) => {
    console.log("Socket connection error:", err);
  });

  socket.on("disconnect", (reason) => {
    console.warn("Socket disconnected due to:", reason);
  });
  
  export default socket;
  
