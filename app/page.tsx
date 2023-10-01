"use client";

import BottomNavBar from "@/components/bottom-navbar/BottomNavBar";
import Categories from "@/components/categories/Categories";
import Delivery from "@/components/delivery/Delivery";
import Head from "next/head";
import Slider from "@/components/ui/slider";

export default function Home() {
  return (
    <div className="flex flex-col md:px-[238px]">
      <Head>
        <title>Home</title>
      </Head>
      <div className="sticky top-0 z-50">
        <Delivery />
      </div>
      <Slider />
      <Categories />
      <BottomNavBar />
    </div>
  );
}
