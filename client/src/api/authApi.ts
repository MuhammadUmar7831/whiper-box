import { API_BASE_URL } from "../config/api.config";
import { ApiResponse } from "../types/apiRespose.type";
import axios from "axios";

export const authApi = async (formData: { name: string, email: string, avatar: string }): Promise<ApiResponse> => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/auth`, formData);
        return response.data;
    } catch (error: any) {
        return { success: false, message: error.response.data };
    }
};