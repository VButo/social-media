import e from "express";
import Comment from "../objects/Comments.js";

const router = e.Router();

//GET A COMMENT BY ID
router.get("/get/:commentId", async (req, res) => {
    const commentId = req.params.commentId;
    const comment = new Comment({ db: req.db });
    try{
        const fetchedComment = await comment.getCommentById(commentId);
        if(!fetchedComment) return res.status(404).json({ error: "Comment not found" });
        res.status(200).json(fetchedComment);
    } catch(error) {
        console.error(`Error: ${error}`);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//GET COMMENTS ON A POST
router.get("/:postId", async (req, res) => {
    const postId = req.params.postId;
    const comment = new Comment({ db: req.db });
    try {
        const postComments = await comment.getPostComments(postId);
        if (!postComments) return res.status(404).json({ error: "Comments not found" });
        res.status(200).json(postComments);
    } catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//CREATE A COMMENT
router.post("/:postId", async (req, res) => {
    const createComment = req.body;
    createComment.postId = req.params.postId;
    const comment = new Comment({ db: req.db });
    try {
        const newComment = await comment.createComment(createComment);
        if (!newComment) return res.status(404).json({ error: "Couldn't create the comment" });
        res.status(200).json('Comment created successfully!');
    } catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//DELETE A COMMENT
router.delete("/:commentId", async (req, res) => {
    const commentId = req.params.commentId;
    const comment = new Comment({ db: req.db });
    try {
        const deletedComment = await comment.deleteComment(commentId);
        if (!deletedComment) return res.status(404).json({ error: "Comment not found" });
        res.status(200).json('Comment deleted successfully!');
    } catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//GET ALL REPLYS ON A COMMENT
router.get("/:commentId/replies", async (req, res) => {
    const commentId = req.params.commentId;
    const comment = new Comment({ db: req.db });
    try{
        const commentReplies = await comment.getCommentReplies(commentId);
        if (!commentReplies) return res.status(404).json({ error: "Replies not found" });
        res.status(200).json(commentReplies);
    } catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//CREATE A REPLY
router.post("/:commentId/replies", async (req, res) => {
    const createReply = req.body;
    createReply.commentId = req.params.commentId;
    const comment = new Comment({ db: req.db });
    try{
        const newReply = await comment.createReply(createReply);
        if (!newReply) return res.status(404).json({ error: "Couldn't create the reply" });
        res.status(200).json('Reply created successfully!');
    } catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//DELETE A REPLY
router.delete("/:replyId/replies", async (req, res) => {
    const replyId = req.params.replyId;
    const comment = new Comment({ db: req.db });
    try{
        const deletedReply = await comment.deleteReply(replyId);
        if (!deletedReply) return res.status(404).json({ error: "Reply not found" });
        res.status(200).json('Reply deleted successfully!');
    } catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//LIKE A COMMENT
router.post("/:commentId/like", async (req, res) => {
    const commentId = req.params.commentId;
    const userId = req.body.userId;
    const comment = new Comment({ db: req.db});

    try{
        const likedComment = await comment.likeComment(userId, commentId);
        if(!likedComment) return res.status(404).json({ error: "Couldn't like the comment" });
        res.status(200).json('Comment liked successfully!');
    } catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//UNLIKE A COMMENT
router.post("/:commentId/unlike", async (req, res) => {
    const commentId = req.params.commentId;
    const userId = req.body.userId;
    const comment = new Comment({ db: req.db});

    try{
        const unlikedComment = await comment.unlikeComment(userId, commentId);
        if(!unlikedComment) return res.status(404).json({ error: "Couldn't unlike the comment" });
        res.status(200).json('Comment unliked successfully!');
    } catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//LIKE A REPLY
router.post("/:replyId/replies/like", async (req, res) => {
    const replyId = req.params.replyId;
    const userId = req.body.userId;
    const comment = new Comment({ db: req.db});

    try{
        const likedReply = await comment.likeReply(userId, replyId);
        if(!likedReply) return res.status(404).json({ error: "Couldn't like the reply" });
        res.status(200).json('Reply liked successfully!');
    } catch( error) {
        console.error(`Error: ${error}`);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//UNLIKE A REPLY
router.post("/:replyId/replies/unlike", async (req, res) => {
    const replyId = req.params.replyId;
    const userId = req.body.userId;
    const comment = new Comment({ db: req.db});

    try {
        const unlikedReply = await comment.unlikeReply(userId, replyId);
        if(!unlikedReply) return res.status(404).json({ error: "Couldn't unlike the reply" });
        res.status(200).json('Reply unliked successfully!');
    } catch(error) {
        console.error(`Error: ${error}`);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;