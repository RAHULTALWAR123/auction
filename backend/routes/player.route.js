import express from "express";
import protectRoute from "../middleware/auth.js";
import { createPlayer, getCategoryPlayers, getPlayer, getSkippedUsers, getTeamPlayers } from "../controllers/player.controller.js";

const router = express.Router();


router.get("/category/:category",protectRoute,getCategoryPlayers);
router.get("/team/:id",protectRoute,getTeamPlayers);
router.get("/skipped/:id",protectRoute,getSkippedUsers);
router.get("/:id",protectRoute,getPlayer);
router.post("/create",protectRoute,createPlayer);


export default router;