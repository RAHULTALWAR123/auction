import Player from "../models/player.model.js";
import {v2 as cloudinary} from "cloudinary";
import User from "../models/user.model.js";

export const createPlayer = async (req, res) => {
    try {
        const {name,img,role,style,basePrice,category} = req.body;
        let cloudinaryResponse  = null;

        if (img) {
			cloudinaryResponse = await cloudinary.uploader.upload(img, { folder: "players" });
		}

        const newPlayer = await Player.create({
            name,
            img: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : "",
            role,
            style,
            basePrice,
            category
        })

        await newPlayer.save();

        res.status(201).json(newPlayer);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getCategoryPlayers = async (req, res) => {
    try {
        const {category} = req.params;

        const players = await Player.find({category});

        if (!players) {
            return res.status(404).json({ message: "Players not found" });
        }

        res.status(200).json(players);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getPlayer = async (req, res) => {
    try {
        
        const {id} = req.params;

        const player = await Player.findById(id);

        if (!player) {
            return res.status(404).json({ message: "Player not found" });
        }

        res.status(200).json(player);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getSkippedUsers = async (req, res) => {
    try {
        const {id} = req.params;

        const player = await Player.findById(id).populate("isSkippedBy", "username _id budget");

        if (!player) {
            return res.status(404).json({ message: "Player not found" });
        }

        res.json(player.isSkippedBy);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}


export const getTeamPlayers = async (req, res) => {
    try {
        const {id} = req.params;

        const user  = await User.findById(id).populate("team", "name img role style basePrice category");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user.team);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}