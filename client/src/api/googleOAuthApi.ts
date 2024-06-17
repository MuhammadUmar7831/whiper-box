import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../lib/firebaseSDK";

export const googleOAuthApi = async () => {
    try {
        const provider = new GoogleAuthProvider();
        const auth = getAuth(app);

        const result = await signInWithPopup(auth, provider);
        return { success: true, data: result };
    } catch (error) {
        return { success: false, message: `could not sigin with google` };
    }
};