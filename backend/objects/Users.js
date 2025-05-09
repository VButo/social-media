// register, login, logout, user info, follow, unfollow, get followers, get following, get user by id, get user by username, update user info, delete user
import argon2 from 'argon2';
class User {
    constructor(config) {
        this.db = config.db;
    }

    // CREATE A NEW USER(REGISTER)
    async register(data) {
        const { username, password, email, fullName } = data;
        const sql = `INSERT INTO user (username, password, email, fullName, profilePicture, createdAt) VALUES (?, ?, ?, ?, ?, ?)`;
        const hashedPassword = await argon2.hash(password);
        const time = new Date().toISOString().replace("T"," ").substring(0, 19);
        let values = [username, hashedPassword, email, fullName, process.env.DEFAULT_PROFILE_PICTURE, time];
        values = values.filter(value => value !== undefined && value !== null);
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
            const sql = 'SELECT * FROM user WHERE username LIKE ? OR fullName LIKE ? LIMIT 20';
            const values = [];
            const result = await this.db.query(sql, values);
            return result[0];
        } catch (error) {
            console.error(`Error: ${error}`);
            throw error;
        }
    }
    async searchUsers(searchQuery) {
        const sql = `
            SELECT * FROM user
            WHERE username LIKE ? OR fullName LIKE ?
        `;
        const values = [`%${searchQuery}%`, `%${searchQuery}%`];
        const result = await this.db.query(sql, values);
        return result[0];
    }
    
    //FIND ONE USER AND FOLLOWING USERS
    async findOne(id) {
        const sql = 'SELECT * FROM user WHERE userId = ? ';
        const values = [id];
        const result = await this.db.query(sql, values);
        return result[0][0] || null;
    }

    //UPDATE USER
    async update(userId, data) {
        const { username, bio, profilePicture } = data;

        let updateFields = [];
        let values = [];
        
        if (username) {
            updateFields.push('username = ?');
            values.push(username);
        }
        if (bio) {
            updateFields.push('bio = ?');
            values.push(bio);
        }
        if (profilePicture) {
            updateFields.push('profilePicture = ?');
            values.push(profilePicture);
        }

        if (updateFields.length === 0) {
            return true;
        }
        values.push(userId);
        
        const sql = `UPDATE user SET ${updateFields.join(', ')} WHERE userId = ?`;
        
        try {
            const result = await this.db.query(sql, values);
            return result[0].affectedRows > 0;
        } catch (error) {
            console.error(`Error updating user: ${error}`);
            throw error;
        }
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
            const [result] = await this.db.query(sql, values);
            return result.affectedRows > 0;
        }
        catch (error) {
            console.error(`Error: ${error}`);
            throw error;
        }
    }

    // FOLLOW USER
    async follow(userId, targetUserId) {
        const sql = 'INSERT INTO follow (followerUserId, followingUserId, createdAt) VALUES (?, ?, NOW())';
        const values = [userId, targetUserId];
        try {
            const [result] = await this.db.query(sql, values);
            return result.affectedRows > 0;
        } catch (error) {
            console.error(`Error while following user: ${error}`);
            throw error;
        }
    }

    // UNFOLLOW USER
    async unfollow(userId, targetUserId) {
        const sql = 'DELETE FROM follow WHERE followerUserId = ? AND followingUserId = ?';
        const values = [userId, targetUserId];
        try{
            const [result] = await this.db.query(sql, values);
            return result.affectedRows > 0;
        } catch (error) {
            console.error(`Error while unfollowing user: ${error}`);
            throw error;
        }
    }

    async isFollowing(userId, targetUserId) {
        const sql = 'SELECT * FROM follow WHERE followerUserId = ? AND followingUserId = ?';
        const values = [targetUserId, userId];
        const result = await this.db.query(sql, values);
        return result[0].length > 0;
    }

    //GET FOLLOWERS
    async getFollowers(userId) {
        const sql = 'SELECT * FROM user WHERE userId IN (SELECT followerUserId FROM follow WHERE followingUserId = ?)';
        const values = [userId];
        const result = await this.db.query(sql, values);
        return result[0];
    }

    //GET FOLLOWING
    async getFollowing(userId) {
        const sql = 'SELECT * FROM user WHERE userId IN (SELECT followingUserId FROM follow WHERE followerUserId = ?)';
        const values = [userId];
        const result = await this.db.query(sql, values);
        return result[0];
    }
}

export default User;