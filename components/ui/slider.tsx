'use client'
import { Swiper, SwiperProps, SwiperRef, SwiperSlide } from "swiper/react";
import 'swiper/css';
import Image from "next/image";
import React, { useState } from "react";

export default function Slider() {
    const [activeSlide, setActiveSlide] = useState<number>(0);
    const [totalSlides,setTotalSlide]=useState<number>(0);
    const handleSlideChange = (swiper:any) => {
        setActiveSlide(swiper.realIndex);
        setTotalSlide(swiper.slides.length);
        
      };
    return(
        <div className="relative">
        <Swiper
        // onInit={(e)=>console.log(e.slides.length)}
        onSlideChange={handleSlideChange}
        >
            <SwiperSlide>
              <div className="relative w-[320px] h-[200px]">
                <Image
                src='https://fastly.picsum.photos/id/930/1920/1080.jpg?hmac=7QcaO53mmZzPhWVz0AfqowZ5C_GDMbtSWQP6aOi7uuA'
                alt={`urun adi`}
                fill
                />
                </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative w-[320px] h-[200px]">
                <Image
                src='https://fastly.picsum.photos/id/930/1920/1080.jpg?hmac=7QcaO53mmZzPhWVz0AfqowZ5C_GDMbtSWQP6aOi7uuA'
                alt={`urun adi`}
                fill
                />
                </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative w-[320px] h-[200px]">
                <Image
                src='https://fastly.picsum.photos/id/930/1920/1080.jpg?hmac=7QcaO53mmZzPhWVz0AfqowZ5C_GDMbtSWQP6aOi7uuA'
                alt={`urun adi`}
                fill
                />
                </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative w-[320px] h-[200px]">
                <Image
                src='https://fastly.picsum.photos/id/930/1920/1080.jpg?hmac=7QcaO53mmZzPhWVz0AfqowZ5C_GDMbtSWQP6aOi7uuA'
                alt={`urun adi`}
                fill
                />
                </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative w-[320px] h-[200px]">
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