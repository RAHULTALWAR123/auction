import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, enum:["MI","CSK","RCB","RR","DC","KKR","SRH","PBKS"] , required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  logo: { type: String },
  budget: { type: Number, default: 80 },
  team: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: "Player", 
}],
  role: { type: String, enum: ["admin", "user"], default: "user" },
  skipped: [
    {
      player: { type: mongoose.Schema.Types.ObjectId, ref: "Player" },
      status: { type: Boolean, default: false },
    },
  ],
},{ timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
