import mongoose, { Schema, Document } from "mongoose";
import { User } from "./User.model";

export interface Message extends Document {
    content: string,
    createdAt: Date,
    user: mongoose.Types.ObjectId | User
}

const MessageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true })

const MessageModel = (mongoose.models.Message as mongoose.Model<Message>) || (mongoose.model<Message>("Message", MessageSchema));

export default MessageModel;