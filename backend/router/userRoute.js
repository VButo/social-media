import express from 'express';
import jwt from 'jsonwebtoken';

import User from '../objects/Users.js'; // Adjust the path as necessary

const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
    try {
        const { username, email } = req.body;
        const user = new User({ db: req.db });

        if(await user.userExists(username, email)){
            return res.status(400).json({ error: "User already exists" });
        }

        const newUserId = await user.register(req.body);

        const token = jwt.sign({ userId: newUserId }, process.env.JWT_SECRET, { expiresIn:process.env.JWT_EXPIRATION });
        res.cookie("token", token, { httpOnly: true });
        console.log(`Cookie created with token: ${token}, cookie: ${JSON.stringify(res.getHeader('Set-Cookie'))}`);
        res.status(201).json({ userId: newUserId, token });
    } catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//authentication middleware
export function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(!token) return res.sendStatus(401);
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

// Login route
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

// Logout route
router.post('/logout', (req, res) => {
    try{
        res.clearCookie("token", { sameSite: "none", secure: true }).status(200).json("User logged out succesfully.");
        console.log(`Cookie cleared: ${JSON.stringify(res.getHeader('Set-Cookie'))}`);
    }
    catch (error){
        console.error(`Error: ${error}`);
        res.status(500).json({ error: 'Internal server error' });

    }
});

// Update route
router.put('/:id', async(req, res) => {
    try{
        const user = new User({ db: req.db });
        console.log(req.body);
        const success = await user.update(req.params.id, req.body);

        if (!success) return res.status(404).json({ error: 'User not found' });
        
        res.status(200).json({ message: 'User updated successfully' });
    }
    catch(error){
        console.error(`Error: ${error}`);
        res.status(500).json({ error: 'Internal server error' });
    }
    
});

// Delete route
router.delete('/:id', async (req, res) => {
    try {
        const user = new User({ db: req.db });
        const success = await user.delete(req.params.id);

        if (!success) return res.status(404).json({ error: 'User not found' });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Follow route
router.post('/:id/follow', async (req, res) => {
    try {
        const { userId } = req.body;
        const user = new User({ db: req.db });
        const success = await user.follow(req.params.id, userId);
        if (!success) return res.status(400).json({ error: "Follow request failed" });
        res.status(200).json({ message: "User followed successfully" });
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Unfollow route
router.post('/:id/unfollow', async (req, res) => {
    try {
        const { userId } = req.body;
        const user = new User({ db: req.db });
        const success = await user.unfollow(req.params.id, userId);
        if (!success) return res.status(400).json({ error: "Unfollow request failed" });
        res.status(200).json({ message: "User unfollowed successfully" });
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get followers route
router.get('/:id/followers', async (req, res) => {
    try {
        const user = new User({ db: req.db });
        const followers = await user.getFollowers(req.params.id);
        if (!followers) return res.status(404).json({ error: 'User not found' });
        res.status(200).json(followers);
    } catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get following route
router.get('/:id/following', async (req, res) => {
    try {
        const user = new User({ db: req.db });
        const following = await user.getFollowing(req.params.id);
        if (!following) return res.status(404).json({ error: 'User not found' });
        res.status(200).json(following);
    } catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get all users route
router.get('/', async (req, res) => {
    try {
        const user = new User({ db: req.db });
        const users = await user.findAll();
        res.status(200).json(users);
    } catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get user by ID route
router.get('/:id', async (req, res) => {
    try {
        const user = new User({ db: req.db });
        const userData = await user.findOne(req.params.id);
        if (!userData) return res.status(404).json({ error: 'User not found' });
        res.status(200).json(userData);
    } catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;