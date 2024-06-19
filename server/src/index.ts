import express from 'express';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connectDB } from './db';
import authRouter from "../routes/auth.routes";
import messageRouter from "../routes/message.routes";
import errorThrower from '../middlewares/error.middleware';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_BASE_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.get('/', (req, res) => {
    res.send('Hello, TypeScript with Express!');
});

app.use('/api/auth', authRouter);
app.use('/api/message', messageRouter);

app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    next();
});


const port = process.env.PORT || 80;
connectDB();
app.listen(port, async () => {
    console.log(`Server is running on port ${port}`);
});

app.use(errorThrower);
