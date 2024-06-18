import { RootState, useAppSelector } from "../store/store";

export default function Loading() {
    const { loading } = useAppSelector((state: RootState) => state.loading);

    return (
        loading && (
            <div className="fixed top-0 left-0 flex flex-col justify-center items-center w-screen h-screen bg-gray-300 bg-opacity-50 z-20">
                <img className="animate-pulse w-32 h-32" src="/logo.png" alt="logo" />
                Loading...
            </div>
        )
    );
}