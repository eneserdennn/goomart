"use client";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


interface ToastProviderProps {
    children: React.ReactNode;
}

export default function ToastProvider({ children }: ToastProviderProps) {
    return (
        <>
            {children}
            <ToastContainer toastStyle={{ borderRadius: "10px", boxShadow: "0 0 10px 1px rgba(0, 0, 0, 0.1)" }} />
        </>
    );
}
