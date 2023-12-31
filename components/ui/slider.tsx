"use client";

import "swiper/css";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperProps, SwiperRef, SwiperSlide } from "swiper/react";

import Image from "next/image";
import Loading from "@/app/loading";
import { useGetSliderQuery } from "@/redux/features/sliderApiSlice";

export default function Slider() {
  const { data, isLoading, isError } = useGetSliderQuery({});
  const [activeSlide, setActiveSlide] = useState(0);
  const [totalSlides, setTotalSlide] = useState(0);

  useEffect(() => {
    setTotalSlide(data?.length);
  }, [data]);
  const handleSlideChange = (swiper: any) => {
    setActiveSlide(swiper.realIndex);
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <div className="relative mb-2 md:hidden">
        {/*SAG SOL BUTON EKLENECEK*/}
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          onSlideChange={handleSlideChange}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
        >
          {// @ts-ignore
          data?.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-[193px]">
                {item.image && <Image src={item.image} alt={`urun adi`} fill />}
                {!item.image && (
                  <Image
                    src="https://fastly.picsum.photos/id/930/1920/1080.jpg?hmac=7QcaO53mmZzPhWVz0AfqowZ5C_GDMbtSWQP6aOi7uuA"
                    alt={`urun adi`}
                    fill
                  />
                )}
                <div className="absolute bottom-0 left-0 z-10">
                  <span>{item.header}</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="absolute right-0 bottom-0 z-10">
          <p className="bg-deepgray/[.50] text-xs font-light text-white px-2 py-[2px] tracking-widest m-4 rounded-lg">
            {" "}
            {activeSlide + 1}/{totalSlides}
          </p>
        </div>
      </div>
      <div className="hidden md:flex w-full my-10 items-center justify-center">
        <div className="flex max-w-[1480px] gap-[42px] xl:flex-row flex-col ">
          <div className="max-w-[920px] w-full h-[470px]">
            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              className="rounded-2xl"
              onSlideChange={handleSlideChange}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
            >
              {// @ts-ignore
              data?.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="relative h-[470px]">
                    {item.image && (
                      <Image src={item.image} alt={`urun adi`} fill />
                    )}
                    {!item.image && (
                      <Image
                        src="https://fastly.picsum.photos/id/930/1920/1080.jpg?hmac=7QcaO53mmZzPhWVz0AfqowZ5C_GDMbtSWQP6aOi7uuA"
                        alt={`urun adi`}
                        fill
                      />
                    )}
                    <div className="absolute bottom-0 left-0 z-10">
                      <span>{item.header}</span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="lg:grid lg:grid-cols-2 xl:grid xl:grid-cols-1 gap-2 md:hidden">
            <div className="flex rounded-3xl w-[480px] h-[220px] bg-white shadow-lg shadow-opacity-10"></div>
            <div className="flex rounded-3xl w-[480px] h-[220px] bg-white shadow-lg shadow-opacity-10"></div>
          </div>
        </div>
      </div>
    </>
  );
}
