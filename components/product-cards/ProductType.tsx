'use client'

import ProductCard from "./ProductCard";
import ProductCardDiscount from "./ProductCardDiscount";
import ProductCardOutOfStock from "./ProductOutOfStock";
import React from "react";
import { useGetProductsAdvancedQueryQuery } from "@/redux/features/products/productApiSlice"

interface ProductTypeProps {
    productType: IProductType
}

interface IProductType {
    id: string;
    name: string;
    description: string;
    image: string;
}

const ProductType = ({productType}: ProductTypeProps) => {
    const {
        data,
        isLoading,
        isError,
        error,
    } = useGetProductsAdvancedQueryQuery({"filter-product-type": productType?.id})

  return (
    
    <div className="flex flex-wrap justify-around bg-white shadow-md">
        {data?.map((product, index) => {
            let component;
            if (product.mainProductUnitStock > 0 && product.saleAmount > 0) {
                component = <ProductCardDiscount key={product.id} product={product} />;
            } else if (product.mainProductUnitStock > 0) {
                component = <ProductCard key={product.id} product={product} />;
            } else {
                component = <ProductCardOutOfStock key={product.id} product={product} />;
            }
            return <div key={product.id}>{component}</div>;
        } )}
    </div>

  )
}


export default ProductType