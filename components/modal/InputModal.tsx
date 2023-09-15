import Button from "@/components/button";
import { ICONS } from "@/constants/iconConstants";
import Image from "next/image";
import React from "react";

interface InputModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  buttonText?: string;
  hasCancelButton?: boolean;
  icon?: React.ReactNode;
  inputValue: string;
  onInputChange: (newValue: string) => void;
}

const InputModal: React.FC<InputModalProps> = ({
  show,
  onClose,
  onConfirm,
  inputValue,
  onInputChange,
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
      <div className="bg-white rounded-2xl w-[324px] h-[200px] z-10 flex flex-col items-center">
        <div className="bg-white rounded-full p-3 pb-[25px] -mt-[36px] ">
          {icon ? (
            icon
          ) : (
            <Image
              src={ICONS.warning}
              alt={"warning"}
              className="h-[56px] w-[56px]"
            />
          )}
        </div>
        <div className="flex flex-col">
          <input
            className="border border-gray-300 text-[14px] rounded-md h-[50px] w-[284px] px-[12px]"
            placeholder="Kupon Kodunu Giriniz"
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
          />
          <div className="flex justify-between mt-[25px] w-full">
            {hasCancelButton && (
              <button className="text-primary w-[135px]" onClick={onClose}>
                İptal
              </button>
            )}
            <Button
              className=" text-white w-[135px] bg-primary hover:bg-green-800 font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-300"
              isSmall={true}
              onClick={() => {
                onConfirm();
                onClose();
              }}
            >
              {buttonText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default InputModal;
