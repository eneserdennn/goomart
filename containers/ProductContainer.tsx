'use client'
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import React, { useEffect, useRef } from "react";

import { useGetProductsAdvancedQueryQuery } from "@/redux/features/products/productApiSlice";
import ProductCard from "@/components/product-cards/ProductCard";
import Loading from "@/app/loading";
import ProductCardDiscount from "@/components/product-cards/ProductCardDiscount";
import ProductCardOutOfStock from "@/components/product-cards/ProductOutOfStock";

interface ProductContainerProps {
    children: React.ReactNode;
}

const ProductContainer = () => {
    const { selectedProductType, selectedSubCategory } = useSelector(
        (state: RootState) => state.category
    );

    const { data, error, isLoading } = useGetProductsAdvancedQueryQuery({
        'filter-brand': 'my brand',
        'filter-product-type': 1,
        'sort-by': 'max-price',
        lang: 'en',
    });

    const productTypeRef = useRef(null);

    useEffect(() => {
        if (productTypeRef.current) {
            const stickyHeaderHeight = 74;
            const elementPosition = productTypeRef.current.offsetTop;
            const offsetPosition = elementPosition - stickyHeaderHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    }, [selectedProductType]);


    let content;
    if (isLoading) {
        content = <Loading />;
    } else if (error) {
        content = <div>Somethin went wrong</div>;
    } else if (data) {
        const data2 = [...data, ...data];
        content = (
            <div className="flex flex-col w-full justify-center">
                {selectedSubCategory.ProductType.map((productType) => (
                    <div
                        key={productType.id}
                        ref={productType.name === selectedProductType.name ? productTypeRef : null}
                    >
                        <div className="p-2 mt-12 my-1 font-bold text-[15px]">
                            {productType.name}
                        </div>
                        <div className="flex flex-wrap justify-around p-2 bg-white shadow-md">
                            {data2?.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return content;
};

export default ProductContainer;
