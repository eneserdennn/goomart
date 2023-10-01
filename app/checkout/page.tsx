"use client";

import { IoMdRadioButtonOff, IoMdRadioButtonOn } from "react-icons/io";
import { Listbox, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import {
  selectAddress,
  selectCargo,
  selectPayment,
  setAddress,
  setCargo,
  setPayment,
  setPrice,
} from "@/redux/features/checkout/checkOutSlice";
import { useDispatch, useSelector } from "react-redux";

import AddressSelect from "@/components/AddressSelect";
import { BiCheck } from "react-icons/bi";
import BottomNavBar from "@/components/bottom-navbar/BottomNavBar";
import { ICONS } from "@/constants/iconConstants";
import { IMAGES } from "@/constants/imageConstants";
import Image from "next/image";
import Link from "next/link";
import Loading from "@/app/loading";
import { selectAppliedCoupon } from "@/redux/features/campaigns/campaignsSlice";
import { selectCampaigns } from "@/redux/features/campaigns/campaignsSlice";
import { useGetCartQuery } from "@/redux/features/cart/cartApiSlice";
import { useGetMyAddressesQuery } from "@/redux/features/address/addressesApiSlice";

const people = [
  { date: "Son 1 Ay" },
  { date: "Son 3 Ay" },
  { date: "Son 6 Ay" },
];

interface CustomRadioProps {
  title: string;
  desc?: string;
  image: string;
  imageArray?: string[];
  onClick?: () => void;
}

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const appliedCoupon = useSelector(
    (state) => selectCampaigns(state).appliedCoupon
  );

  const { data: cart } = useGetCartQuery({});
  const { data: addresses, isLoading } = useGetMyAddressesQuery({});

  const selectedCargoMethod = useSelector(selectCargo);
  const selectedPaymentMethod = useSelector(selectPayment);
  const selectedAddress = useSelector(selectAddress);
  const selectedCoupon = useSelector(selectAppliedCoupon);

  useEffect(() => {
    if (selectedAddress === "" && addresses && addresses.length > 0) {
      dispatch(setAddress(addresses[0].id));
    }
  }, [addresses]);

  useEffect(() => {
    if (selectedCoupon) {
      dispatch(
        setPrice(
          // @ts-ignore
          cart?.totalPrice -
            (cart?.totalPrice * selectedCoupon.amount) / 100 +
            15.95
        )
      );
    } else {
      dispatch(setPrice(cart?.totalPrice + 15.95));
    }
  }, [selectedCoupon, cart]);

  const cargoMethods = [
    {
      title: "DHL Standart EU",
      desc: "Tahmini teslimat süresi 1-2 gün",
      image: IMAGES.paymentMethod,
    },
  ];

  const paymentMethods = [
    {
      title: "Kredi Kartı",
      imageArray: [
        ICONS.visa,
        ICONS.mastercard,
        ICONS.americanexp,
        ICONS.discover,
      ],
    },
    { title: "PayPal", image: ICONS.paypalfill },
    { title: "Klarna", image: ICONS.klarna },
    { title: "Sepa", image: ICONS.sepa },
  ];

  if (isLoading) return <Loading />;
  const CustomRadio: React.FC<CustomRadioProps> = ({
    title,
    desc,
    image,
    imageArray,
    onClick,
  }) => {
    return (
      <div
        className="flex items-center justify-between bg-white w-full border h-[70px] rounded p-4"
        onClick={onClick}
      >
        <div className="flex">
          <div className="flex items-center">
            {selectedCargoMethod === title ||
            selectedPaymentMethod === title ? (
              <IoMdRadioButtonOn className="text-primary mr-4 h-6 w-6" />
            ) : (
              <IoMdRadioButtonOff className="text-gray-300 mr-4 h-6 w-6" />
            )}
          </div>
          <div className="flex items-center">
            {" "}
            {/* Address section takes 3/5 of the width */}
            <div className="flex flex-col space-y-1">
              <span className="text-[13px] font-bold">{title}</span>
              <span className="text-[13px] font-semibold text-[#6D6D6D]">
                {desc}
              </span>
            </div>
          </div>
        </div>
        <div>
          {image && (
            <Image src={image} alt={"cargo-method"} width={37.5} height={25} />
          )}
          {imageArray && (
            <div className="flex">
              {imageArray.map((image, idx) => (
                <Image
                  key={idx}
                  src={image}
                  alt={"cargo-method"}
                  width={23}
                  height={15}
                  className="mr-1"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col">
      <div className="flex px-[20px] py-[20px]">
        <span className="text-[14px] text-[#8E8E93] font-bold ">
          Teslimat Adresi
        </span>
      </div>
      <div className="w-full h-[45px] mb-[20px]">
        <AddressSelect addresses={addresses} />
      </div>
      <span className="text-[14px] text-[#8E8E93] font-bold px-[20px] py-[10px]">
        Kargo Seçenekleri
      </span>
      <div className="flex flex-col ">
        {cargoMethods.map((cargoMethod, idx) => (
          <CustomRadio
            key={idx}
            title={cargoMethod.title}
            desc={cargoMethod.desc}
            image={cargoMethod.image}
            // onClick={() => setSelectedCargoMethod(cargoMethod.title)}
            onClick={() => dispatch(setCargo(cargoMethod.title))}
          />
        ))}
      </div>

      <span className="text-[14px] text-[#8E8E93] font-bold px-[20px] pt-[20px] pb-[10px]">
        Ödeme Yöntemi
      </span>
      <div className="flex flex-col ">
        {paymentMethods.map((paymentMethod, idx) => (
          <CustomRadio
            key={idx}
            title={paymentMethod.title}
            image={paymentMethod.image}
            imageArray={paymentMethod.imageArray}
            // onClick={() => setSelectedPaymentMethod(paymentMethod.title)}
            onClick={() => dispatch(setPayment(paymentMethod.title))}
          />
        ))}
      </div>

      <span className="text-[14px] text-[#8E8E93] font-bold px-[20px] pt-[20px] pb-[10px]">
        Kampanya
      </span>

      <Link
        href={`/campaigns/apply`}
        className="flex flex-row pl-[10px] border pr-[18px] h-[60px] bg-white justify-between items-center"
      >
        <div className="flex flex-row items-center ">
          {!appliedCoupon ? (
            <>
              <Image
                src={ICONS.campaignCheckout}
                alt={"campaign"}
                width={48}
                height={48}
                className="pr-[15px]"
              />
              <span className="text-[14px] font-bold">Kampanya Sec</span>
            </>
          ) : (
            <div className="flex flex-row">
              <div className="flex items-center">
                <Image
                  src={ICONS.couponCodeNoBg}
                  alt={"campaign"}
                  width={40}
                  height={40}
                  className="pr-[15px]"
                />
                <span className="text-[14px] text-[#363636] font-bold">
                  {appliedCoupon.code}
                </span>
              </div>
            </div>
          )}
        </div>
        <div className="flex">
          {appliedCoupon && (
            <div className="flex mr-4">
              <Image src={ICONS.done} alt={"done"} width={14} height={14} />
              <span className="mx-1 text-[12px] text-primary">Uygulandi</span>
            </div>
          )}
          <Image
            src={ICONS.rightArrow}
            alt={"right-arrow"}
            width={10}
            height={10}
          />
        </div>
      </Link>

      <span className="text-[14px] text-[#8E8E93] font-bold px-[20px] pt-[20px] pb-[10px]">
        Ödeme Bilgileri
      </span>

      <div className="flex flex-col bg-white border text-[#363636] px-[15px] py-1 w-full mb-40">
        <span className="flex w-full h-[50px] justify-between border-b items-center">
          <span className="text-[14px] font-semibold">
            Sepet Tutari (Vergi Dahil)
          </span>
          <span className="text-[14px] font-bold">{cart?.totalPrice} €</span>
        </span>
        <span className="flex w-full h-[50px] justify-between border-b items-center">
          <span className="text-[14px] text-primary font-semibold">
            Indirim Tutari
          </span>
          <span className="text-[14px] text-primary font-bold">
            {selectedCoupon
              ? (cart?.totalPrice * selectedCoupon.amount) / 100
              : 0}{" "}
            €
          </span>
        </span>
        <span className="flex w-full h-[50px] justify-between border-b items-center">
          <span className="text-[14px] font-semibold">Kargo Ücreti</span>
          <span className="text-[14px] font-bold">15,95 €</span>
        </span>
        <span className="flex w-full h-[50px] justify-between items-center">
          <span className="text-[14px] text-primary font-semibold">
            Ödenecek Tutar (Vergi Dahil)
          </span>
          <span className="text-[14px] text-primary font-bold">
            {selectedCoupon
              ? cart?.totalPrice -
                (cart?.totalPrice * selectedCoupon.amount) / 100 +
                15.95
              : cart?.totalPrice + 15.95}
            €
          </span>
        </span>
      </div>

      <div className="flex fixed justify-center flex-row bottom-[70px] bg-white left-0 w-full">
        <div className="flex flex-col items-center justify-center">
          {selectedCoupon && (
            <>
              <div className="flex w-[87px] mx-[34px] mt-1 items-center justify-center line-through">
                <span className="text-[#AAAAAA] text-[16px] font-bold items-center">
                  {cart.totalPrice + 15.95}
                </span>
                <span className="text-[#AAAAAA] text-[16px] font-bold ml-1 items-center">
                  €
                </span>
              </div>
            </>
          )}
          <div className="flex w-[87px] mx-[34px] items-center justify-center ">
            <span className="text-primary text-[21px] font-bold items-center">
              {selectedCoupon
                ? cart?.totalPrice -
                  (cart?.totalPrice * selectedCoupon.amount) / 100 +
                  15.95
                : cart?.totalPrice + 15.95}
            </span>
            <span className="text-primary text-[21px] font-bold ml-1 items-center">
              €
            </span>
          </div>
        </div>

        <div className="flex w-full">
          <Link
            href="/checkout/card-payment"
            className="flex justify-center items-center w-full h-[60px] mr-[15px] my-[6px] bg-primary rounded-lg text-white text-[18px] font-bold"
          >
            Sipariş Ver
          </Link>
        </div>
      </div>

      <BottomNavBar />
    </div>
  );
};

export default CheckoutPage;
