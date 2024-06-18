import useLogin from "../hooks/useLogin";
import GoogleLogo from "../interface/GoogleLogo";

export default function Home() {

    const { handleContinueWithGoogleClick } = useLogin();
    return (
        <main className="flex flex-col gap-4 items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-700">
            <div className="mx-auto px-4">
                <h1 className="text-4xl text-center">Make a Whisper and no body is going to know who made it</h1>
            </div>
            <h1 className='text-wrap px-4'>We made it easy for you just continue with your google account</h1>
            <button className="flex items-center bg-white dark:bg-gray-900 border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 dark:text-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                <GoogleLogo />
                <span onClick={handleContinueWithGoogleClick}>Continue with Google</span>
            </button>
        </main>
    );
}