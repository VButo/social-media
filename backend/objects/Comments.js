class Comment {
    constructor(config) {
      this.db = config.db;
    }
  async getCommentById(commentId) {
    const sql = `SELECT c.*, u.username, u.profilePicture, u.userId AS authorId, u.bio, u.createdAt AS userCreatedAt,
                  (SELECT COUNT(*) FROM commentlike cl WHERE cl.commentId = c.commentId) AS likeCount,
                  (SELECT COUNT(*) FROM reply r WHERE r.commentId = c.commentId) AS replyCount
                  FROM comment c
                  JOIN user u ON c.userId = u.userId 
                  WHERE c.commentId = ?;`;
    const values = [commentId];
    const result = await this.db.query(sql, values);
    return result[0][0];
  }


    //GET COMMENTS ON A POST
    async getPostComments(postId) {
      const sql = `SELECT c.*, u.username, u.profilePicture, u.userId AS authorId, u.bio, u.createdAt AS userCreatedAt,
                    (SELECT COUNT(*) FROM commentlike cl WHERE cl.commentId = c.commentId) AS likeCount,
                    (SELECT COUNT(*) FROM reply r WHERE r.commentId = c.commentId) AS replyCount
                    FROM comment c
                    JOIN user u ON c.userId = u.userId 
                    WHERE c.postId = ?;`;
      const values = [postId];
      const result = await this.db.query(sql, values);
      return result[0];
    }

    //CREATE A COMMENT
    async createComment(comment) {
        const sql = `INSERT INTO comment (userId, postId, text, createdAt) VALUES (?, ?, ?, NOW())`;
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
        const sql = `SELECT r.*, u.username, u.profilePicture, u.userId AS authorId, u.bio, u.createdAt AS userCreatedAt,
					(SELECT COUNT(*) FROM replylike rl WHERE rl.replyId = r.replyId) AS likeCount
                     FROM reply r
                     JOIN user u ON r.userId = u.userId
                     WHERE r.commentId = ?;`;
        const values = [commentId];
        const result = await this.db.query(sql, values);
        return result[0];
    }

    //CREATE A REPLY
    async createReply(reply) {
        const sql = `INSERT INTO reply (userId, commentId, text) VALUES (?, ?, ?)`;
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

    //like A COMMENT
    async likeComment(userId, commentId) {
        const sql = `INSERT INTO commentlike (userId, commentId, createdAt) VALUES (?, ?, NOW());`;
        const values = [userId, commentId];
        const result = await this.db.query(sql, values);
        return result[0].affectedRows > 0;
    }

    //UNlike A COMMENT
    async unlikeComment(userId, commentId) {
        const sql = `DELETE FROM commentlike WHERE userId = ? AND commentId = ?;`;
        const values = [userId, commentId];
        const result = await this.db.query(sql, values);
        return result[0].affectedRows > 0;
    }

    //like A REPLY
    async likeReply(userId, replyId) {
        const sql = `INSERT INTO replylike (userId, replyId, createdAt) VALUES (?, ?, NOW());`;
        const values = [userId, replyId];
        const result = await this.db.query(sql, values);
        return result[0].affectedRows > 0;
    }

    //unlike A REPLY
    async unlikeReply(userId, replyId) {
        const sql = `DELETE FROM replylike WHERE userId = ? AND replyId = ?;`;
        const values = [userId, replyId];
        const result = await this.db.query(sql, values);
        return result[0].affectedRows > 0;
    }
}
  
export default Comment;
  