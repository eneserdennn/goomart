'use client'

import ProductCardPlusButton from "@/components/product-cards/ProductCardPlusButton";
import React from "react";

const FavoritesPage = () => {
    return (
        <div className={`flex flex-row justify-between mb-10 shadow w-full bg-white p-1 ${window.innerWidth > 360 ? 'p-4' : ''} flex-wrap`}>
            <ProductCardPlusButton />
            <ProductCardPlusButton />
            <ProductCardPlusButton />
            <ProductCardPlusButton />
            <ProductCardPlusButton />
            <ProductCardPlusButton />
        {/*    THIS PART WILL BE DELETED AFTER API INTEGRATION*/}
        </div>
    );
};

export default FavoritesPage;
