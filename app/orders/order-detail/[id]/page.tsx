"use client";

import React, { useEffect, useState } from "react";
import { selectOrder, setOrder } from "@/redux/features/order/orderSlice";
import { useDispatch, useSelector } from "react-redux";

import BottomNavBar from "@/components/bottom-navbar/BottomNavBar";
import { ICONS } from "@/constants/iconConstants";
import { IMAGES } from "@/constants/imageConstants";
import Image from "next/image";
import OrderListCard from "@/components/product-cards/OrderListCard";
import { useGetMyAddressesQuery } from "@/redux/features/address/addressesApiSlice";
import { useGetOrderQuery } from "@/redux/features/order/orderApiSlice";
import { usePathname } from "next/navigation";

const OrderDetail = () => {
  const dispatch = useDispatch();
  const order = useSelector(selectOrder);
  const [currentStep, setCurrentStep] = useState(1);

  const pathname = usePathname();
  const path = pathname.split("/");

  const {
    data: orderData,
    error: orderError,
    isLoading: orderIsLoading,
  } = useGetOrderQuery(path[3]);

  const { data, error, isLoading } = useGetMyAddressesQuery({});
  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  useEffect(() => {
    if (!order) {
      dispatch(setOrder(orderData));
    }
  }, [orderData]);

  const STEPS = [
    { icon: ICONS.orderTaken, label: "Siparişiniz Alındı" },
    { icon: ICONS.orderPreparing, label: "Siparişiniz Hazırlanıyor" },
    { icon: ICONS.orderInCargo, label: "Kargoya Verildi" },
    { icon: ICONS.orderDelivered, label: "Teslim Edildi" },
  ];

  const dateFromApi = order?.createdAt ? new Date(order.createdAt) : new Date();

  let date = dateFromApi.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <div className="flex flex-col">
      <div className="flex px-[30px] py-[12px] bg-white w-full justify-between mb-[20px]">
        <div className="flex  flex-col items-center text-center">
          <div className="flex h-[56px] w-[56px] border border-[#E2E2E2] border-opacity-70 rounded-full items-center justify-center">
            <Image
              src={ICONS.callCenter}
              alt={"call center"}
              width={30}
              height={30}
            />
          </div>
          <span className="text-[14px] text-[#363636] font-semibold ">
            Bize Sorun
          </span>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex h-[56px] w-[56px] border border-[#E2E2E2] border-opacity-70 rounded-full items-center justify-center">
            <Image
              src={ICONS.cargoTrack}
              alt={"cargo track"}
              width={30}
              height={30}
            />
          </div>
          <span className="text-[14px] text-[#363636] font-semibold">
            Kargo Takip
          </span>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex h-[56px] w-[56px] border border-[#E2E2E2] border-opacity-70 rounded-full items-center justify-center">
            <Image src={ICONS.invoice} alt={"invoice"} width={30} height={30} />
          </div>
          <span className="text-[14px] text-[#363636] font-semibold">
            Fatura
          </span>
        </div>
      </div>

      <div className="flex flex-col bg-white h-[125px] space-y-0.5 font-semibold w-full p-[20px] mb-[20px] text-[14px]">
        <span className="text-[#6D6D6D]">
          Sipariş No: #<span className=" text-black">{order?.id}</span>
        </span>
        <span className="text-[#6D6D6D]">
          Sipariş Tarihi: <span className=" text-black">{date}</span>
        </span>
        <span className="text-[#6D6D6D]">
          Sipariş Özeti:{" "}
          <span className=" text-black">{order?.OrderProduct.length} Ürün</span>
        </span>
        <span className="text-[#6D6D6D]">
          Toplam: <span className=" text-primary">{order?.totalPrice} €</span>
        </span>
      </div>

      <div className="flex flex-col bg-white h-[100px] space-y-0.5 font-semibold w-full p-[20px] mb-[20px] text-[14px]">
        <span className="text-[#6D6D6D]">
          Tahmini Teslimat Tarihi:{" "}
          <span className=" text-black">
            {dateFromApi
              .toLocaleDateString("tr-TR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })
              .split(" ")
              .slice(0, 2)
              .join(" ")
              .concat(" - ")
              .concat(
                new Date(
                  dateFromApi.setDate(dateFromApi.getDate() + 3)
                ).toLocaleDateString("tr-TR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              )}
          </span>
        </span>
        <span className="text-[#6D6D6D]">
          Kargo Takip No: <span className=" text-black">-</span>
        </span>
        <span className="text-[#6D6D6D]">
          Teslimat Durumu:{" "}
          <span className=" text-primary">{order?.orderStatus}</span>
        </span>
      </div>

      <div className="flex flex-row bg-white h-[110px] font-semibold w-full px-[20px] justify-between items-center mb-[20px] text-[14px]">
        {STEPS.map((step, index) => (
          <React.Fragment key={index}>
            {index !== 0 && (
              <div
                className={`flex-grow h-0.5 bg-gray-300 top-[-20px] relative`}
              >
                <div
                  className={`absolute left-0  h-full bg-primary w-${
                    currentStep + 1 > index
                      ? "full"
                      : currentStep + 1 === index
                      ? "full"
                      : "0"
                  }`}
                ></div>
              </div>
            )}
            <div className="flex flex-col max-w-[47px] items-center relative">
              <div
                className={`flex flex-shrink-0 h-[47px] w-[47px] border items-center justify-center rounded-full pl-1 bg-white
                            ${
                              currentStep >= index
                                ? "border-primary"
                                : "border-gray-300"
                            }
                            `}
              >
                <Image
                  src={step.icon}
                  alt={step.label}
                  width={27}
                  height={27}
                />
              </div>
              <span
                className={`text-center ${
                  currentStep >= index ? "text-primary" : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
            </div>
          </React.Fragment>
        ))}
      </div>

      <div className="flex flex-col bg-white w-full px-[20px] pt-[13px]">
        {order?.OrderProduct.map((product) => (
          <OrderListCard product={product} />
        ))}
      </div>

      <span className="text-[14px] text-[#8E8E93] font-bold px-[20px] pt-[20px] pb-[10px]">
        Teslimat Adresi
      </span>
      <div className="flex flex-col bg-white h-[100px] w-full px-[20px] mb-4 justify-center">
        <div className="flex flex-row">
          <Image src={ICONS.address} alt={"address"} width={26} height={34} />
          <div className="flex flex-col ml-[20px]">
            <span className="text-[13px] font-bold">Ozgur Designer</span>
            <span className="text-[13px] text-[#6D6D6D] max-w-[245px] font-semibold">
              Menderes caddesi , deniz sk. 45 , 34000 Atasehir , Istanbul,
              Türkiye
            </span>
          </div>
        </div>
      </div>

      <span className="text-[14px] text-[#8E8E93] font-bold px-[20px] pt-[10px] pb-[10px]">
        Teslimat Türü
      </span>
      <div className="flex flex-col bg-white h-[80px] w-full pl-[20px] pr-[25px] mb-4 justify-center">
        <div className="flex flex-row justify-between">
          <span className="text-[14px] font-semibold">DHL EU STANDARD</span>
          <Image
            src={IMAGES.paymentMethod}
            alt={"address"}
            width={48}
            height={14}
          />
        </div>
      </div>

      <span className="text-[14px] text-[#8E8E93] font-bold px-[20px] pt-[10px] pb-[10px]">
        Ödeme Yöntemi
      </span>
      <div className="flex flex-col bg-white h-[80px] w-full pl-[20px] pr-[25px] mb-4 justify-center">
        <div className="flex flex-row items-center justify-between">
          <span className="text-[14px] font-semibold">PayPal</span>
          <Image src={ICONS.paypal} alt={"address"} width={45} height={45} />
        </div>
      </div>

      <span className="text-[14px] text-[#8E8E93] font-bold px-[20px] pt-[10px] pb-[10px]">
        Ödeme Bilgileri
      </span>
      <div className="flex flex-col bg-white h-[300px] text-[#363636] px-[15px] py-1 w-full mb-20">
        <span className="flex w-full h-[50px] justify-between border-b items-center">
          <span className="text-[14px] font-semibold">
            Sepet Tutari (Vergi Dahil)
          </span>
          <span className="text-[14px] font-bold">{order?.totalPrice} €</span>
        </span>
        <span className="flex w-full h-[50px] justify-between border-b items-center">
          <span className="text-[14px] text-primary font-semibold">
            Indirim
          </span>
          <span className="text-[14px] text-primary font-bold">
            {order?.totalDiscount} €
          </span>
        </span>
        <span className="flex w-full h-[50px] justify-between border-b items-center">
          <span className="text-[14px] font-semibold">Kargo Ücreti</span>
          <span className="text-[14px] font-bold">15,95 €</span>
        </span>
        <span className="flex w-full h-[50px] justify-between border-b items-center">
          <span className="text-[14px] font-semibold">Poset Ücreti</span>
          <span className="text-[14px] font-bold">0,25 €</span>
        </span>
        <span className="flex w-full h-[50px] justify-between border-b items-center">
          <span className="text-[14px] font-semibold">Soguk Paketleme</span>
          <span className="text-[14px] font-bold">15,95 €</span>
        </span>
        <span className="flex w-full h-[50px] justify-between items-center">
          <span className="text-[14px] text-primary font-semibold">
            Toplam (Vergi Dahil)
          </span>
          <span className="text-[14px] text-primary font-bold">
            {Number(order?.totalPrice) + 35.95 + 0.25} €
          </span>
        </span>
      </div>

      <BottomNavBar />
    </div>
  );
};

export default OrderDetail;
