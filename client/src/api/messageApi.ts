import axios from "axios";
import { API_BASE_URL } from "../config/api.config";

export const getUserApi = async (userId: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/message/getUser/${userId}`);
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export const sendMessageApi = async (userId: string, content: string) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/message/send/${userId}`, { content });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export const getUserMessagesApi = async (userId: String) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/message/getMessages/${userId}`);
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export const deleteUserMessagesApi = async (messageId: String) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/api/message/deleteMessage/${messageId}`, { withCredentials: true });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}