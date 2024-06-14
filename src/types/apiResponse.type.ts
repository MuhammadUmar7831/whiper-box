import { Message } from "@/models/User.model";

export interface ApiResponse {
    success: boolean;
    message: string;
    varificationCode?: string;
    messages?: Array<Message>;
}