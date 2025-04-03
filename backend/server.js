import express from 'express';
import connectDB from './database/db.js';
import userRouter from './router/userRoute.js';
import postRouter from './router/postRoute.js';
import commentRouter from './router/commentRoute.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;
const db_connection = await connectDB(); 

// Middleware to add the DB connection to request object
app.use((req, res, next) => {
    req.db = db_connection;
    next();
});

app.use(cors());
app.use(express.json());

app.use('/api/posts', postRouter);
app.use('/api/users', userRouter);
app.use('/api/comments', commentRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});