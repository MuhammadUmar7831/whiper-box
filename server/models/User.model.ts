import mongoose, { Schema, Document, mongo } from "mongoose";

export interface Message extends Document {
    content: string,
    createdAt: Date,
}

const MessageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true
    }
})

export interface User extends Document {
    name: string,
    email: string,
    avatar: string,
    isAccepetingMessage: boolean,
    messages: Message[]
}

const UserSchema: Schema<User> = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique: true,
        match: [/.+\@.+\..+/, 'please use a valid email address'],
    },
    avatar: {
        type: String,
    },
    isAccepetingMessage: {
        type: Boolean,
    }
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User", UserSchema));

export default UserModel;