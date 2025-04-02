import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

export const connectDB = async () => {
    try{
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            port: process.env.DB_PORT,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });
        return connection;
    } catch (error) {
        console.error(`Error: ${error}`);
        process.exit(1); // Exit process with failure
    }
}

export default connectDB;