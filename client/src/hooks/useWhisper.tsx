import { useState } from "react"
import { getUserApi, sendMessageApi } from "../api/messageApi";
import { useAppDispatch } from "../store/store";
import { setLoading } from "../store/slices/loading.slice";
import { setError } from "../store/slices/error.slice";
import { setSuccess } from "../store/slices/success.slice";
import { model } from "../lib/gemini";


const useWhisper = () => {
    const [message, setMessage] = useState('');
    const [_success, _setSuccess] = useState(true);
    const [user, setUser] = useState({});
    const dispatch = useAppDispatch();

    const getUser = async (userId: string) => {
        dispatch(setLoading(true));
        const res = await getUserApi(userId);
        if (!res.success) {
            console.log(res);
            dispatch(setError(res.message));
            setSuccess(false);
        } else {
            setUser(res.user);
            setSuccess(true);
        }
        dispatch(setLoading(false));
    }

    const sendMessage = async (userId: string | undefined) => {
        if (message.length == 0) {
            dispatch(setError('please write in text field'));
        }
        dispatch(setLoading(true));
        if (userId) {
            const res = await sendMessageApi(userId, message);
            if (res.success) {
                dispatch(setSuccess(res.message));
            } else {
                dispatch(setError(res.message));
            }
        }
        dispatch(setLoading(false));
    }

    const getAiSuggestion = async () => {
        console.log('loading..');
        const prompt = "Write a story about a magic backpack."
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log(text);
    }

    return {
        message,
        setMessage,
        getUser,
        _success,
        _setSuccess,
        user,
        sendMessage,
        getAiSuggestion
    }
}

export default useWhisper