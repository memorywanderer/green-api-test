import "./index.scss";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from "./layouts/root-layout";
import ChatsPage from "./pages/chats/chats";
import LoginPage from "./pages/login/login";
import ProtectedLayout from "./layouts/protected-layout";

const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                Component: ProtectedLayout,
                children: [{ index: true, Component: ChatsPage }],
            },
            {
                path: "auth",
                element: <LoginPage />,
            },
        ],
    },
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
