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
// app.use(cors({
//     origin: process.env.CLIENT_BASE_URL,
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: true
// }));
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello, TypeScript with Express!');
});

app.get('/client', (req, res) => {
    res.send(process.env.CLIENT_BASE_URL);
});

app.use('/api/auth', authRouter);
app.use('/api/message', messageRouter);

const port = process.env.PORT || 80;
app.listen(port, async () => {
    const dbConnection = await connectDB();
    if (dbConnection) {
        console.log(`Server is running on port ${port}`);
    } else {
        process.exit(1);
    }
});

app.use(errorThrower);
