import mongoose from "mongoose";

const auctionSchema = new mongoose.Schema({
  player: { type: mongoose.Schema.Types.ObjectId, ref: "Player", required: true },
  basePrice: { type: Number, required: true },
  finalPrice: { type: Number },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { 
    type: String, 
    enum: ["Open", "Closed"], 
    default: "Open" 
  },
  bids: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      amount: { type: Number },
    },
  ],
},{ timestamps: true });

const Auction = mongoose.model("Auction", auctionSchema);
export default Auction;
