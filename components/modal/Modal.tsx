"use client";

import Button from "@/components/button";
import Lottie from "lottie-react";
import React from "react";
import uyari from "@/constants/lotties/uyari.json";

interface ConfirmModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
  buttonText?: string;
  hasCancelButton?: boolean;
  icon?: React.ReactNode;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  show,
  message,
  onClose,
  onConfirm,
  hasCancelButton = true,
  buttonText = "Evet",
  icon,
}) => {
  return show ? (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-white rounded-2xl w-[324px] h-[200px] z-10 flex flex-col items-center justify-between px-[21px] pb-[21px]">
        <div className="bg-white rounded-full p-3 pb-[25px] -mt-[36px] ">
          {/*<Image src={ICONS.warning} alt={"warning"} className="h-[56px] w-[56px]"/>*/}
          {icon ? (
            icon
          ) : (
            <Lottie
              animationData={uyari}
              loop={false}
              className="h-[56px] w-[56px]"
            />
          )}
        </div>
        <p className="text-center">{message}</p>
        <div className="flex flex-col w-full">
          <div className="flex justify-between mt-[25px] w-full">
            {hasCancelButton && (
              <button className="text-primary w-[135px]" onClick={onClose}>
                Vazgeç
              </button>
            )}
            <Button
              className={`text-white ${
                !hasCancelButton && "w-full"
              } w-[135px]  bg-primary hover:bg-green-800 font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-300`}
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
