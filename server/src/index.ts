import express from 'express';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import { connectDB } from './db';
import authRouter from "../routes/auth.routes";
import errorThrower from '../middlewares/error.middleware';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hello, TypeScript with Express!');
});

app.use('/api/auth', authRouter);

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
