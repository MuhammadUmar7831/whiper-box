import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import UserModel from '../models/User.model';
import errorHandler from '../errors/errorHandler';
import dotenv from 'dotenv';
import { authenticateReq } from '../middlewares/authenticate.middleware';
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
        let user = await UserModel.findOne({ email });
        res.status(200).send({ success: true });
        if (user) {
            successMessage = 'login successfull';
        } else {
            user = new UserModel({ name, email, avatar });
            await user.save();
            successMessage = 'registration successfully';
        }
        const newToken = jwt.sign({ email }, process.env.JWT_SECRET as string);
        const username = email.split('@')[0];

        res
            .cookie('access_token', newToken, { httpOnly: true })
            .status(201)
            .send({ success: true, message: successMessage, user });
    } catch (error) {
        next(error);
    }
};


export const getUser = async (req: authenticateReq, res: Response, next: NextFunction) => {
    try {
        const user = req.user;
        res
            .status(200)
            .send({ success: true, message: `Hi! ${user?.name}`, user });
    } catch (error) {
        next(error);
    }
}