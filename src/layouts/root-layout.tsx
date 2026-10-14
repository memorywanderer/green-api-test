import { Outlet } from "react-router";
import "./root-layout.scss";

const RootLayout = () => {
    return (
        <main className="app">
            <Outlet />
        </main>
    );
};

export default RootLayout;
