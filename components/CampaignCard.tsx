import { FC, useState } from "react";
import { customError, customSuccess } from "@/components/CustomToast";
import {
  selectCampaigns,
  setAppliedCoupon,
  setInputValue,
  setWrongCoupon,
} from "@/redux/features/campaigns/campaignsSlice";
import { useDispatch, useSelector } from "react-redux";

import { ICONS } from "@/constants/iconConstants";
import Image from "next/image";
import Modal from "@/components/modal/Modal";

interface Campaign {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
}

interface CampaignCardProps {
  campaign: Campaign;
  isSelectable?: boolean;
}

const CampaignCard: FC<CampaignCardProps> = ({
  campaign,
  isSelectable = true,
}) => {
  const { id, name, description } = campaign;
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();

  const appliedCoupon = useSelector(
    (state) => selectCampaigns(state).appliedCoupon
  );

  return (
    <div className="flex flex-row bg-white px-[10px] py-[25px] justify-between h-[116px] items-center rounded-md">
      <div className="flex h-[65px] w-[65px] bg-[#B9B9B9] flex-shrink-0"></div>
      <div className="flex flex-col pl-2 flex-grow">
        {" "}
        {/* Allow the text to take up remaining space */}
        <span
          className={`font-bold text-[13px] mb-2 text-[#363636] ${
            isSelectable && "max-w-[164px]"
          }`}
        >
          {name}
        </span>
        {isSelectable && (
          <div className="flex flex-row">
            {isActive && (
              <>
                <Image src={ICONS.done} alt={"done"} width={14} height={14} />
                <span className="mx-1 text-[12px] text-primary">Uygulandi</span>
              </>
            )}
          </div>
        )}
      </div>
      <div className="flex items-center">
        {" "}
        {/* Adjust alignment */}
        {isSelectable && (
          <div
            className={`flex h-[34px] min-w-[77px] border rounded-md items-center justify-center text-${
              isActive ? "primary" : "white bg-primary"
            } text-[13px] ${isActive ? "border-primary" : "border-primary"}`}
            onClick={() => {
              if (isActive) {
                dispatch(setAppliedCoupon(null));
                customSuccess("Kupon kodu başarıyla kaldırıldı.");
              } else {
                if (appliedCoupon) {
                  setAlreadyApplied(true);
                  return;
                }
                dispatch(setAppliedCoupon(campaign));
                customSuccess("Kupon kodu başarıyla uygulandı.");
              }
            }}
          >
            {isActive ? "Kaldır" : "Uygula"}
          </div>
        )}
        <Image
          src={ICONS.rightArrow}
          alt={"rightArrow"}
          width={10}
          height={5}
          className="ml-2" // Add margin to separate the arrow
        />
        <Modal
          show={alreadyApplied}
          onClose={() => setAlreadyApplied(false)}
          message={"Sipariş için tek indirim kullanabilirsiniz."}
          hasCancelButton={false}
          buttonText={"Tamam"}
          onConfirm={() => {
            setAlreadyApplied(false);
          }}
        />
      </div>
    </div>
  );
};

export default CampaignCard;
