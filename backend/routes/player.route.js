import express from "express";
import protectRoute from "../middleware/auth.js";
import { createPlayer, getCategoryPlayers, getlastbidder, getOwnerDetails, getPlayedFor, getPlayer, getPlayerByName, getSearchPlayer, getSkippedUsers, getTeamPlayers, retainPlayer, topBuys } from "../controllers/player.controller.js";


const router = express.Router();

router.get("/re-search",protectRoute,getSearchPlayer);
router.get("/top-3",protectRoute,topBuys);
router.get("/:id",protectRoute,getPlayer);
router.get("/name/:name",protectRoute,getPlayerByName);
router.get("/playedFor/:id",protectRoute,getPlayedFor);
router.get("/lastbid/:id",protectRoute,getlastbidder);


router.get("/category/:category",protectRoute,getCategoryPlayers);
router.get("/team/:id",protectRoute,getTeamPlayers);
router.get("/skipped/:id",protectRoute,getSkippedUsers);
router.get("/owner/:id",protectRoute,getOwnerDetails);

router.post("/create",protectRoute,createPlayer);
router.patch("/retain/:id",protectRoute,retainPlayer);




export default router;