import { User } from "./user.type";

export interface ApiResponse {
    success: boolean;
    message: string;
    user?: User;
}