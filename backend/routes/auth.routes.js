import express from "express";
import { getAllUsers, getProfile, login, logout, signup, skipPlayer, submitRetention, toggleFinish } from "../controllers/auth.controller.js";
import protectRoute from "../middleware/auth.js";
const router = express.Router();

router.get("/profile",protectRoute,getProfile);
router.get("/fetch",getAllUsers);
router.post("/signup",signup);
router.post("/login",login); 
router.post("/logout",logout);
router.patch("/skip/:id",protectRoute,skipPlayer);
router.patch("/final",protectRoute,toggleFinish);
router.patch("/submit-retention",protectRoute,submitRetention);

export default router;