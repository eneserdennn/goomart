// ConfirmDeleteModal.tsx
import React from 'react';
import {ICONS} from "@/constants/iconConstants";
import Image from "next/image";
import Button from "@/components/button";

interface ConfirmModalProps {
    show: boolean;
    onClose: () => void;
    onConfirm: () => void;
    message: string;
    buttonText?: string;
    hasCancelButton?: boolean;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
                                                       show,
                                                       message,
                                                       onClose,
                                                       onConfirm,
                                                       hasCancelButton = true,
                                                       buttonText = "Evet",
                                                   }) => {
    return show ? (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
                className="fixed inset-0 bg-black opacity-50"
                onClick={onClose}
            ></div>
            <div className="bg-white rounded-lg w-5/6 md:max-w-md mx-auto p-4 z-10 flex flex-col items-center">
                <div className="bg-white rounded-full p-4 -mt-14 mb-4 ">
                    <Image src={ICONS.warning} alt={"warning"} className="h-12 w-12"/>
                </div>
                <div className="flex flex-col ">
                <p className="text-center">{message}</p>
                <div className="flex justify-center mt-[34px] w-full">
                    {hasCancelButton && (
                        <button className="text-primary w-[135px]" onClick={onClose}>
                            Vazgeç
                        </button>
                    )}
                    <Button
                        className=" text-white w-[135px] bg-primary hover:bg-green-800 font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-300"
                        onClick={onConfirm}
                        isSmall={true}
                    >
                        {buttonText}
                    </Button>
                </div>
            </div>
            </div>
        </div>
    ) : null;
};


export default ConfirmModal;
