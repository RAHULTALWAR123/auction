import Player from "../models/player.model.js";
import User from "../models/user.model.js";

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

        const playerSkipped = currentUser.skipped.find((entry) => entry.player.toString() === player._id.toString() && entry.status === true);

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

        const currSkipped = currentUser.skipped.find((entry) => entry.player.toString() === player._id.toString() && entry.status === true);

        if (currSkipped) {
            return res.status(400).json({ message: "Player is already skipped" });
        }


        const allSkipped = users.every((user) =>
            user.skipped.some(
                (entry) => entry.player.toString() === player._id.toString() && entry.status === true
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
        currentUser.team.push(player._id);

        await player.save();
        await currentUser.save();

        res.status(200).json({message: "player sold successfully",player,currentUser});

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}