import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import errorHandler from '../errors/errorHandler';
import UserModel, { User } from '../models/User.model';

export interface authenticateReq extends Request {
    user?: User | null
}

export const authenticate = async (req: authenticateReq, res: Response, next: NextFunction) => {
    try {
        const token = await req.cookies.access_token;
        if (token === undefined) {
            return next(errorHandler(404, 'Please login to continue'));
        } else {
            try {
                const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
                const user = await UserModel.findOne({ email: decoded.email });
                if (user === undefined) {
                    return next(errorHandler(404, 'User not found. Please login to continue'));
                }
                req.user = user;
                next();
            } catch (error) {
                return next(errorHandler(400, 'Invalid token, clear your cookies'));
            }
        }

    } catch (error) {
        next(error);
    }
}