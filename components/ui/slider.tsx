'use client'

import 'swiper/css';

import React, { useState } from "react";
import { Swiper, SwiperProps, SwiperRef, SwiperSlide } from "swiper/react";

import Image from "next/image";

export default function Slider() {
    const [activeSlide, setActiveSlide] = useState<number>(0);
    const [totalSlides,setTotalSlide]=useState<number>(0);
    const handleSlideChange = (swiper:any) => {
        setActiveSlide(swiper.realIndex);
        setTotalSlide(swiper.slides.length);

      };
    return(
        <div className="relative mb-2">
        <Swiper
        // onInit={(e)=>console.log(e.slides.length)}
        onSlideChange={handleSlideChange}
        >
            <SwiperSlide>
            <div className="relative w-full bg-[#276C1C] h-[193px]">
                {/*<Image*/}
                {/*src='https://images.unsplash.com/photo-1502759683299-cdcd6974244f?auto=format&fit=crop&w=440&h=220&q=60'*/}
                {/*alt={`urun adi`}*/}
                {/*fill*/}
                {/*/>*/}
                </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative w-full h-[193px]">
                <Image
                src='https://fastly.picsum.photos/id/930/1920/1080.jpg?hmac=7QcaO53mmZzPhWVz0AfqowZ5C_GDMbtSWQP6aOi7uuA'
                alt={`urun adi`}
                fill
                />
                </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative w-full h-[193px]">
                <Image
                src='https://fastly.picsum.photos/id/930/1920/1080.jpg?hmac=7QcaO53mmZzPhWVz0AfqowZ5C_GDMbtSWQP6aOi7uuA'
                alt={`urun adi`}
                fill
                />
                </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative w-full h-[193px]">
                <Image
                src='https://fastly.picsum.photos/id/930/1920/1080.jpg?hmac=7QcaO53mmZzPhWVz0AfqowZ5C_GDMbtSWQP6aOi7uuA'
                alt={`urun adi`}
                fill
                />
                </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative w-full h-[193px]">
                <Image
                src='https://fastly.picsum.photos/id/930/1920/1080.jpg?hmac=7QcaO53mmZzPhWVz0AfqowZ5C_GDMbtSWQP6aOi7uuA'
                alt={`urun adi`}
                fill
                />
                </div>
            </SwiperSlide>
        </Swiper>
        <div className="absolute right-0 bottom-0 z-10">
        <p className="bg-deepgray/[.50] text-xs font-light text-white px-2 py-[2px] tracking-widest m-4 rounded-lg"> {activeSlide + 1}/{totalSlides}</p>
      </div>
        </div>
    )
}
