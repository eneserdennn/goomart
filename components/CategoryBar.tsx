'use client'

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetCategoriesByIdQuery } from "@/redux/features/categories/categoriesApiSlice";
import {
    selectSelectedCategory,
    selectSubCategories,
    selectProductTypes,
    selectSelectedSubCategory,
    selectSelectedProductType,
    setSubCategories,
    setProductTypes,
    setSelectedSubCategory,
    setSelectedProductType,
    setSelectedCategory,
} from "@/redux/features/filter/filterSlice";
import Loading from "@/app/loading";

interface ISubCategory {
    id: string;
    name: string;
    description: string;
    image: string;
    ProductType: IProductType[];
}

interface IProductType {
    id: string;
    name: string;
    description: string;
    image: string;
}

interface CategoryBarCompProps {
    categoryId: number;
}

const CategoryBarComp = ({ categoryId }: CategoryBarCompProps) => {
    const { data, isLoading, isSuccess, isError, error } = useGetCategoriesByIdQuery(categoryId);
    const dispatch = useDispatch();

    useEffect(() => {
        if (data) {
            dispatch(setSelectedCategory(data));
        }
    }, [data, dispatch]);

    const category = useSelector(selectSelectedCategory);
    const subCategories = useSelector(selectSubCategories);
    const selectedSubCategory = useSelector(selectSelectedSubCategory);
    const productTypes = useSelector(selectProductTypes);
    const selectedProductType = useSelector(selectSelectedProductType);

    useEffect(() => {
        if (category?.SubCategory) {
            dispatch(setSubCategories(category.SubCategory));
        }
    }, [category, dispatch]);

    useEffect(() => {
        if (selectedSubCategory?.ProductType) {
            dispatch(setProductTypes(selectedSubCategory.ProductType));
        }
    }, [selectedSubCategory, dispatch]);

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        console.log(error);
        return (
            <div>
                <h1>Something went wrong!</h1>
            </div>
        );
    }

    if (isSuccess && category) {
        const SubCategory = subCategories;
        if (!selectedSubCategory?.id) {
            dispatch(setSelectedSubCategory(SubCategory[0]));
        }
        if (!selectedProductType?.id) {
            dispatch(setSelectedProductType(productTypes[0]));
        }
        return (
            <div className="sticky top-0 z-10 bg-white">
                <div
                    className="flex overflow-x-auto h-[37px] items-center bg-[#25AC10] font-bold text-[14px] text-white whitespace-nowrap hide-scrollbar shadow relative">
                    <div className="flex items-center">
                        {SubCategory && SubCategory.map((subCategory: ISubCategory) => (
                            <div
                                className="flex flex-col justify-center mx-4 items-center relative"
                                onClick={() => {
                                    dispatch(setSelectedSubCategory(subCategory));
                                    dispatch(setSelectedProductType(subCategory.ProductType[0]));
                                }}
                                key={subCategory.id}>
                                <div className="rounded-md">{subCategory.name}
                                </div>
                                {selectedSubCategory?.id === subCategory.id && (
                                    <div
                                        className="h-1 w-full bg-yellow-400 rounded-full absolute bottom-[-6px] left-0"/>
                                )}
                            </div>
                        ))}
                        {SubCategory && SubCategory.length === 0 && (
                            <div
                                className={`flex justify-around m-1 items-center border border-[#E2E2E2] px-4 py-1 rounded-full bg-[#25AC10] text-white`}
                                key={0}>
                                Alt Kategori Yok
                            </div>
                        )}
                    </div>
                </div>
                <div>
                    <div
                        className="flex overflow-x-auto h-[45px] items-center bg-white font-semibold text-[14px] text-[#444444]  whitespace-nowrap hide-scrollbar shadow-lg">
                        <div className="flex items-center">
                            {productTypes && productTypes.length === 0 && (
                                <div
                                    className={`flex justify-around m-1 items-center border border-[#E2E2E2] px-4 py-1 rounded-full bg-[#25AC10] text-white`}
                                    key={0}>
                                    Urun Tipi Yok
                                </div>
                            )}
                            {productTypes && productTypes.map((productType: IProductType) => (
                                <div
                                    className={`flex justify-around m-1 items-center border border-[#E2E2E2] px-4 py-1 rounded-full ${selectedProductType?.id === productType.id ? 'bg-[#25AC10] text-white' : 'bg-white text-[#444444]'}`}
                                    onClick={() => {
                                        dispatch(setSelectedProductType(productType));
                                    }}
                                    key={productType.id}>{productType.id ? productType.name : 'Ürün Tipi'}</div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default CategoryBarComp;
