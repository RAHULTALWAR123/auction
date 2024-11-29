import express from "express";
import protectRoute from "../middleware/auth.js";
import { enterBid, sellPlayer } from "../controllers/auction.controller.js";

const router = express.Router();

router.patch("/bid/:id",protectRoute,enterBid);
router.post("/sold/:id",protectRoute,sellPlayer);


export default router;