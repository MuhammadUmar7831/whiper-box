import { BarLoader } from "react-spinners";
import { RootState, useAppSelector } from "../store/store";

export default function Loading() {
    const { loading } = useAppSelector((state: RootState) => state.loading);

    return (
        loading && (
            <div className="fixed top-0 left-0 flex justify-center items-center w-screen h-screen bg-gray-300 bg-opacity-50 z-20">
                <BarLoader color="#343434" width={200} />
            </div>
        )
    );
}