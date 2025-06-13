import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const connectDB = async () => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            ssl: process.env.CA_CERT
        });
        
        console.log(`Connected to database: ${process.env.DB_NAME}`);
        console.log(await connection.ping());
        return connection;
    } catch (error) {
        console.error(`Error connecting to database: ${error.message}`);
        console.error(error.stack);
        throw error;
    }
};

export default connectDB;