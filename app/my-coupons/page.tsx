"use client";

import Coupon from "@/components/Coupon";
import { IMAGES } from "@/constants/imageConstants";
import Image from "next/image";
import Loading from "@/app/loading";
import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import { useGetCouponsQuery } from "@/redux/features/campaigns/couponApiSlice";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const MyCoupons = () => {
  const { data, error, isLoading } = useGetCouponsQuery({});
  const token = useSelector(selectCurrentToken);

  if (!token) {
    return (
      <div className="flex flex-col items-center pt-28">
        <Image src={IMAGES.couponEmpty} alt="empty" width={200} height={200} />
        <span className="font-bold text-[16px] mt-4 text-primary">
          Lutfen giris yapin.
        </span>
        <span className="text-[15px] mt-4 text-[#444444]">
          Kuponlarinizi gormek icin lutfen giris yapin. 🤗
        </span>
      </div>
    );
  }

  if (isLoading) return <Loading />;
  if (error)
    return (
      <div>
        <span className="text-red-500 flex p-8 text-center justify-center">
          Something went wrong, please make sure you are connected to the
          internet.
        </span>
      </div>
    );

  return (
    <div>
      {data.length === 0 && (
        <div className="flex flex-col items-center pt-28">
          <Image
            src={IMAGES.couponEmpty}
            alt="empty"
            width={200}
            height={200}
          />
          <span className="font-bold text-[16px] mt-4 text-primary">
            Aktif kupon bulunamadi.
          </span>
          <span className="text-[15px] mt-4 text-[#444444]">
            Takipte kalin ve firsatlari kacirmayin. 🤗
          </span>
        </div>
      )}

      {// @ts-ignore
      data?.map((coupon, index) => <Coupon key={index} coupon={coupon} />)}
    </div>
  );
};

export default MyCoupons;
