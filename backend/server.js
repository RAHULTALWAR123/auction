import express from "express";
// import { Server } from "socket.io";
// import { createServer } from "http"
import { Server } from "socket.io";  
import { createServer} from "http";  
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import playerRoutes from "./routes/player.route.js";
import auctionRoutes from "./routes/auction.route.js";
import { connectDB } from "./lib/db.js";
import {v2 as cloudinary} from "cloudinary";
import cookieParser from "cookie-parser";

dotenv.config();


const app = express();
const server = createServer(app);
const io = new Server(server,{
    cors : {
        origin : "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true,
    }
});

io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    console.log("Total connected clients:", io.engine.clientsCount);
  

    socket.on("player-action", async ({ id, action }) => {
    console.log(`Player action: ${action} on player ${id}`);
    io.emit("update-player", { id, action }); 
    console.log("Emitted update-player for:", { id, action });
    });
  

    socket.on("disconnect", () => {
    console.log("a user disconnected", socket.id);
    console.log("Remaining clients:", io.engine.clientsCount);
    });
  });
  






const PORT = process.env.PORT || 5000;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/players", playerRoutes)
app.use("/api/auction",auctionRoutes)

server.listen(PORT, () => {
    console.log("Server is running on http://localhost:"+PORT);
    connectDB();
});