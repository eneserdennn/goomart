"use client";

import BottomNavBar from "@/components/bottom-navbar/BottomNavBar";
import Categories from "@/components/categories/Categories";
import CategoryBarComp from "@/components/CategoryBar";
import Delivery from "@/components/delivery/Delivery";
import Footer from "@/components/footer/Footer";
import Head from "next/head";
import InfoSection from "@/components/sections/InfoSection";
import MainCampaigns from "@/components/sections/MainCampaigns";
import MobileAppSection from "@/components/sections/MobileAppSection";
import Opportunities from "@/components/sections/Opportunities";
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
      <div className="md:flex hidden">
        <MainCampaigns />
      </div>
      <div className="md:flex hidden">
        <InfoSection />
      </div>
      <div className="md:flex hidden">
        <MobileAppSection />
      </div>
      <div className="md:flex hidden">
        <Footer />
      </div>
      <BottomNavBar />
    </div>
  );
}
