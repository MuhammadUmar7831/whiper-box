"use client"
import { useEffect } from "react";
import { motion } from "framer-motion";
import { clearError } from "@/lib/slices/error.slice";
import { clearSuccess } from "@/lib/slices/success.slice";
import { RootState } from "@/lib/store";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

export default function Message() {
    const { success } = useAppSelector((state: RootState) => state.success);
    const { error } = useAppSelector((state: RootState) => state.error);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (error) {
            const timeoutId = setTimeout(() => {
                dispatch(clearError());
            }, 5000);

            return () => clearTimeout(timeoutId);
        }
    }, [error, dispatch]);

    useEffect(() => {
        if (success) {
            const timeoutId = setTimeout(() => {
                dispatch(clearSuccess());
            }, 5000);

            return () => clearTimeout(timeoutId);
        }
    }, [success, dispatch]);

    return (
        (success || error) && (
            <motion.div
                className={`${success ? "success" : "error"
                    } fixed top-2 left-2 border-l-4 p-4 rounded-md`}
                role="alert"
                initial={{ x: -100 }}
                animate={{ x: 0 }}
                transition={{ type: "spring", duration: 0.5 }}
            >
                <p className="font-bold">{success ? "Success" : "Error"}</p>
                {success && <p>{success}</p>}
                {error && <p>{error}</p>}
            </motion.div>
        )
    );
}
