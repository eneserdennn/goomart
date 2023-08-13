"use client";

import BottomNavBar from "@/components/bottom-navbar/BottomNavBar";
import Categories from "@/components/categories/Categories";
import Delivery from "@/components/delivery/Delivery";
import Slider from "@/components/ui/slider";
import { redirect } from "next/navigation";
import Head from "next/head";

export default function Home() {

    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <Delivery />
            <Slider />
            <Categories />
            <BottomNavBar />
        </>
    );
}
