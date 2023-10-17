"use client";
import { ToastOptions, toast } from "react-toastify";

import { ICONS } from "@/constants/iconConstants";
import Image from "next/image";

interface CustomToastProps {
  message: string;
}

const isBrowser = typeof window !== "undefined";

const baseToastOptions: ToastOptions = {
  className: "flex flex-row items-center justify-between m-4 border p-4",
  position: isBrowser && window.innerWidth <= 768 ? "top-center" : "top-right",
  autoClose: 2000,
  icon: false,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  closeButton: false,
};

export function customSuccess(message: string): void {
  toast.success(
    <div className="flex flex-row items-center">
      <Image src={ICONS.success} alt="right arrow" width={40} height={40} />
      <div className="text-sm text-black pl-4">{message}</div>
    </div>,
    baseToastOptions,
  );
}

export function customError(message: string): void {
  toast.error(
    <div className="flex flex-row items-center">
      <Image src={ICONS.warning} alt="right arrow" width={40} height={40} />
      <div className="text-sm text-black pl-4">{message}</div>
    </div>,
    baseToastOptions,
  );
}
