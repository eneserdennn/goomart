"use client";

import { FC, useState } from "react";
import {
  selectCampaigns,
  setAppliedCoupon,
  setInputValue,
  setShowModal,
  setWrongCoupon,
} from "@/redux/features/campaigns/campaignsSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetAllCampaignsQuery,
  useGetCampaignsUsableQuery,
} from "@/redux/features/campaigns/campaignApiSlice";

import BottomNavBar from "@/components/bottom-navbar/BottomNavBar";
import CampaignCard from "@/components/CampaignCard";
import { ICONS } from "@/constants/iconConstants";
import Image from "next/image";
import InputModal from "@/components/modal/InputModal";
import Loading from "@/app/loading";
import Modal from "@/components/modal/Modal";
import { customSuccess } from "@/components/CustomToast";
import { useGetCouponsQuery } from "@/redux/features/campaigns/couponApiSlice";

const CampaignsApply: FC = () => {
  const dispatch = useDispatch();
  const [inputValueState, setInputValueState] = useState("");
  const inputValue = useSelector((state) => selectCampaigns(state).inputValue);
  const showModal = useSelector((state) => selectCampaigns(state).showModal);
  const appliedCoupon = useSelector(
    (state) => selectCampaigns(state).appliedCoupon
  );
  const wrongCoupon = useSelector(
    (state) => selectCampaigns(state).wrongCoupon
  );
  const [deleteCouponModal, setDeleteCouponModal] = useState(false);

  const {
    data: usableCampaigns,
    isLoading: usableCampaignsLoading,
    error: usableCampaignsError,
  } = useGetCampaignsUsableQuery();
  const {
    data: allCampaigns,
    isLoading: allCampaignsLoading,
    error: allCampaignsError,
  } = useGetAllCampaignsQuery();
  const {
    data: coupons,
    isLoading: couponsLoading,
    error: couponsError,
  } = useGetCouponsQuery({});

  if (usableCampaignsLoading || allCampaignsLoading || couponsLoading)
    return <Loading />;
  // if (usableCampaignsError || allCampaignsError || couponsError) return <div>Something went wrong</div>;
  if (usableCampaignsError || couponsError)
    return <div>Something went wrong</div>;

  const handleInputChange = (newValue: string) => {
    setInputValueState(newValue);
    dispatch(setInputValue(newValue));
  };

  const handleConfirm = () => {

    const matchedCoupons = coupons?.filter(
      // @ts-ignore
      (coupon) => coupon.code === inputValue
    );

    if (matchedCoupons.length > 0) {
      customSuccess("Kupon kodu başarıyla eklendi.");
      dispatch(setAppliedCoupon(matchedCoupons[0]));
    } else {
      dispatch(setWrongCoupon(true));
    }
    dispatch(setShowModal(false));
  };

  const content = (
    <>
      <div className="flex flex-col p-[20px] mb-14">
        <div className="flex w-full">
          <div className="flex bg-white items-center h-[50px] w-full rounded-lg shadow cursor-pointer hover:shadow-xl">
            <div className="flex flex-row px-[15px] items-center w-full">
              {appliedCoupon ? (
                <div className="flex flex-row items-center justify-between w-full">
                  <div className="flex flex-row items-center justify-center">
                    <Image
                      src={ICONS.couponCodeNoBg}
                      alt={"warning"}
                      className="h-[18px] w-[26px]"
                    />
                    <span className="mx-2 font-[13px] font-bold">
                      {inputValue ? inputValue : appliedCoupon.code}
                    </span>
                  </div>
                  <button
                    className="flex h-[34px] z-99 min-w-[77px] border rounded-md items-center justify-center text-primary text-[13px] border-primary"
                    onClick={() => {
                      setDeleteCouponModal(true);
                    }}
                  >
                    Kaldır
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => dispatch(setShowModal(true))}
                  className="flex flex-row items-center"
                >
                  <Image
                    src={ICONS.plus}
                    alt="plus"
                    width={20}
                    height={20}
                    className="border rounded-lg shadow h-[30px] w-[30px] p-1"
                  />
                  <span className="font-bold text-primary px-[15px] text-[14px] text-start">
                    Kupon Kodu Ekle
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        <span className="font-bold text-[13px] py-[10px] text-deepgray">
          Kullanıma Hazır Kampanyalar
        </span>
        {usableCampaigns?.map((campaign: any) => (
          <div key={campaign.id} className="my-1">
            <CampaignCard campaign={campaign} />
          </div>
        ))}
        <span className="font-bold text-[13px] py-[10px] text-deepgray">
          Kampanyalar
        </span>
        {allCampaigns?.map((campaign: any) => (
          <div key={campaign.id} className="my-1">
            <CampaignCard campaign={campaign} isSelectable={false} />
          </div>
        ))}
      </div>
      <InputModal
        show={showModal}
        onClose={() => dispatch(setShowModal(false))}
        onConfirm={handleConfirm}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        buttonText={"Tamam"}
        icon={
          <Image
            src={ICONS.couponCode}
            alt={"warning"}
            className="h-[56px] w-[56px]"
          />
        }
      />
      <Modal
        show={wrongCoupon}
        onClose={() => dispatch(setWrongCoupon(false))}
        message={"Kupon Kodu Geçersiz"}
        hasCancelButton={false}
        buttonText={"Tamam"}
        onConfirm={() => {
          dispatch(setWrongCoupon(false));
        }}
      />
      <Modal
        show={deleteCouponModal}
        onClose={() => setDeleteCouponModal(false)}
        message={
          "Kupon kodu kaldiriacaktir, devam etmek istediginize emin misiniz?"
        }
        buttonText={"Tamam"}
        onConfirm={() => {
          dispatch(setAppliedCoupon(null));
          customSuccess("Kupon kodu başarıyla kaldırıldı.");
          // setInputValue("");
          dispatch(setInputValue(""));
          setDeleteCouponModal(false);
        }}
      />
      <BottomNavBar />
    </>
  );
  if (usableCampaigns) {
    return content;
  }
  return null;
};

export default CampaignsApply;
