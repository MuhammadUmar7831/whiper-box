"use client"
import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { BarLoader } from "react-spinners";

export default function Loading() {
    const { loading } = useAppSelector((state: RootState) => state.loading);

    return (
        loading && (
            <div className="fixed top-0 left-0 flex justify-center items-center w-screen h-screen bg-gray-300 bg-opacity-50">
                <BarLoader color="#343434" width={200} />
            </div>
        )
    );
}
