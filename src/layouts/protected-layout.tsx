import { Navigate, Outlet, useLocation } from "react-router";
import { useApp } from "../store/store";
import { useEffect } from "react";

const ProtectedLayout = () => {
    const authState = useApp((s) => s.authState);
    const checkCookies = useApp((s) => s.checkCookies);
    const location = useLocation();

    useEffect(() => {
        checkCookies();
    }, []);

    if (authState === "pending") {
        return <span>Loading...</span>;
    }

    if (authState === "unauthenticated") {
        return <Navigate to="/auth" replace state={{ from: location }} />;
    }

    return <Outlet />;
};

export default ProtectedLayout;
