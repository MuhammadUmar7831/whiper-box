import { motion } from "framer-motion";
import useWhisper from "../hooks/useWhisper";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Error from "./Error";
import { RootState, useAppSelector } from "../store/store";

const Whisper = () => {
    const { userId } = useParams();
    const { loading } = useAppSelector((state: RootState) => state.loading);
    const {
        message,
        setMessage,
        getUser,
        success,
        setSuccess,
        user
    } = useWhisper();

    useEffect(() => {
        console.log(userId);
        if (userId) {
            getUser(userId);
        } else {
            setSuccess(false);
        }
    }, []);

    if (loading) {
        return (
            <></>
        )
    }

    if (!loading && !success) {
        return (
            <Error />
        )
    }

    return (
        <main>
            <div className="bg-black text-white w-full h-20 flex items-center px-6 justify-between tracking-wider">
                <div className="text-white flex items-center gap-2">
                    <p className="text-lg font-semibold">Whisper Box</p>
                </div>
            </div>
            <div className="w-full pt-10 flex justify-center items-center gap-4">
                <h1 className="text-2xl text-center font-semibold">Send a whisper about {user.name}</h1>
                <div className="w-12 h-12 rounded-full overflow-hidden bg-red-500 flex-shrink-0">
                    <img className="object-cover w-full h-full" src={user.avatar} alt="avatar" />
                </div>
            </div>

            <div className="w-full p-10 flex flex-col gap-4 ">
                <h1 className="text-xl font-semibold">Type the whisper here :</h1>
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="max 200 charecters" className="border rounded-md p-4 flex justify-between items-center">

                </textarea>
                <div className="flex justify-end">
                    <button className="relative">
                        <span className="absolute top-1 left-1 h-full w-full rounded bg-black" />
                        <motion.span
                            initial={{ top: '0rem', left: '0rem' }}
                            whileTap={{ top: '0.25rem', left: '0.25rem' }}
                            transition={{ duration: 0.1 }}
                            className="fold-bold relative inline-block h-full w-full rounded border-2 border-black bg-white px-3 py-1 text-base font-bold text-black transition duration-100 hover:bg-yellow-400 hover:text-gray-900">send</motion.span>
                    </button>
                </div>
            </div>
        </main>
    )
}

export default Whisper;