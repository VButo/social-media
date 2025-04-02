// login register, login, logout, user info, follow, unfollow, get followers, get following, get user by id, get user by username, update user info, delete user
import argon2 from 'argon2';
class User {
    constructor(config) {
        this.db = config.db;
    }

    // CREATE A NEW USER(REGISTER)
    async register(username, password, email, fullName) {
        const sql = 'INSERT INTO user (username, password, email, fullName, createdAt) VALUES (?, ?, ?, ?, ?)';
        const hashedPassword = await argon2.hash(password);
        const time = new Date().toISOString().replace("T"," ").substring(0, 19);
        const values = [username, hashedPassword, email, fullName, time];
        const result = await this.db.query(sql, values);
        return result[0].insertId;
    }

    //CHECK IF USER EXISTS
    async userExists(username, email) {
        const sql = 'SELECT * FROM user WHERE username = ? OR email = ? LIMIT 1';
        const values = [username, email];
        const result = await this.db.query(sql, values);
        return result[0].length > 0;
    }

    //LOGIN USER
    async login(identifier, password) {
        const sql = 'SELECT * FROM user WHERE username = ? OR email = ?';
        const values = [identifier, identifier];
        const result = await this.db.query(sql, values);

        if (result[0].length === 0) return null;

        const user = result[0][0];
        const passwordValid = await argon2.verify(user.password, password);
        if (!passwordValid) return null;
        return user;
    }

    //FIND ALL USERS
    async findAll() {
        try {
            const sql = 'SELECT * FROM user';
            const values = [];
            const result = await this.db.query(sql, values);
            return result[0];
        } catch (error) {
            console.error(`Error: ${error}`);
            throw error;
        }
    }
    
    //FIND ONE USER
    async findOne(id) {
        const sql = 'SELECT * FROM user WHERE userId = ?';
        const values = [id];
        const result = await this.db.query(sql, values);
        return result[0][0] || null;
    }

    //UPDATE USER
    async update(data) {
        const { userId, username, email, fullName, bio, profilePicture } = data;
        if(!userId || !username || !email || !profilePicture) {
            return null;
        }

        let sql = 'SELECT * FROM user WHERE userId = ?';
        let values = [userId];
        let result = await this.db.query(sql, values);
        if (result[0].length === 0) {
            return null; // User not found
        }


        //Update only the fields that are provided and not null
        sql = `UPDATE user SET username = ?, email = ?, fullName = ?${bio ? ', bio = ?' : ''}${profilePicture ? ', profilePicture = ?' : ''} WHERE userId = ?`;
        values = [username, email, fullName, bio, profilePicture, userId];
        // Remove undefined values from the array
        values = values.filter(value => value);
        result = await this.db.query(sql, values);
        return result[0].affectedRows > 0;
    }

    //DELETE USER
    async delete(userId) {
        try{
            const user = await this.findOne(userId);
            if (!user) {
                return null; // User not found
            }
            const sql = 'DELETE FROM user WHERE userId = ?';
            const values = [userId];
            const result = await this.db.query(sql, values);
            return result[0].affectedRows > 0;
        }
        catch (error) {
            console.error(`Error: ${error}`);
            throw error;
        }
    }

    // FOLLOW USER
    async follow(userId, targetUserId) {
        const sql = 'INSERT INTO follows (followerId, followingId) VALUES (?, ?)';
        const values = [userId, targetUserId];
        const result = await this.db.query(sql, values);
        return result[0].affectedRows > 0;
    }

    // UNFOLLOW USER
    async unfollow(userId, targetUserId) {
        const sql = 'DELETE FROM follows WHERE followerId = ? AND followingId = ?';
        const values = [userId, targetUserId];
        const result = await this.db.query(sql, values);
        return result[0].affectedRows > 0;
    }

    //GET FOLLOWERS
    async getFollowers(userId) {
        const sql = 'SELECT * FROM user WHERE userId IN (SELECT followerId FROM follows WHERE followingId = ?)';
        const values = [userId];
        const result = await this.db.query(sql, values);
        return result[0];
    }

    //GET FOLLOWING
    async getFollowing(userId) {
        const sql = 'SELECT * FROM user WHERE userId IN (SELECT followingId FROM follows WHERE followerId = ?)';
        const values = [userId];
        const result = await this.db.query(sql, values);
        return result[0];
    }
    
}

export default User;