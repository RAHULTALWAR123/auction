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

        
        const users = await User.find({});
        
        if(users.length === player.isSkippedBy.length){
            player.isUnsold = true;
            await player.save();
        }
        
        res.json(player.isSkippedBy);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getOwnerDetails = async (req, res) => {
    try {
        const {id} = req.params;

        const player = await Player.findById(id).populate("owner", "username");

        if (!player) {
            return res.status(404).json({ message: "Player not found" });
        }

        res.json(player.owner);
    }catch(error){
        console.log(error);
        // res.status(500).json({ message: "Internal server error" });
    }
}

export const getPlayedFor = async(req,res) => {
    try {
        const {id} = req.params;

        const player = await Player.findById(id).populate("hasPlayedFor", "username");

        if (!player) {
            return res.status(404).json({ message: "Player not found" });
        }

        res.json(player.hasPlayedFor);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getlastbidder = async(req,res) => {
    try{
        const {id} = req.params;

        const player = await Player.findById(id).populate("lastBidder", "username");

        if (!player) {
            return res.status(404).json({ message: "Player not found" });
        }

        res.json({lastbid:player.lastBidder});

    }catch(error){
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getSearchPlayer = async (req, res) => {
    try {
        const {query} = req.query;

        const players = await Player.find({name: {$regex: query, $options: "i"}}).select("name img role style basePrice category owner isSold");

        if (!players) {
            return res.status(404).json({ message: "Players not found" });
        }

        res.status(200).json(players);
    }
    catch (error) {
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
        // res.status(500).json({ message: "Internal server error" });
    }
}

export const getPlayerByName = async (req, res) => {
    try{
        const {name} = req.params;

        // console.log("Player name:", name);
        const player = await Player.findOne({name});

        if (!player) {
            return res.status(404).json({ message: "Player not found" });
        }

        res.status(200).json(player);

    } catch (error) {
        console.log(error);
        console.log("Player name:", name);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const retainPlayer = async (req, res) => {
    try {
        const {id} = req.params;

        const player = await Player.findById(id);

        if (!player) {
            return res.status(404).json({ message: "Player not found" });
        }

        const currentUser = await User.findById(req.user._id);

        if (!currentUser) {
            return res.status(404).json({ message: "User not found" });
        }

        if(!currentUser.hasFinalized){
            return res.status(400).json({ message: "You need to finalize your team first" });
        }

        if(player.owner?.toString() !== req.user._id.toString()) {
            return res.status(400).json({ message: "You cannot retain this player" });
        }
        
        if(currentUser.retainCount === 0){
            return res.status(400).json({ message: "max limit reached" });
        }
        currentUser.retainCount -= 1;
        player.isRetained = true;
        await currentUser.save();
        await player.save();

        res.status(200).json({ message: "Player retained successfully", player: {name: player.name, img: player.img}  });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}


export const topBuys = async(req,res) => {
    try {
        const players = await Player.find({isSold: true,isRetained: false}).sort({basePrice: -1}).limit(3).select("name img role style basePrice category owner isSold");

        if (!players) {
            return res.status(404).json({ message: "Players not found" });
        }

        res.status(200).json(players);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}