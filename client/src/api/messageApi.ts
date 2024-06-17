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