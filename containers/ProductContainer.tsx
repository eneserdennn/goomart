'use client'

import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetProductsAdvancedQueryQuery } from "@/redux/features/products/productApiSlice";
import Loading from "@/app/loading";
import ProductCard from "@/components/product-cards/ProductCard";
import ProductCardDiscount from "@/components/product-cards/ProductCardDiscount";
import ProductCardOutOfStock from "@/components/product-cards/ProductOutOfStock";
import {
    selectIsFiltered,
    selectProducts,
    selectProductTypes,
    selectSelectedProductType,
    setProducts,
} from "@/redux/features/filter/filterSlice";

interface ProductContainerProps {
    children: React.ReactNode;
}

const ProductContainer = ({ categoryId }: ProductContainerProps) => {
    const isFiltered = useSelector(selectIsFiltered);
    const selectedProductType = useSelector(selectSelectedProductType);
    const productTypes = useSelector(selectProductTypes);
    const shouldSkipFetching = !selectedProductType?.id;


    const dispatch = useDispatch();

    const { data, isLoading, isSuccess, isError, error } = useGetProductsAdvancedQueryQuery({
        'filter-product-type': selectedProductType?.id,
    }, {
        skip: shouldSkipFetching
    });

    useEffect(() => {
        if (!isFiltered) {
            dispatch(setProducts(data));
        }
        console.log("selectedProductType", selectedProductType);
    }, [data, dispatch, isFiltered]);

    const products = useSelector(selectProducts);

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
        content = <div className="flex items-center justify-center"><Loading/></div>;
    } else if (error) {
        content = <div>Something went wrong</div>;
    } else if (data) {
        content = (
            <div className="flex flex-col w-full justify-center">
                {productTypes?.map((productType) => (
                    <div
                        key={productType.id}
                        ref={productType.name === selectedProductType.name ? productTypeRef : null}
                    >
                        <div className="p-2 mt-12 my-1 font-bold text-[15px]">
                            {productType.name}
                        </div>
                        <div className="flex flex-wrap justify-around bg-white shadow-md">
                            {products?.map((product) => {
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
