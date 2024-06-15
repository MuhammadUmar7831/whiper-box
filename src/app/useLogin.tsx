"use client"

import { authApi } from "@/api/auth/authApi";
import { googleOAuthApi } from "@/api/auth/googleOAuthApi";
import { useAppDispatch } from "@/lib/hooks";
import { setError } from "@/lib/slices/error.slice";
import { setLoading } from "@/lib/slices/loading.slice";
import { setSuccess } from "@/lib/slices/success.slice";
import { useRouter } from "next/navigation";

export default function useLogin() {
    const dispatch = useAppDispatch();
    const router = useRouter();

    async function handleContinueWithGoogleClick() {
        dispatch(setLoading(true));
        const resGoogleOAuthApi = await googleOAuthApi();
        
        if (resGoogleOAuthApi.success && resGoogleOAuthApi.data) {
            const { displayName, email, photoURL } = resGoogleOAuthApi.data.user;
            const reqBody = {
                name: displayName ?? 'anonymous',
                email: email ?? 'anonymous@gmail.com',
                avatar: photoURL ?? 'https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj'
            }
            const resAuthApi = await authApi(reqBody);
            if (resAuthApi.success) {
                dispatch(setSuccess(resAuthApi.message));
                router.push('/user');
            } else {
                dispatch(setError(resAuthApi.message));
            }
        } else if (resGoogleOAuthApi.message) {
            dispatch(setError(resGoogleOAuthApi.message));
        }
        dispatch(setLoading(false));
    }
    return {
        handleContinueWithGoogleClick
    }
}