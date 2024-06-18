import { useState } from "react";
import { deleteUserMessagesApi, getUserMessagesApi } from "../api/messageApi";
import { setLoading } from "../store/slices/loading.slice";
import { RootState, useAppDispatch, useAppSelector } from "../store/store"
import { setError } from "../store/slices/error.slice";
import { Message } from "../types/message.type";
import { setSuccess } from "../store/slices/success.slice";

export default function useDashboard() {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state: RootState) => state.user);
    const [whispers, setWhispers] = useState<Message[] | []>([]);
    const [copied, setCopied] = useState(false);
    const [deleteModal, setDeleteModal] = useState<boolean>(false);
    const [deleteMessageId, setDeleteMessageId] = useState<string>('');

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

    const deleteUserMessage = async (messageId: string) => {
        dispatch(setLoading(true));
        if (user) {
            const res = await deleteUserMessagesApi(messageId);
            if (!res.success) {
                dispatch(setError(res.message));
            } else {
                setWhispers(prevWhispers => prevWhispers.filter(whisper => whisper._id !== messageId));
                dispatch(setSuccess(res.message));
            }
        }
        dispatch(setLoading(false));
        setDeleteModal(false);
    }
    return {
        copied,
        setCopied,
        whispers,
        setWhispers,
        getUserMessages,
        deleteUserMessage,
        deleteModal,
        setDeleteModal,
        deleteMessageId,
        setDeleteMessageId
    }
}
