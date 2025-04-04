import multer from "multer";
import path from "path";
class Post {
  constructor(config) {
    this.db = config.db;
  }

  // GET ALL USER POSTS
  async getAllPosts(userId) {
    const sql = `SELECT p.*, u.username, u.profilePicture, u.userId AS authorId, u.bio, u.createdAt 
                 AS userCreatedAt,COUNT(l.postId) AS likeCount, COUNT(c.postId) AS commentCount
                 FROM post p
                 JOIN user u ON p.userId = u.userId
                 LEFT JOIN \`like\` l ON p.postId = l.postId
                 LEFT JOIN comment c ON p.postId = c.postId
                 WHERE p.userId = ?
                 GROUP BY p.postId
                 ORDER BY createdAt DESC;`;
    const values = [userId];
    const result = await this.db.query(sql, values);
    return result[0];
  }

  // GET POST BY ID
  async getPost(postId) {
    const sql = `SELECT p.*, u.username, u.profilePicture, u.userId AS authorId, u.bio, u.createdAt AS userCreatedAt,COUNT(l.postId) AS likeCount, COUNT(c.postId) AS commentCount
	    FROM post p
	    JOIN user u ON p.userId = u.userId
	    LEFT JOIN \`like\` l ON p.postId = l.postId
      LEFT JOIN comment c ON p.postId = c.postId
	    WHERE p.postId = ?
	    GROUP BY p.postId;`;
    const values = [postId];
    const result = await this.db.query(sql, values);
    return result[0];
  }

  //CREATE A POST
  async createPost(post) {
    const sql = `INSERT INTO post (userId, ${post.caption ? 'caption, ':''}${post.image?'image, ':''}createdAt) VALUES (?,${post.caption ? '?, ':''}${post.image?'?, ':''} NOW())`;
    console.log(post + ' '+sql);
    let values = [post.userId, post.caption, post.image];
    values = values.filter((value) => value); // Remove undefined values
    const result = await this.db.query(sql, values);
    return result[0];
  }

  //DELETE A POST
  async deletePost(postId) {
    const sql = `DELETE FROM post WHERE postId = ?`;
    const values = [postId];
    const result = await this.db.query(sql, values);
    return result[0].affectedRows > 0;
  }

  //LIKE A POST
  async likePost(data){
    const sql = "INSERT INTO `like` (userId, postId, createdAt) VALUES (?, ?, NOW());";
    const values = [data.userId, data.postId];
    const result = await this.db.query(sql, values);
    return result[0];
  }

  //UNLIKE A POST
  async unlikePost(data) {
    const sql = "DELETE FROM `like` WHERE userId = ? AND postId = ?;";
    const values = [data.userId, data.postId];
    const result = await this.db.query(sql, values);
    return result[0].affectedRows > 0;
  }

  //GET ALL LIKES ON A POST
  async getPostLikes(postId) {
    const sql = 'SELECT u.*, l.createdAt AS likedAt FROM user u JOIN `like` l ON u.userId = l.userId WHERE l.postId = ?';
    const values = [postId];
    const result = await this.db.query(sql, values);
    return result[0];
  }

  //GET ALL POSTS FROM USERS FOLLOWED BY USER
  async getFollowedPosts(userId) {
    const sql = `SELECT p.*, u.username, u.profilePicture, u.userId AS authorId, COUNT(l.postId) AS likeCount, COUNT(c.postId) AS commentCount
                 FROM post p
                 JOIN user u ON p.userId = u.userId
                 LEFT JOIN \`like\` l ON p.postId = l.postId
                 LEFT JOIN comment c ON p.postId = c.postId
                 WHERE p.userId IN (SELECT followingUserId FROM follow WHERE followerUserId = ?)
                 GROUP BY p.postId
                 ORDER BY p.createdAt DESC;`;
    const values = [userId];
    const result = await this.db.query(sql, values);
    return result[0];
  }
}

export default Post;
