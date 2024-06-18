import useLogin from "../hooks/useLogin";
import GoogleLogo from "../interface/GoogleLogo";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa6";
import { RootState, useAppSelector } from "../store/store";
import { Link } from "react-router-dom";

export default function Home() {
    const { handleContinueWithGoogleClick } = useLogin();
    const { user } = useAppSelector((state: RootState) => state.user);
    return (
        <main className="flex flex-col gap-4 items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-700">
            <div className="mx-auto px-4">
                <h1 className="text-4xl text-center">Make a Whisper and no body is going to know who made it</h1>
            </div>
            <h1 className='text-wrap px-4'>We made it easy for you just continue with your google account</h1>
            <button onClick={handleContinueWithGoogleClick} className="relative">
                <span className="absolute top-1 left-1 h-full w-full rounded bg-black" />
                {/*  */}
                <motion.span
                    initial={{ top: '0rem', left: '0rem' }}
                    whileTap={{ top: '0.25rem', left: '0.25rem' }}
                    transition={{ duration: 0.1 }}
                    className="flex gap-2 fold-bold relative h-full w-full rounded border-2 border-black bg-white px-3 py-1 text-base font-bold text-black transition duration-100 hover:bg-gray-200 hover:text-gray-900"><GoogleLogo />Continue with Google</motion.span>
            </button>
            {user && <>
                OR
                <Link to="/u" className="relative">
                    <span className="absolute top-1 left-1 h-full w-full rounded bg-black" />
                    {/*  */}
                    <motion.span
                        initial={{ top: '0rem', left: '0rem' }}
                        whileTap={{ top: '0.25rem', left: '0.25rem' }}
                        transition={{ duration: 0.1 }}
                        className="flex gap-2 fold-bold relative h-full w-full rounded border-2 border-black bg-white px-3 py-1 text-base font-bold text-black transition duration-100 hover:bg-gray-200 hover:text-gray-900">Go to Dashboard<FaArrowRight className="w-5 h-5" /></motion.span>
                </Link>
            </>}
        </main>
    );
}