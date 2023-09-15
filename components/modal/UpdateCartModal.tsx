import Button from "@/components/button";
import { ICONS } from "@/constants/iconConstants";
import Image from "next/image";
import React from "react";

interface UpdateCartModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
  buttonText?: string;
  hasCancelButton?: boolean;
  icon?: React.ReactNode;
}

const UpdateCartModal: React.FC<UpdateCartModalProps> = ({
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
      <div className="bg-white rounded-2xl w-[338px] h-[663px] z-10 flex flex-col items-center pb-[21px] relative">
        <div className="bg-white  rounded-full p-3 pb-[25px] -mt-[36px] flex flex-col">
          {icon ? (
            icon
          ) : (
            <Image
              src={ICONS.warning}
              alt={"warning"}
              className="h-[56px] w-[56px] mb-[15px]"
            />
          )}
        </div>
        <div className="flex flex-col w-full items-center px-[15px]">
          <span className="text-center text-[#333] font-bold text-[15px]">
            Sepetiniz güncellenmistir
          </span>
          <span className="text-center text-[13px] font-bold mt-[10px] mb-[45px]">
            <span className="text-rose-600">Stok tükendi.</span> Sepetinizde
            bulunan bazi ürünler stokta tükenmesi nedeniyle sepetinizden
            kaldirildi.
          </span>

          <div className="flex flex-row w-full items-center justify-between px-[5px] pb-[10px]">
            <div className="flex items-center">
              <div className="flex w-[70px] h-[70px] bg-[#B8B8B8] flex-shrink-0"></div>
              <div className="text-[14px] ml-[15px] w-[168px]">
                <span className="font-bold">Pinar </span>
                <span>Laktozsuz 1 lt dogal günlük süt</span>
              </div>
            </div>
            <span className="text-[14px] font-bold text-[#FF2121] ">-1</span>
          </div>
          <div className="flex flex-row w-full items-center justify-between px-[5px] pb-[10px]">
            <div className="flex items-center">
              <div className="flex w-[70px] h-[70px] bg-[#B8B8B8] flex-shrink-0"></div>
              <div className="text-[14px] ml-[15px] w-[168px]">
                <span className="font-bold">Pinar </span>
                <span>Laktozsuz 1 lt dogal günlük süt</span>
              </div>
            </div>
            <span className="text-[14px] font-bold text-[#FF2121] ">-2</span>
          </div>
          <div className="flex flex-row w-full items-center justify-between px-[5px] pb-[10px]">
            <div className="flex items-center">
              <div className="flex w-[70px] h-[70px] bg-[#B8B8B8] flex-shrink-0"></div>
              <div className="text-[14px] ml-[15px] w-[168px]">
                <span className="font-bold">Pinar </span>
                <span>Laktozsuz 1 lt dogal günlük süt</span>
              </div>
            </div>
            <span className="text-[14px] font-bold text-[#FF2121] ">-3</span>
          </div>

          <div className="flex flex-row w-full items-center justify-between px-[5px] pb-[10px]">
            <div className="flex items-center">
              <div className="flex w-[70px] h-[70px] bg-[#B8B8B8] flex-shrink-0"></div>
              <div className="text-[14px] ml-[15px] w-[168px]">
                <span className="font-bold">Pinar </span>
                <span>Laktozsuz 1 lt dogal günlük süt</span>
              </div>
            </div>
            <span className="text-[14px] font-bold text-[#FF2121] ">-3</span>
          </div>
        </div>
        <div className="h-full w-full bg-[#EAEAEA]"></div>

        <div className="flex flex-col bg-white border w-full items-center bottom-0 px-[15px] py-[19px] absolute">
          <Button
            className={`text-white ${
              !hasCancelButton && "w-full"
            } w-full bg-primary hover:bg-green-800 font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-300`}
            onClick={onConfirm}
            isSmall={true}
          >
            Tamam
          </Button>
        </div>
      </div>
    </div>
  ) : null;
};

export default UpdateCartModal;
