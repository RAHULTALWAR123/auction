import express from "express";
// import { Server } from "socket.io";
// import { createServer } from "http"
import { Server } from "socket.io";
import { createServer } from "http";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import playerRoutes from "./routes/player.route.js";
import auctionRoutes from "./routes/auction.route.js";
import { connectDB } from "./lib/db.js";
import { v2 as cloudinary } from "cloudinary";
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config();


const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true,
    }
});

const __dirname = path.resolve();


const activeAuctions = new Map();

io.on("connection", (socket) => {
    console.log("A user connected", socket.id);


    socket.on("join-auction", (playerId) => {
        socket.join(`auction-${playerId}`);
        console.log(`User ${socket.id} joined auction for player ${playerId}`);


        const currentState = activeAuctions.get(playerId);
        if (currentState) {
            socket.emit("auction-state", currentState);
        }
    });


    socket.on("bid-update", async ({ playerId, newPrice, bidderId }) => {
        const auctionState = {
            playerId,
            currentPrice: newPrice,
            lastBidderId: bidderId,
            timestamp: Date.now()
        };

        activeAuctions.set(playerId, auctionState);


        io.to(`auction-${playerId}`).emit("bid-updated", auctionState);
    });


    socket.on("player-sold", ({ playerId, buyerId, finalPrice }) => {
        io.to(`auction-${playerId}`).emit("player-sold", {
            playerId,
            buyerId,
            finalPrice
        });
        activeAuctions.delete(playerId);
    });

    socket.on("player-skipped", ({ playerId, userId }) => {

        io.emit("player-skipped", {
            playerId,
            userId,
            action: "skip",
            timestamp: Date.now()
        });
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected", socket.id);
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
app.use("/api/auction", auctionRoutes)

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

server.listen(PORT, () => {
    console.log("Server is running on http://localhost:" + PORT);
    connectDB();
});