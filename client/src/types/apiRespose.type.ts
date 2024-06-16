import { User } from "./user.type";

export interface ApiResponse {
    success: boolean;
    message: string;
    username?: string;
    user?: User;
}