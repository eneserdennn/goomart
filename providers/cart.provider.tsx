"use client";

import {useEffect, useState} from "react";
import Modal from "@/components/modal/Modal";
import UpdateCartModal from "@/components/modal/UpdateCartModal";

interface CartProviderProps {
    children: React.ReactNode;
}

export default function CartProvider({ children }: CartProviderProps) {
    const [cartUpdated, setCartUpdated] = useState(false);
    return (
        <>
            {children}
            <UpdateCartModal show={cartUpdated} onClose={() => {}} onConfirm={() => {}} message={ 'asdasjhd'} />
        </>
    );
}
