import express from 'express';
import connectDB from './database/db.js';
import userRouter from './router/userRoute.js';
import postRouter from './router/postRoute.js';
import commentRouter from './router/commentRoute.js';
import { authenticateToken } from './router/userRoute.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;
const db_connection = await connectDB(); 

app.use(cors());
//app.options('*', cors());
app.use(express.json());

// Middleware to add the DB connection to request object
app.use((req, res, next) => {
    req.db = db_connection;
    next();
});

app.use((req, res, next) => {
    if(req.path === '/api/users/login' || req.path === '/api/users/register') {
        next();
    }
    else {
        authenticateToken(req, res, next);
    }
});

app.use('/api/posts', postRouter);
app.use('/api/users', userRouter);
app.use('/api/comments', commentRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});