import { NextFunction, Request, Response } from "express";
import UserModel from "../models/User.model";
import errorHandler from "../errors/errorHandler";
import mongoose from "mongoose";
import MessageModel, { Message } from "../models/Message.model";
import { transporter } from "../lib/mailTransporter";
import dotenv from "dotenv";
dotenv.config();

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return next(errorHandler(404, 'Invalid URL'));
        }
        const user = await UserModel.findById(userId);
        if (!user) {
            return next(errorHandler(404, 'Invalid URL'));
        }
        return res.status(200).send({ success: true, user });
    } catch (error) {
        next(error);
    }
}

export const sendMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { content } = req.body;
        const { userId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return next(errorHandler(404, 'user not found'));
        }

        const user = await UserModel.findById(userId);
        if (!user) {
            return next(errorHandler(404, 'User not found'))
        }

        if (!user.isAccepetingMessage) {
            return next(errorHandler(400, 'This user is not currently accepting messages'));
        }

        const message = await MessageModel.create({ content, user: userId });
        await message.save();

        const mailOptions = {
            from: `"Whisper Box" <${process.env.SMTP_USER}>`,
            to: user.email,
            subject: "Someone Whispered",
            text: "Someone has whispered about you.",
            html: "<b>Someone has whispered about you.</b>",
        };

        let emailMessage = '';
        try {
            await transporter.sendMail(mailOptions);
        } catch (emailError) {
            emailMessage = `, Error sending email notification to ${user.name}`;
        }

        res.status(200).send({ success: true, message: `message sent successfully${emailMessage}` });
    } catch (error) {
        next(error);
    }
}

export const getMessageByUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return next(errorHandler(404, 'user not found'));
        }

        const user = await UserModel.findById(userId);
        if (!user) {
            return next(errorHandler(404, 'User not found'))
        }

        const messages = await MessageModel.find({ user: userId }).sort({ createdAt: -1 });
        let whispers: [] | Message[] = [];
        if (messages) {
            whispers = messages;
        }
        return res.status(200).send({ success: true, whispers })
    } catch (error) {
        return next(error);
    }
}