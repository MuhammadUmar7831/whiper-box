import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/whiper-box';

export async function connectDB() : Promise<boolean>{
    try {
        await mongoose.connect(uri);
        console.log('database connected successfully.')
        return true;
    } catch (error) {
        console.log('failed to connect to database.');
        return false;
    }
}