class Message {
    constructor(config) {
        this.db = config.db;
    }
    
    async getMessagedUsers(userId) {
        try {
            const sql = `
            SELECT DISTINCT u.userId, u.username, u.fullName, u.profilePicture, u.bio
            FROM user u
            WHERE u.userId IN (
                SELECT receiverId FROM messages WHERE senderId = ?
                UNION
                SELECT senderId FROM messages WHERE receiverId = ?
            );`;
            const values = [userId, userId, userId];
            const result = await this.db.query(sql, values);
            return result[0];
        } catch (error) {
            console.error(`Error getting messaged users: ${error}`);
            throw error;
        }
    }

    async getMessagesBetweenUsers(senderId, receiverId) {
        try {
            const sql = `
            SELECT m.messageId, m.senderId, m.receiverId, m.content, m.created_at
            FROM messages m
            WHERE (m.senderId = ? AND m.receiverId = ?) OR (m.senderId = ? AND m.receiverId = ?)
            ORDER BY m.created_at ASC;`;
            const values = [senderId, receiverId, receiverId, senderId];
            const result = await this.db.query(sql, values);
            return result[0];
        } catch (error) {
            console.error(`Error getting messages between users: ${error}`);
            throw error;
        }
    }
}
  
export default Message;