import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/whiper-box';

// Define custom options extending ConnectOptions
interface CustomConnectOptions extends ConnectOptions {
    useNewUrlParser?: boolean;
    useUnifiedTopology?: boolean;
    useCreateIndex?: boolean;
    useFindAndModify?: boolean;
}

export async function connectDB(): Promise<boolean> {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        } as CustomConnectOptions);
        console.log('Database connected successfully.');
        return true;
    } catch (error) {
        console.error('Failed to connect to database.', error);
        return false;
    }
}
