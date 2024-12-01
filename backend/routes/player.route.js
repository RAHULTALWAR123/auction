import express from "express";
import protectRoute from "../middleware/auth.js";
import { createPlayer, getCategoryPlayers, getOwnerDetails, getPlayer, getPlayerByName, getSkippedUsers, getTeamPlayers } from "../controllers/player.controller.js";

const router = express.Router();

router.get("/:id",protectRoute,getPlayer);
router.get("/name/:name",protectRoute,getPlayerByName);


router.get("/category/:category",protectRoute,getCategoryPlayers);
router.get("/team/:id",protectRoute,getTeamPlayers);
router.get("/skipped/:id",protectRoute,getSkippedUsers);
router.get("/owner/:id",protectRoute,getOwnerDetails);

router.post("/create",protectRoute,createPlayer);


export default router;