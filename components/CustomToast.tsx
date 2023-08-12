// customToast.js
import { toast } from 'react-toastify';
import Image from 'next/image';
import {ICONS} from "@/constants/iconConstants";

export function customSuccess(message) {
    return toast.success(
        <div className="flex flex-row items-center">
            <Image src={ICONS.success} alt="right arrow" width={40} height={40} />
            <div className=" text-sm text-black pl-4">{message}</div>
        </div>,
        {
            className: "flex flex-row items-center justify-between m-4 border  p-4",
            position: "top-center",
            autoClose: 2000,
            icon: false,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            closeButton: false,
        });
}


export function customError(message) {
    return toast.error(
        <div className="flex flex-row items-center">
            <Image src={ICONS.warning} alt="right arrow" width={40} height={40} />
            <div className=" text-sm text-black pl-4">{message}</div>
        </div>,
        {
            className: "flex flex-row items-center justify-between m-4 border  p-4",
            position: "top-center",
            autoClose: 2000,
            icon: false,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            closeButton: false,
        });
}
