import { authApi } from "../api/authApi";
import { googleOAuthApi } from "../api/googleOAuthApi";
import { setError } from "../store/slices/error.slice";
import { setLoading } from "../store/slices/loading.slice";
import { setSuccess } from "../store/slices/success.slice";
import { setUser } from "../store/slices/user.slice";
import { useAppDispatch } from "../store/store";
import { useNavigate } from "react-router-dom";

export default function useLogin() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

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
                dispatch(setUser(resAuthApi.user));
                navigate(`/u/${resAuthApi.username}`);
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