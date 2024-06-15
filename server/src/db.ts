import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/whiper-box';

export async function connectDB() : Promise<boolean>{
    try {
        mongoose.connect(uri);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}