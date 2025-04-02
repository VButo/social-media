import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import User from '../objects/Users.js'; // Adjust the path as necessary

const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
    try {
        const { username, password, email, fullName } = req.body;

        const user = new User({ db: req.db });

        const users = await user.findAll();
        const userId = users.find(user => user.username === username || user.email === email)?.userId;
        if (userId) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Register the new user
        const newUserId = await user.register(username, password, email, fullName);
        res.status(201).json({ userId: newUserId });
    } catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { identifier, password } = req.body;

        const user = new User({ db: req.db });

        const loggedInUser = await user.login(identifier, password);

        if (!loggedInUser) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: loggedInUser.userId }, process.env.JWT_SECRET, { expiresIn:process.env.JWT_EXPIRATION });
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
        }).status(200).json({userId: loggedInUser.userId, token: token});
    } catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/logout', (req, res) => {
    try{
        res.clearCookie("token", { sameSite: "none", secure: true }).status(200).json("User logged out succesfully.");
    }
    catch (error){
        console.error(`Error: ${error}`);
        res.status(500).json({ error: 'Internal server error' });

    }
});

export default router;