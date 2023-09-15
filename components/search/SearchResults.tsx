import ProductCard from "@/components/product-cards/ProductCard";
import ProductCardDiscount from "@/components/product-cards/ProductCardDiscount";
import ProductCardOutOfStock from "@/components/product-cards/ProductOutOfStock";
import React from "react";

const SearchResults = ({ searchResults, isLoading }: any) => {
  if (isLoading) {
    return <div className="flex items-center justify-center">Loading...</div>;
  }
  return (
    <div className="flex flex-col w-full justify-center ">
      <div className="flex flex-row w-full my-2.5 h-[34px] pl-[15px] pr-[20px] justify-between items-center text-[#363636] font-bold text-[14px] ">
        <span>Arama Sonuçları</span>
      </div>
      <div className="flex flex-wrap justify-around bg-white shadow-md mb-20">
        {searchResults?.map((product: any) => (
          <div className="flex" key={product.id}>
            {product.mainProductUnitStock > 0 && product.saleAmount > 0 && (
              <ProductCardDiscount key={product.id} product={product} />
            )}

            {product.mainProductUnitStock > 0 && product.saleAmount === 0 && (
              <ProductCard key={product.id} product={product} />
            )}

            {product.mainProductUnitStock === 0 && (
              <ProductCardOutOfStock key={product.id} product={product} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
