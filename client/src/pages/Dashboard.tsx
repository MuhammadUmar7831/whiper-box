import { useEffect } from "react";
import { BASE_URL } from "../config/api.config";
import { RootState, useAppSelector } from "../store/store"
import { IoCopyOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import useDashboard from "../hooks/useDashboard";
import { AiOutlineDelete } from "react-icons/ai";
import DeleteModal from "../interface/DeleteModal";

const Dashboard = () => {
    const { user } = useAppSelector((state: RootState) => state.user);
    const {
        copied,
        setCopied,
        whispers,
        getUserMessages,
        deleteUserMessage,
        deleteModal,
        setDeleteModal,
        deleteMessageId,
        setDeleteMessageId
    } = useDashboard();

    useEffect(() => {
        getUserMessages();
    }, [])

    const copyToClipboard = () => {
        navigator.clipboard.writeText(`${BASE_URL}/whisper/${user?._id}`)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 5000);
            })
            .catch(err => console.error('Failed to copy:', err));
    };

    function formatDate(inputDate: Date) {
        const date = new Date(inputDate);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    }

    return (
        <main>
            {
                deleteModal &&
                <DeleteModal modalConfirm={() => { deleteUserMessage(deleteMessageId) }} modalCancel={() => setDeleteModal(false)} />
            }
            <div className="bg-black text-white w-full h-20 flex items-center px-2 justify-between tracking-wider">
                <div className="text-white flex items-center gap-2 px-6">
                    <p className="text-lg font-semibold">Whisper Box</p>
                </div>
            </div>
            <div className="w-full pt-10 flex flex-col md:flex-row justify-center items-center gap-4">
                <h1 className="text-2xl text-center font-semibold">Wellcome {user?.name}</h1>
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                    <img className="object-cover w-full h-full" src={user?.avatar} alt="avatar" />
                </div>
            </div>
            <div className="w-full p-10 flex flex-col gap-4">
                <h1 className="text-xl font-semibold">Get you whisper at this URL :</h1>
                <div className="border rounded-md p-4 flex justify-between items-center">
                    {`${BASE_URL}/whisper/${user?._id}`}
                    <button
                        className="flex gap-2 items-center rounded p-2"
                        onClick={copyToClipboard}
                    >
                        {copied ? (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                <span>copied</span>
                            </>
                        ) : (
                            <>
                                <IoCopyOutline />
                                <span>copy url</span>
                            </>

                        )}
                    </button>
                </div>
            </div>
            <div className="w-full p-10 flex flex-col gap-4">
                <h1 className="text-2xl font-semibold">Whispers:</h1>
                {whispers.length === 0 ? <p>No Whispers yet</p> : <div className="flex flex-wrap justify-between gap-4">
                    {whispers.map((whisper, index) => (
                        <div key={index} className="relative w-[49%] min-w-32">
                            <span className="absolute top-1 left-1 h-full w-full rounded bg-black" />
                            <motion.span
                                initial={{ top: '0.25rem', left: '0.25rem' }}
                                whileHover={{ top: '0rem', left: '0rem' }}
                                transition={{ duration: 0.1 }}
                                className="fold-bold relative inline-block h-full w-full rounded border-2 border-black bg-white px-3 py-1 text-base font-bold text-black transition duration-100 hover:text-gray-900">
                                <p>{whisper.content}</p>
                                <div className="flex justify-between mt-4 p-1">
                                    <span className="text-sm text-gray-400">{formatDate(whisper.createdAt)}</span>
                                    <AiOutlineDelete onClick={() => { console.log('first'); setDeleteModal(true); setDeleteMessageId(whisper._id) }} className="w-5 h-5 cursor-pointer" color="red" />
                                </div>
                            </motion.span>
                        </div>
                    ))}
                </div>}
            </div>
        </main>
    )
}

export default Dashboard