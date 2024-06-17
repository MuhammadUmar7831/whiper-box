import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
const generationConfig = {
    maxOutputTokens: 100,
};

export const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", generationConfig });