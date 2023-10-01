"use client";

import BottomNavBar from "@/components/bottom-navbar/BottomNavBar";
import { ICONS } from "@/constants/iconConstants";
import Image from "next/image";
import Link from "next/link";
import { useGetOrdersQuery } from "@/redux/features/order/orderApiSlice";

const OrderConfirmation = () => {
  const { data, error, isLoading } = useGetOrdersQuery({});
  if (isLoading) return <div>loading...</div>;
  if (error) return <div>error...</div>;

  const latestOrder = data.orders[0];
  return (
    <div className="flex flex-col items-center w-full py-[40px]">
      <div className="flex w-full items-center justify-center">
        <Image
          src={ICONS.celebrations}
          alt={"celebrations"}
          width={160}
          height={150}
          className="relative"
        />
        <Image
          src={ICONS.doneFilled}
          alt={"doneFilled"}
          width={60}
          height={60}
          className="absolute"
        />
      </div>
      <div className="flex flex-col items-center text-center">
        <span className="flex items-center text-primary w-[220px] text-[22px] font-bold mt-[20px]">
          Siparisiniz Onaylandi Tesekkür Ederiz!
        </span>
        <span className="flex items-center text-[#6D6D6D] w-[300px] text-[14px] font-semibold mt-[30px]">
          Siparis detaylarindan siparisiniz takip edebilirsiniz. Teslimat
          sürecinde gelismeler ile ilgili bildirimler alacaksiniz.
        </span>

        <Link href={`/orders/order-detail/${latestOrder.id}`}>
          <button className="flex items-center justify-center bg-primary text-white w-[220px] h-[55px] rounded-lg mt-[30px]">
            Siparis Detaylari
          </button>
        </Link>
        <span className="text-[#333333] py-[20px]">
          Siparis Numarasi: <span className="font-bold">#{latestOrder.id}</span>
        </span>
      </div>
      <BottomNavBar />
    </div>
  );
};

export default OrderConfirmation;
