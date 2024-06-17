import mongoose, { Schema, Document } from "mongoose";

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

const MessageModel = (mongoose.models.Message as mongoose.Model<Message>) || (mongoose.model<Message>("Message", MessageSchema));

export default MessageModel;