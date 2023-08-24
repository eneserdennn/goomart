'use client'

import React, {useEffect, useRef} from "react";
import { useGetProductsByProductIdQuery, useGetProductsBySubCategoryIdQuery } from "@/redux/features/products/productApiSlice";

import Loading from "@/app/loading";
import ProductCard from "@/components/product-cards/ProductCard";
import ProductCardDiscount from "@/components/product-cards/ProductCardDiscount";
import ProductCardOutOfStock from "@/components/product-cards/ProductOutOfStock";
import {RootState} from "@/redux/store";
import {useSelector} from "react-redux";

interface ProductContainerProps {
    children: React.ReactNode;
}


const ProductContainer = () => {
    const { selectedProductType, selectedSubCategory } = useSelector(
        (state: RootState) => state.category
    );

    // const { data, isLoading, error } = useGetProductsByProductIdQuery(selectedProductType.id);
    const { data, isLoading, error } = useGetProductsBySubCategoryIdQuery(selectedSubCategory.id);



    const isFirstRender = useRef(true);
    const productTypeRef = useRef(null);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

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
        content = <div className="flex items-center justify-center"><Loading /></div>;
    } else if (error) {
        content = <div>Something went wrong</div>;
    } else if (data) {
        const { ProductType } = data;
        content = (
            <div className="flex flex-col w-full justify-center">
                {ProductType.map((productType) => (
                        <div
                            key={productType.id}
                            ref={productType.name === selectedProductType.name ? productTypeRef : null}
                        >
                             <div className="p-2 mt-12 my-1 font-bold text-[15px]">
                                {productType.name}
                            </div>
                        <div className="flex flex-wrap justify-around bg-white shadow-md">
                            {productType.Product.map((product) => (
                                <ProductCard key={product.id} product={product}/>
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
