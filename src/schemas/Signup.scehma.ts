import { z } from "zod";

export const usernameValidation = z
    .string()
    .min(2, "username must be atleast 2 charecters")
    .max(20, "username must be not more than least 2 charecters")
    .regex(/^[a-zA-Z0-9_]+$/, "username must not contain special charecters");

export const signupSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message: 'Invalid email address'}),
    password: z.string().min(6, {message: 'password must be atleast 6 charecters'})
})