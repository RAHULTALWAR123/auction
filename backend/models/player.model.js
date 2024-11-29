import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  img: { type: String, required: true },
  role: { 
    type: String, 
    enum: ["Batsman", "Bowler", "All-Rounder", "Wicket-Keeper"], 
    required: true 
  },
  style: { 
    type: String, 
    enum: ["Right-Hand", "Left-Hand"], 
    required: true 
  },
  category: { type: String,
              enum: ["Marquee","Batsman", "Bowler", "AllRounder"],
              required: true 
  },
  isSkippedBy:[{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  basePrice: { type: Number, required: true },
  bidPrice: { type: Number, default: 0 },
  isSold: { type: Boolean, default: false },
  soldPrice: { type: Number, default: 0 },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  lastBidder: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
}, { timestamps: true });

const Player = mongoose.model("Player", playerSchema);
export default Player;
