// login register, login, logout, user info, follow, unfollow, get followers, get following, get user by id, get user by username, update user info, delete user

class User {
    constructor(config) {
        this.db = config.db;
    }

    // Register a new user
    async register(username, password, email, fullName) {
        const sql = 'INSERT INTO user (username, password, email, fullName, createdAt) VALUES (?, ?, ?, ?, ?)';
        const time = generateDatabaseDateTime(new Date());
        const values = [username, password, email, fullName, time];
        const result = await this.db.query(sql, values);
        return result[0].insertId;
    }

    //login user
    async login(identifier, password) {
        const sql = 'SELECT * FROM user WHERE (username = ? OR email = ?) AND password = ?';
        const values = [identifier, identifier, password];
        const result = await this.db.query(sql, values);

        if (result[0].length === 0) {
            return null; 
        }
        return result[0][0];
    }
    async logout() {

    }
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
}

function generateDatabaseDateTime(date) {
    return date.toISOString().replace("T"," ").substring(0, 19);
}

export default User;