import express from 'express';
import dotenv from "dotenv";
import { connectDB } from './db';
dotenv.config();

const app = express();
const port = process.env.PORT || 80;

app.get('/', (req, res) => {
    res.send('Hello, TypeScript with Express!');
});

console.log(process.env.MONGO_URI);

app.listen(port, async () => {
    const dbConnection = await connectDB();
    if (dbConnection) {
        console.log(`Server is running on port ${port}`);
    } else {
        process.exit(1);
    }
});