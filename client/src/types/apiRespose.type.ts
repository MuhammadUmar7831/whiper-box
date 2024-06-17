import { Message } from "./message.type";
import { User } from "./user.type";

export interface ApiResponse {
    success: boolean;
    message: string;
    user?: User;
    whispers?: Message[]
}