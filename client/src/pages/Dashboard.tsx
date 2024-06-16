import { useState } from "react";
import { BASE_URL } from "../config/api.config";
import { RootState, useAppSelector } from "../store/store"
import { IoCopyOutline } from "react-icons/io5";

const Dashboard = () => {
    const { user } = useAppSelector((state: RootState) => state.user);
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(`${BASE_URL}/whisper/${user?._id}`)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 5000);
            })
            .catch(err => console.error('Failed to copy:', err));
    };

    return (
        <main>
            <div className="bg-black text-white w-full h-20 flex items-center px-2 justify-between tracking-wider">
                <div className="text-white flex items-center gap-2">
                    <div className="w-14 h-14">
                        <img className="object-cover w-full h-full" src="/logo.png" alt="logo" />
                    </div>
                    <p className="text-lg font-semibold">Whisper Box</p>
                </div>
                <div className="text-white flex items-center gap-2">
                    <p className="text-lg font-semibold">{user?.name}</p>
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img className="object-cover w-full h-full" src={user?.avatar} alt="avatar" />
                    </div>
                </div>
            </div>
            <div className="w-full p-10 flex flex-col gap-4 ">
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
        </main>
    )
}

export default Dashboard