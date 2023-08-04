"use client";
import Categories from "@/components/categories/Categories";
import Delivery from "@/components/delivery/Delivery";
import Slider from "@/components/ui/slider";
import BottomNavBar from "@/components/bottom-navbar/BottomNavBar";


export default function Home(){
    return (
        <>
            <Delivery />
            <Slider />
            <Categories />
            <BottomNavBar />
        </>
    );
}


