import mongoose from "mongoose";


type ConnectionObject = {
    isConneted?: number
}

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
    if (connection.isConneted) {
        console.log('Already connected to database');
        return;
    }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || '');
        connection.isConneted = db.connections[0].readyState;
        console.log(db);
        console.log('Database connected successfully.');
    } catch (error) {
        console.log('Database connection failed.');
        console.log('reason', error);
        process.exit(1);
    }
}

export default dbConnect;