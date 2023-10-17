import React, { useEffect, useState } from "react";
import OpporunityCard from "@/components/product-cards/OpportunityCard";
import { useGetACustomProductListQuery } from "@/redux/features/products/productApiSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { ICONS } from "@/constants/iconConstants";
import Image from "next/image";
import { BiSolidChevronLeft, BiSolidChevronRight } from "react-icons/bi";

const Opportunities = () => {
  const { data, error, isLoading } = useGetACustomProductListQuery({});
  const [productIdList, setProductIdList] = useState<string[]>([]);

  useEffect(() => {
    if (data && data.length > 1 && typeof data[1].products === "string") {
      try {
        const parsedArray = JSON.parse(data[1].products);
        console.log(parsedArray);
        setProductIdList(parsedArray);
      } catch (error) {
        console.error("String'i parse ederken bir hata oluştu:", error);
      }
    } else if (data && data.length > 1) {
      console.log(data[1].products);
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>error</div>;

  return (
    <div className="flex flex-col w-full my-10">
      <div className="flex flex-col justify-center items-center w-full font-bold text-[20px] mb-[97px]">
        <div>Firsatlar</div>
        <div className="flex items-center space-x-1">
          <div className="col-start-1 col-span-6 bg-[#FFD306] h-[6px] w-[6px] rounded-full"></div>
          <div className="col-start-1 col-span-6 bg-[#FFD306] h-[3px] w-[153px] rounded-full"></div>
        </div>
      </div>
      <div className="w-full relative">
        <div className="flex absolute items-center top-[-47px] left-0 right-0 mx-auto w-[1240px]">
          <div className="swiper-button-prev h-[48px] w-[60px] items-center justify-center bg-white rounded-xl mr-[60px] mb-[47px] shadow flex cursor-pointer">
            <BiSolidChevronLeft className="text-[24px]" />
          </div>
          <Swiper
            slidesPerView={5}
            spaceBetween={32}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            modules={[Navigation]}
            className="mySwiper"
          >
            {data &&
              productIdList.map((productId) => (
                <div key={productId} className="flex">
                  <SwiperSlide>
                    <OpporunityCard productId={productId} />
                  </SwiperSlide>
                </div>
              ))}
          </Swiper>
          <button className="swiper-button-next items-center justify-center h-[48px] w-[60px] bg-white rounded-xl ml-[60px] mb-[47px] shadow flex">
            <BiSolidChevronRight className="text-[24px]" />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-4 w-full">
          <div className="col-start-1 col-span-6 bg-[#EDF7F3] h-[320px] rounded-r-full"></div>
        </div>

        <div className="flex justify-center absolute bottom-[-26px] w-full ">
          <button className="bg-[#FFD306] w-[270px] h-[52px] rounded-[8px] text-[15px] font-bold text-[#0F1F2C] hover:bg-[#FFD306]/[0.8]">
            Tüm Ürünleri Gör
          </button>
        </div>
      </div>
    </div>
  );
};

export default Opportunities;
