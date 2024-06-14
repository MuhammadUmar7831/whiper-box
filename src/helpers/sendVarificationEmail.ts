import { resend } from "@/lib/resend";
import { ApiResponse } from "@/types/apiResponse.type";
import VerificationEmail from "../../email/VarificationEmail";

export async function sendVarificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse> {
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Whisper Box Verification Code',
            react: VerificationEmail({ username: username, otp: verifyCode }),
        });
        return { success: true, message: 'varification email sent successfuly.' };
    } catch (error) {
        console.log({ reason: error });
        return { success: false, message: 'error sending vaification email.' };
    }
}