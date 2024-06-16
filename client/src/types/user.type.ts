import { Message } from "./message.type";

export interface User {
    _id: string;
    name: string;
    email: string;
    avatar: string;
    isAcceptingMessage: boolean;
    messages: Message[];
}
