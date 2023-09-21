"use client";

import Loading from "../loading";
import ProductCard from "@/components/product-cards/ProductCard";
import ProductCardDiscount from "@/components/product-cards/ProductCardDiscount";
import ProductCardOutOfStock from "@/components/product-cards/ProductOutOfStock";

import React from "react";
import { useGetMyFavoriteProductsQuery } from "@/redux/features/products/productApiSlice";

const FavoritesPage = () => {
  const { data, error, isLoading } = useGetMyFavoriteProductsQuery({});

  if (isLoading) return <Loading />;
  return (
    <div
      className={`flex flex-row justify-between mb-10 shadow w-full bg-white p-1 ${
        window.innerWidth > 360 ? "p-4" : ""
      } flex-wrap`}
    >
      {/* <ProductCardPlusButton /> */}
      {// @ts-ignore
      data?.map((product) => {
        if (product.mainProductUnitStock === 0) {
          return <ProductCardOutOfStock key={product.id} product={product} />;
        } else if (product.discountedPrice > 0)
          return <ProductCardDiscount key={product.id} product={product} />;
        else return <ProductCard key={product.id} product={product} />;
      })}
    </div>
  );
};

export default FavoritesPage;
