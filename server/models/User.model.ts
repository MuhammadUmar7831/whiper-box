import mongoose, { Schema, Document } from "mongoose";
import { Message } from "./Message.model";

export interface User extends Document {
    name: string,
    email: string,
    avatar: string,
    isAccepetingMessage: boolean,
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
        default: true
    }
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User", UserSchema));

export default UserModel;