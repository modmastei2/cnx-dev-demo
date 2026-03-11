import { createBrowserRouter, Navigate } from "react-router-dom";
import AppLayout from "./AppLayout";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/dx" replace />,
    },
    {
        path: "/:tab",
        element: <AppLayout />,
    },
]);
