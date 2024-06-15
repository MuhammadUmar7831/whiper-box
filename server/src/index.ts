import express from 'express';
import dotenv from "dotenv";
import { connectDB } from './db';
dotenv.config();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, TypeScript with Express!');
});

const port = process.env.PORT || 80;
app.listen(port, async () => {
    const dbConnection = await connectDB();
    if (dbConnection) {
        console.log(`Server is running on port ${port}`);
    } else {
        process.exit(1);
    }
});