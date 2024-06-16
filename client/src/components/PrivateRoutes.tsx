import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../store/store";

export default function PrivateRoute() {
    const { user } = useSelector((state: RootState) => state.user);
    return user ? <Outlet /> : <Navigate to="/" />;
}
