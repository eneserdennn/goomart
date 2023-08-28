import React from "react";
import ProductCard from "@/components/product-cards/ProductCard";
import ProductCardDiscount from "@/components/product-cards/ProductCardDiscount";
import ProductCardOutOfStock from "@/components/product-cards/ProductOutOfStock";

const SearchResults = ({searchResults}) => {
    return (
        <div className="flex flex-col w-full justify-center">
            <div
                className="flex flex-row w-full my-2.5 h-[34px] pl-[15px] pr-[20px] justify-between items-center text-[#363636] font-bold text-[14px] ">
                <span>Arama Sonuçları</span>
            </div>
            <div className="flex flex-wrap justify-around bg-white shadow-md">
                {searchResults.map((product) => (
                    <>
                        <ProductCard key={product.id} product={product}/>
                        <ProductCardDiscount product={product}/>
                        <ProductCardOutOfStock product={product}/>
                    </>
                ))}
            </div>
        </div>

    );
};

export default SearchResults;
