"use client";

import BottomNavBar from "@/components/bottom-navbar/BottomNavBar";
import Categories from "@/components/categories/Categories";
import Delivery from "@/components/delivery/Delivery";
import Head from "next/head";
import Opportunities from "@/components/Opportunities";
import Slider from "@/components/ui/slider";

export default function Home() {
  return (
    <div className="flex flex-col md:mx-auto">
      <Head>
        <title>Home</title>
      </Head>
      <div className="md:hidden sticky top-0 z-50">
        <Delivery />
      </div>
      <Slider />
      <Categories />
      <div className="md:flex hidden">
        <Opportunities />
      </div>

      <BottomNavBar />
    </div>
  );
}
