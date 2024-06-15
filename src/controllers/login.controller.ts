import dbConnect from "@/lib/db";
import UserModel from "@/models/User.model";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function login(req: Request) {
    try {
        await dbConnect();
        const cookieStore = cookies();
        const { name, email, avatar } = await req.json();

        const user = await UserModel.findOne({ email });
        if (user) {
            // do nothing
        } else {
            const newUser = new UserModel({ name, email, avatar });
            await newUser.save();
        }
        const token = jwt.sign({ email }, process.env.JWT_SECRET);
        cookieStore.set('access-token', token);
        return Response.json(
            {
                success: true,
                message: 'Login successfull'
            },
            {
                status: 200
            }
        );

    } catch (error) {
        return Response.json(
            {
                success: false,
                message: 'Error loging in user'
            },
            {
                status: 500
            }
        )
    }
}