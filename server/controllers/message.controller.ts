import { NextFunction, Request, Response } from "express";
import UserModel from "../models/User.model";
import errorHandler from "../errors/errorHandler";
import mongoose from "mongoose";

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