import express from 'express';
import connectDB from './database/db.js';
import userRouter from './router/userRoute.js';

const app = express();
const PORT = process.env.PORT || 3000;
const db_connection = await connectDB(); 

// Middleware to add the DB connection to request object
app.use((req, res, next) => {
    req.db = db_connection;
    next();
});

app.use(express.json());

app.use('/api/user', userRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});