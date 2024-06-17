import { useState } from "react";
import { getUserMessagesApi } from "../api/messageApi";
import { setLoading } from "../store/slices/loading.slice";
import { RootState, useAppDispatch, useAppSelector } from "../store/store"
import { setError } from "../store/slices/error.slice";
import { Message } from "../types/message.type";

export default function useDashboard() {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state: RootState) => state.user);
    const [whispers, setWhispers] = useState<Message[] | []>([]);
    const [copied, setCopied] = useState(false);

    const getUserMessages = async () => {
        dispatch(setLoading(true));
        if (user) {
            const res = await getUserMessagesApi(user._id);
            if (!res.success) {
                dispatch(setError(res.message));
            } else {
                setWhispers(res.whispers);
            }
        }
        dispatch(setLoading(false));
    }
    return {
        copied,
        setCopied,
        whispers,
        setWhispers,
        getUserMessages
    }
}
