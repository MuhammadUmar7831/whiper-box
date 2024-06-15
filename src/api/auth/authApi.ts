import { ApiResponse } from "@/types/apiResponse.type";
import axios from "axios";

export const authApi = async (formData: { name: string, email: string, avatar: string }): Promise<ApiResponse> => {
    try {
        const response = await axios.post("/api/auth", formData);
        return response.data;
    } catch (error: any) {
        return {success: false, message: error.response.data};
    }
};
