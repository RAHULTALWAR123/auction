import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/cookie.js";
import Player from "../models/player.model.js";
// import e from "express";

export const signup = async (req, res) => {
    try{
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    });

    await newUser.save();

    if(newUser){
        generateTokenAndSetCookie(newUser._id,res)
        res.status(201).json({
            _id: newUser._id,
            email: newUser.email,
            username: newUser.username,
        })
    }else{
        res.status(400).json({error: "invalid user data"})
    }



}catch(error){
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
}

};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!user || !passwordMatch){
            return res.status(401).json({ message: "Invalid email or password" });
        }

        generateTokenAndSetCookie(user._id,res)

        res.status(200).json({
            _id: user._id,
            email: user.email,
            username: user.username,
        });


    } catch (error) {
    res.status(500).json({error : error.message})
    console.log("error in login" , error.message)
    }
};

export const logout = async (req, res) => {
    try {
        // res.clearCookie("jwt");
        res.cookie("jwt","",{maxAge:1})
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const skipPlayer = async (req, res) => {
    try{
    const {id} = req.params;
    const player = await Player.findById(id);
    if(!player){
        return res.status(404).json({error: "player not found"})
    }

    const user = await User.findById(req.user._id);

    if(!user){
        return res.status(404).json({error: "user not found"})
    }

    if(player.lastBidder?.toString() === req.user._id.toString()){
        return res.status(400).json({message:"u cant skip the player as u hold the current bid"});
    }

    const alreadySkipped = user.skipped.find(
        (entry) => entry.player.toString() === player._id.toString()
    );


    if (alreadySkipped) {
        return res.status(400).json({ message: "Player is already skipped" });
    }


    user.skipped.push({
        player: player._id,
        status: true
    })

    player.isSkippedBy.push(user._id);

    await user.save();
    await player.save();

    res.status(200).json({message: "Player skipped successfully", user})

    }
    catch(error){
        res.status(500).json({error : error.message})
        console.log("error in login" , error.message)
    }
}

export const getProfile = async (req, res) => {
    try{
        res.json(req.user);
    }catch(error){
        res.status(500).json({error : error.message})
        console.log("error in login" , error.message)
    }
}


export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({error : error.message})
        console.log("error in login" , error.message)
    }
}