import e from "express";
import Message from "../objects/Messages.js";

const router = e.Router();

router.get("/:userId", async (req, res) => {
    const userId = req.params.userId;
    try {
        const message = new Message({ db: req.db });
        const messages = await message.getMessagedUsers(userId);
        
        if (!messages) {
            return res.status(404).json({ error: "Messages not found" });
        }
        
        res.status(200).json(messages);
    } catch (error) {
        console.error(`Error fetching messages: ${error.stack}`);
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
});

// Get messages between two users
router.get("/:senderId/:receiverId", async (req, res) => {
    const { senderId, receiverId } = req.params;
    try {
        const message = new Message({ db: req.db });
        const messages = await message.getMessagesBetweenUsers(senderId, receiverId);
        
        if (!messages) {
            return res.status(404).json({ error: "Messages not found" });
        }
        console.log('Messages:', messages);
        res.status(200).json({messages: messages});
    } catch (error) {
        console.error(`Error fetching messages: ${error.stack}`);
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
});

export default router;