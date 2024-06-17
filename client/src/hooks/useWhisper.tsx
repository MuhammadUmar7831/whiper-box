import { useState } from "react"
import { getUserApi } from "../api/messageApi";
import { useAppDispatch } from "../store/store";
import { setLoading } from "../store/slices/loading.slice";
import { setError } from "../store/slices/error.slice";


const useWhisper = () => {
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(true);
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
    return {
        message,
        setMessage,
        getUser,
        success,
        setSuccess,
        user
    }
}

export default useWhisper