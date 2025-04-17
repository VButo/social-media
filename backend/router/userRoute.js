import express from 'express';
import jwt from 'jsonwebtoken';
import fs from "fs";
import { fileURLToPath } from "url";
import multer from "multer";
import path from "path";
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import User from '../objects/Users.js'; // Adjust the path as necessary

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const upload = multer({
    dest: "public/images/postImages",
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
});

export function authenticateToken(req, res, next) {
    console.log("Received request with cookies:", req.cookies);
    const token = req.cookies.token;
    console.log('Token:', token);
    console.log("Token from cookies:", req.cookies.token);
  
    if (!token) {
        console.log("No token provided in request");
        return res.status(401).json({ message: "No authentication token provided" });
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
          console.log("Token verification failed:", err);
          return res.status(403).json({ message: "Invalid or expired token" });
        }
        req.user = user;
        next();
      });
}

// Validation route
router.get('/validate', authenticateToken, (req, res) => {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    res.status(200).json({ userId: req.user.userId });
});

// Register route
router.post('/register', async (req, res) => {
    try {
        const { username, email } = req.body;
        const user = new User({ db: req.db });

        if(await user.userExists(username, email)){
            return res.status(400).json({ error: "User already exists" });
        }

        const newUserId = await user.register(req.body);

        const token = createToken(newUserId);
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            path: '/'
        }).status(200).json({userId: loggedInUser.userId, token: token});
    } catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Login route
router.post('/login', async (req, res) => {
    try {
      const { identifier, password } = req.body;
  
      const user = new User({ db: req.db });
      const loggedInUser = await user.login(identifier, password);
      console.log('user:', JSON.stringify(loggedInUser), identifier, password);
  
      if (!loggedInUser) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      const token = createToken(loggedInUser.userId);
      res.cookie('token', token, {
        httpOnly: true,
            secure: true,
            sameSite: 'None',
            path: '/'
      }).status(200).json({ userId: loggedInUser.userId });
    } catch (error) {
      console.error(`Error: ${error}`);
      res.status(500).json({ error: 'Internal server error' });
    }
});

//Logout route
router.post('/logout', (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
    });
    res.status(200).json({ message: 'Logged out and cookie deleted' });
});

function createToken(userId) {
    return jwt.sign({ userId: userId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
}

// Update route
router.put('/:userId', upload.single('image'), async(req, res) => {
    const { username, bio } = req.body;
    const file = req.file;
    const userId = req.params.userId;
    let profilePicture = null;
    try{
        // Check if a file was uploaded
        if (file) {
            // Create directory if it doesn't exist
            const targetDir = path.join(
                __dirname,
                "../../frontend/public/images/profilePictures"
            );
            
            // Ensure directory exists
            if (!fs.existsSync(targetDir)) {
                fs.mkdirSync(targetDir, { recursive: true });
            }
        
            const targetPath = path.join(
                targetDir,
                file.originalname
            );
        
            // Rename the file to move it to the permanent location
            await fs.promises.rename(file.path, targetPath);
        
            // Set the image URL
            profilePicture = `images/profilePictures/${file.originalname}`;
        }
    } catch (error) {
        console.error(`Error processing file: ${error}`);
        return res.status(500).json({ error: 'Error processing file upload' });
    }

    try{
        const user = new User({ db: req.db });
        const userData = {
            userId,
            username,
            bio,
            profilePicture
        };
        
        const success = await user.update(userId, userData);

        if (!success) return res.status(404).json({ error: 'User not found' });
        
        res.status(200).json({ message: 'User updated successfully' });
    }
    catch(error){
        console.error(`Error updating user: ${error}`);
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
//check if user is following another user
router.get('/:targetUserId/isFollowing', async (req, res) => {
    try {
        const { userId } = req.body;
        const user = new User({ db: req.db });
        const isFollowing = await user.isFollowing(req.params.targetUserId, userId);
        if (!isFollowing) return res.status(404).json({ error: 'User not found' });
        res.status(200).json(isFollowing);
    } catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get all users route
router.get('/', async (req, res) => {
    try {
        const searchQuery = req.query.search || '';
        const user = new User({ db: req.db });

        const users = await user.searchUsers(searchQuery);
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