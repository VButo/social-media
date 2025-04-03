class Comment {
    constructor(config) {
      this.db = config.db;
    }
  
    //GET COMMENTS ON A POST
    async getPostComments(postId) {
      const sql = `SELECT c.*, u.username, u.profilePicture, u.userId AS authorId, u.bio, u.createdAt AS userCreatedAt
                   FROM comment c
                   JOIN user u ON c.userId = u.userId
                   WHERE c.postId = ?`;
      const values = [postId];
      const result = await this.db.query(sql, values);
      return result[0];
    }

    //CREATE A COMMENT
    async createComment(comment) {
        const sql = `INSERT INTO comment (userId, postId, text, likes, createdAt) VALUES (?, ?, ?, 0, NOW())`;
        const values = [comment.userId, comment.postId, comment.text];
        const result = await this.db.query(sql, values);
        return result[0];
    }

    //DELETE A COMMENT
    async deleteComment(commentId) {
        const sql = `DELETE FROM comment WHERE commentId = ?`;
        const values = [commentId];
        const result = await this.db.query(sql, values);
        return result[0].affectedRows > 0;
    }

    //GET ALL REPLIES ON A COMMENT
    async getCommentReplies(commentId) {
        const sql = `SELECT r.*, u.username, u.profilePicture, u.userId AS authorId, u.bio, u.createdAt AS userCreatedAt
                     FROM reply r
                     JOIN user u ON r.userId = u.userId
                     WHERE r.commentId = ?`;
        const values = [commentId];
        const result = await this.db.query(sql, values);
        return result[0];
    }

    //CREATE A REPLY
    async createReply(reply) {
        const sql = `INSERT INTO reply (userId, commentId, text, likes) VALUES (?, ?, ?, 0)`;
        const values = [reply.userId, reply.commentId, reply.text];
        const result = await this.db.query(sql, values);
        return result[0];
    }

    //DELETE A REPLY
    async deleteReply(replyId) {
        const sql = `DELETE FROM reply WHERE replyId = ?`;
        const values = [replyId];
        const result = await this.db.query(sql, values);
        return result[0].affectedRows > 0;
    }

    //LIKE A COMMENT
    async likeComment(commentId) {
        const sql = `UPDATE comment SET likes = likes + 1 WHERE commentId = ?`;
        const values = [commentId];
        const result = await this.db.query(sql, values);
        return result[0].affectedRows > 0;
    }

    //UNLIKE A COMMENT
    async unlikeComment(commentId) {
        const sql = `UPDATE comment SET likes = likes - 1 WHERE commentId = ?`;
        const values = [commentId];
        const result = await this.db.query(sql, values);
        return result[0].affectedRows > 0;
    }

    //LIKE A REPLY
    async likeReply(replyId) {
        const sql = `UPDATE reply SET likes = likes + 1 WHERE replyId = ?`;
        const values = [replyId];
        const result = await this.db.query(sql, values);
        return result[0].affectedRows > 0;
    }

    //UNLIKE A REPLY
    async unlikeReply(replyId) {
        const sql = `UPDATE reply SET likes = likes - 1 WHERE replyId = ?`;
        const values = [replyId];
        const result = await this.db.query(sql, values);
        return result[0].affectedRows > 0;
    }
}
  
export default Comment;
  