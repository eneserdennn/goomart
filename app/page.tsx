"use client";
import Categories from "@/components/categories/Categories";
import Delivery from "@/components/delivery/Delivery";
import Slider from "@/components/ui/slider";
import { useGetProductsQuery } from "@/app/redux/services/productsApi";
import BottomNavBar from "@/components/bottom-navbar/BottomNavBar";


export default function Home() {
    const { data: products, error: productsError, isLoading: productsLoading } = useGetProductsQuery();

    return (
        <>
            <Delivery />
            <Slider />
            <Categories />
            <BottomNavBar />
        </>
    );
}
