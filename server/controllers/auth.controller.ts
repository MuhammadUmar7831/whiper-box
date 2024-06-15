// src/controllers/authController.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import UserModel from '../models/User.model';
import errorHandler from '../errors/errorHandler';
import dotenv from 'dotenv';
dotenv.config();

interface loginRequest extends Request {
    body: {
        name: string;
        email: string;
        avatar: string;
    };
}

export const login = async (req: loginRequest, res: Response, next: NextFunction) => {
    try {
        const { name, email, avatar } = await req.body;
        const token = await req.cookies.access_token;
        let successMessage = '';

        if (token) {
            try {
                const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
                if (decoded.email === email) {
                    successMessage = 'login successfull';
                } else {
                    return next(errorHandler(400, 'Email in token does not match request email, clear your cookies'));
                }
            } catch (error) {
                return next(errorHandler(400, 'Invalid token, clear your cookies'));
            }
        }

        const user = await UserModel.findOne({ email });
        if (user) {
            successMessage = 'login successfull';
        } else {
            const newUser = new UserModel({ name, email, avatar });
            await newUser.save();
            successMessage = 'registration successfully';
        }
        const newToken = jwt.sign({ email }, process.env.JWT_SECRET as string);
        res
            .cookie('access_token', newToken, { httpOnly: true })
            .status(201)
            .send({ success: true, message: successMessage });
    } catch (error) {
        next(error);
    }
};
