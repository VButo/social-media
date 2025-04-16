import express from 'express';
import connectDB from './database/db.js';
import userRouter from './router/userRoute.js';
import postRouter from './router/postRoute.js';
import commentRouter from './router/commentRoute.js';
import messageRouter from './router/messageRoute.js';
import cookieParser from 'cookie-parser';
import { authenticateToken } from './router/userRoute.js';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        credentials: true
    }
})
const PORT = process.env.PORT || 3000;
const db_connection = await connectDB(); 


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
  }));
//app.use(cors());
//app.options('*', cors());
app.use(cookieParser());
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
app.use('/api/messages', messageRouter);

io.on('connection', (socket) => {
    console.log('Socket connected: ', socket.id);

    socket.on('join', (userId) => {
        socket.join(userId.toString());
        console.log(`User ${userId} joined room`);
    })

    socket.on('message', async (data) => {
        const { senderId, receiverId, content } = data;
        
        try {
            const sql = 'INSERT INTO messages (senderId, receiverId, content) VALUES (?, ?, ?)';
            await db_connection.query(sql, [senderId, receiverId, content]);
        } catch (error) {
            console.error('Error saving message to db:', error);
        }

        io.to(receiverId.toString()).emit('message', {
            senderId,
            content,
            timestamp: new Date().toISOString()
        });
    });

    socket.on('disconnect', ()=> {
        console.log('Socket disconnected: ', socket.id);
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});