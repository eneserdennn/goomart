'use client'

import React, {useEffect, useRef} from "react";
import {useGetProductsBySubCategoryIdQuery} from "@/redux/features/products/productApiSlice";
import {useAllProductsByCategoryIdQuery} from "@/redux/features/categories/categoriesApiSlice";

import Loading from "@/app/loading";
import ProductCard from "@/components/product-cards/ProductCard";
import ProductCardDiscount from "@/components/product-cards/ProductCardDiscount";
import ProductCardOutOfStock from "@/components/product-cards/ProductOutOfStock";
import {RootState} from "@/redux/store";
import {useSelector} from "react-redux";


interface ProductContainerProps {
    children: React.ReactNode;
}

const ProductContainer = ({categoryId}) => {
    const {selectedProductType, selectedSubCategory} = useSelector(
        (state: RootState) => state.category
    );
    const {data, isLoading, error} = useGetProductsBySubCategoryIdQuery(selectedSubCategory.id);
    const {data: data2, isLoading: isLoading2, error: error2} = useAllProductsByCategoryIdQuery(categoryId);


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

    const filtered = data2?.SubCategory.filter((subCategory) => subCategory.id === selectedSubCategory.id);

    let content;
    if (isLoading) {
        content = <div className="flex items-center justify-center"><Loading/></div>;
    } else if (error) {
        content = <div>Something went wrong</div>;
    } else if (filtered) {
        const {ProductType} = data;
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
                            {productType.Product.map((product) => {
                                let component;

                                if (product.mainProductUnitStock > 0 && product.saleAmount > 0) {
                                    component = <ProductCardDiscount key={product.id} product={product} />;
                                } else if (product.mainProductUnitStock > 0) {
                                    component = <ProductCard key={product.id} product={product} />;
                                } else {
                                    component = <ProductCardOutOfStock key={product.id} product={product} />;
                                }

                                return <div key={product.id}>{component}</div>;
                            })}

                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return content;
};

export default ProductContainer;
