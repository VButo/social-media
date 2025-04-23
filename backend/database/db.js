import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { Connector } from '@google-cloud/cloud-sql-connector';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current file's directory for proper .env loading
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const connectDB = async () => {
    try {
        const connector = new Connector();
        
        const clientOpts = await connector.getOptions({
            instanceConnectionName: process.env.INSTANCE_CONNECTION_NAME,
            ipType: process.env.DB_IP_TYPE || 'PUBLIC'
        });

        const connection = await mysql.createConnection({
            ...clientOpts,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });
        
        console.log(`Connected to database: ${process.env.DB_NAME}`);
        console.log(await connection.ping());
        return connection;
    } catch (error) {
        console.error(`Error connecting to database: ${error.message}`);
        console.error(error.stack);
        throw error; // Re-throw to allow handling by caller
    }
};

export default connectDB;