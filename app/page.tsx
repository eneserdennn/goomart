"use client";
import Categories from "@/components/categories/Categories";
import Delivery from "@/components/delivery/Delivery";
import Slider from "@/components/ui/slider";
import { useGetProductsQuery } from "@/app/redux/services/productsApi";


export default function Home() {
    const { data: products, error: productsError, isLoading: productsLoading } = useGetProductsQuery();

    return (
        <>
            <Delivery />
            <Slider />
            <Categories />
        </>
    );
}
