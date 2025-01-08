import express from "express";
import protectRoute from "../middleware/auth.js";
import { enterBid, getGroqAiSuggest, rtmPlayer, sellPlayer } from "../controllers/auction.controller.js";

const router = express.Router();

router.patch("/bid/:id",protectRoute,enterBid);
router.post("/sold/:id",protectRoute,sellPlayer);
router.post("/ai-suggest/:id",protectRoute,getGroqAiSuggest);
router.post("/rtm/:id",protectRoute,rtmPlayer);


export default router;