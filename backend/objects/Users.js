// login register, login, logout, user info, follow, unfollow, get followers, get following, get user by id, get user by username, update user info, delete user

class User {
    constructor(config) {
        this.db = config.db;
    }

    // CREATE A NEW USER(REGISTER)
    async register(username, password, email, fullName) {
        const sql = 'INSERT INTO user (username, password, email, fullName, createdAt) VALUES (?, ?, ?, ?, ?)';
        const time = generateDatabaseDateTime(new Date());
        const values = [username, password, email, fullName, time];
        const result = await this.db.query(sql, values);
        return result[0].insertId;
    }

    //LOGIN USER
    async login(identifier, password) {
        const sql = 'SELECT * FROM user WHERE (username = ? OR email = ?) AND password = ?';
        const values = [identifier, identifier, password];
        const result = await this.db.query(sql, values);

        if (result[0].length === 0) {
            return null; 
        }
        return result[0][0];
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
        try {
            const sql = 'SELECT * FROM user WHERE userId = ?';
            const values = [id];
            const result = await this.db.query(sql, values);
            if (result[0].length === 0) {
                return null;
            }
            return result[0]; // Return the user data
        } catch (error) {
            console.error(`Error: ${error}`);
            throw error;
        }
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
    

    //FOLLOW USER

    //UNFOLLOW USER

    //GET FOLLOWERS

    //GET FOLLOWING
    
}

function generateDatabaseDateTime(date) {
    return date.toISOString().replace("T"," ").substring(0, 19);
}

export default User;