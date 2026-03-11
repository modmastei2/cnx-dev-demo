import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "devextreme/dist/css/dx.light.compact.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <RouterProvider router={router} />
        </LocalizationProvider>
    </StrictMode>,
);
