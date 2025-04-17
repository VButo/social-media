import e from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import multer from "multer";
import path from "path";
import Post from "../objects/Posts.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = e.Router();

const upload = multer({
    dest: "public/images/postImages",
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
});

//CREATE A POST
router.post("/:userId", upload.single('image'), async(req, res) => {
    const { text } = req.body;
    const file = req.file;
    const userId = req.params.userId;

    const post = new Post({ db: req.db });
    try{
        let imageUrl = null;

        if (file) {
            const targetPath = path.join(
                __dirname,
                "../../frontend/public/images/postImages",
                file.originalname
              );
      
            // Rename the file to move it to the permanent location
            await fs.promises.rename(file.path, targetPath);
      
            // Set the image URL
            imageUrl = `images/postImages/${file.originalname}`;
        }
        
        const newPost = await post.createPost({ caption: text, image: imageUrl, userId });

        
        if (!newPost) {
            return res.status(404).json({ error: "Couldn't create the post" });
          }
      
          res.status(200).json({ message: "Post created successfully!", post: newPost.value });
    } catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).json({ error: "Internal server error" });
    }
});

//GET ALL POSTS FROM A USER
router.get("/:userId", async (req, res) => {
    const userId = req.params.userId;
    const post = new Post({ db: req.db });
    try{
        const userPosts = await post.getAllPosts(userId);
        if (!userPosts) return res.status(404).json({ error: "Posts not found" });
        res.status(200).json(userPosts);
    } catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//Get post by id
router.get('/:postId/post', async (req, res) => {
    const postId = req.params.postId;
    const post = new Post({ db: req.db });
    try{
        const userPosts = await post.getPost(postId);
        if (!userPosts) return res.status(404).json({ error: "Post not found" });
        res.status(200).json(userPosts);
    } catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//DELETE A POST
router.delete("/:postId", async (req, res) => {
    const postId = req.params.postId;
    const post = new Post({ db: req.db });
    try{
        const deletedPost = await post.deletePost(postId);
        if (!deletedPost) return res.status(404).json({ error: "Post not found" });
        res.status(200).json('Post deleted successfully!');
    } catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//LIKE A POST
router.post("/:postId/like", async (req, res) => {
    const likePost = req.body;
    likePost.postId = req.params.postId;
    const post = new Post({ db: req.db });
    try{
        const likedPost = await post.likePost(likePost);
        if (!likedPost) return res.status(404).json({ error: "Couldn't like the post" });
        res.status(200).json('Post liked successfully!');
    } catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//UNLIKE A POST
router.post("/:postId/unlike", async (req, res) => {
    const unlikePost = req.body;
    unlikePost.postId = req.params.postId;
    const post = new Post({ db: req.db });
    try{
        const unlikedPost = await post.unlikePost(unlikePost);
        if (!unlikedPost) return res.status(404).json({ error: "Couldn't unlike the post" });
        res.status(200).json('Post unliked successfully!');
    } catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//GET ALL LIKES ON A POST
router.get("/:postId/likes", async (req, res) => {
    const postId = req.params.postId;
    const post = new Post({ db: req.db });
    try{
        const postLikes = await post.getPostLikes(postId);
        if (!postLikes) return res.status(404).json({ error: "Likes not found" });
        res.status(200).json(postLikes);
    } catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//GET LIKE COUNT ON A POST
router.get("/:postId/likeCount", async (req, res) => {
    const postId = req.params.postId;
    const post = new Post({ db: req.db });
    try {
        const likeCount = await post.getPostLikes(postId);
        res.status(200).json({ likeCount: likeCount.length });
    } catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).json({ error: "Internal server error" });
    }
});

//GET ALL POSTS FROM USERS FOLLOWED BY USER
router.get("/:userId/followedPosts", async (req, res) => {
    const userId = req.params.userId;
    const post = new Post({ db: req.db });
    try{
        const followedPosts = await post.getFollowedPosts(userId);
        if (!followedPosts) return res.status(404).json({ error: "Posts not found" });
        res.status(200).json(followedPosts);
    } catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;