import Player from "../models/player.model.js";
import User from "../models/user.model.js";
import Groq from "groq-sdk";
import dotenv from "dotenv";
import { trusted } from "mongoose";

dotenv.config();

const groq = new Groq({apiKey: process.env.AI_API_KEY});

export const enterBid = async (req, res) => {
    try {
        const player = await Player.findById(req.params.id);
        if (!player) {
            return res.status(404).json({ message: "Player not found" });
        }
        
        if (player.isSold) {
            return res.status(400).json({ message: "Player already sold" });
        }
        
        const currentUser = await User.findById(req.user._id);

        if (!currentUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const playerSkipped = currentUser.skipped.find((entry) => entry.player?.toString() === player._id.toString() && entry.status === true);

        if (playerSkipped) {
            return res.status(400).json({ message: "Player is skipped , u cant bid again" });
        }
        

        if(player.lastBidder?.toString() === req.user._id.toString()){
            return res.status(400).json({ message: "wait for other user to bid first" });
        }

        const base = player.basePrice;

        const bid = 0.25;
        let currentPrice = base + bid;
        player.basePrice = currentPrice;

        player.lastBidder = req.user._id;

        await player.save();

        res.status(200).json({
        message: "Bid placed successfully",
        player,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const sellPlayer = async (req, res) => {
    try {
        const {id} = req.params;
        const currentUser = await User.findById(req.user._id);

        if(!currentUser){
            return res.status(404).json({error: "user not found"});
        }

        const player = await Player.findById(id);

        if(!player){
            return res.status(404).json({message: "player not found"});
        }

        if(player.isSold){
            return res.status(400).json({message: "player already sold"});
        }

        const users = await User.find({ _id: { $ne: req.user._id } });

        const currSkipped = currentUser.skipped.find((entry) => entry.player?.toString() === player._id.toString() && entry.status === true);

        if (currSkipped) {
            return res.status(400).json({ message: "Player is already skipped" });
        }


        const allSkipped = users.every((user) =>
            user.skipped.some(
                (entry) => entry.player?.toString() === player._id.toString() && entry.status === true
            )
        );

        if (!allSkipped) {
            return res.status(400).json({ message: "Not all users have skipped the player" });
        }

        const money = currentUser.budget;
        const playerPrice = player.basePrice;

        if(money < playerPrice){
            return res.status(400).json({message: "not enough money"});
        }

        let finalPrice = money - playerPrice;
        currentUser.budget = finalPrice;



        player.isSold = true;
        player.soldPrice = playerPrice;
        player.owner = currentUser._id;
        player.hasPlayedFor.push(currentUser._id);
        currentUser.team.push(player._id);

        await player.save();
        await currentUser.save();

        res.status(200).json({
            message: "Player sold successfully",
            player: {
                id: player._id,
                name: player.name,
                basePrice: player.basePrice,
                soldPrice: player.soldPrice,
                isSold: player.isSold,
                owner: player.owner,
            },
            currentUser: {
                id: currentUser._id,
                name: currentUser.username,
                budget: currentUser.budget,
                team: currentUser.team,
            },
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getGroqAiSuggest = async (req, res) => {
    try {
        const {id} = req.params;
        const currentUser = await User.findById(req.user._id);

        if(!currentUser){
            return res.status(404).json({error: "user not found"});
        }
        const player = await Player.findById(id);

        if(!player){
            return res.status(404).json({message: "player not found"});
        }

        const response = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
              {
                role: "user",
                content: `suggest how much should i bid till for ${player.name} its current bid is ${player.basePrice} and i have remaining purse of ${currentUser.budget} cr and ${currentUser.team.length - 15} slots left to fill more in team also suggest me to stop bidding if u feel its price has gone to high give me response within 100 words`,
              },
            ],
            max_tokens: 120,
            temperature: 1.0,


        })

        res.json({ suggestions: response.choices[0]?.message?.content });


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const rtmPlayer = async (req, res) => {
    try {
        const {id} = req.params;
        const player = await Player.findById(id);

        if(!player){
            return res.status(404).json({message: "player not found"});
        }

        const user = await User.findById(req.user._id);

        if(!user){
            return res.status(404).json({message: "user not found"});
        }

        const notSkippedUsers = await User.find({
            _id: { $ne: req.user._id },
            skipped: { $ne: player._id }
        });


        if(user.RTM === 0){
            return res.status(400).json({message: "no rtm left"});
        }

        if(player.hasPlayedFor[0]?.toString() !== user._id.toString()){
            return res.status(400).json({message: "rtm not avaliable for this player"}); 
        }

        if(player.isSkippedBy.length < 2){
            return res.status(400).json({message: "not all teams have skipped the player"});
        }

        if(player.hasPlayedFor[player.hasPlayedFor.length - 1]?.toString() === user._id.toString()){
            user.RTM = user.RTM - 1;
            player.isSkippedBy.push(player.lastBidder);
            player.lastBidder = user._id;

            for (const notSkippedUser of notSkippedUsers) {
                notSkippedUser.skipped.push({ player: player._id, status: true });
                await notSkippedUser.save();
            }
    

            await user.save();
            // await notSkippedUser.save();
            await player.save();

            return res.status(200).json({
                message: "RTM has been exercised successfully",
                user,
                player,
                notSkippedUsers: notSkippedUsers.map((u) => ({ id: u._id, username: u.username, budget: u.budget })) // Simplified for response
            });
        }


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}