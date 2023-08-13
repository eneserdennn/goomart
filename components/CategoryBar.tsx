'use client'

import {useGetCategoriesByIdQuery} from "@/redux/features/categories/categoriesApiSlice";
import Loading from "@/app/loading";
import {useEffect, useState} from "react";
import { setProductType, setSelectedProductType, setSelectedSubCategory } from "@/redux/features/categories/categorySlice";
import {RootState} from "@/redux/store";
import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";


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


const CategoryBarComp = ({categoryId}: CategoryBarCompProps) => {
    const {data: category, isLoading, isSuccess, isError, error} = useGetCategoriesByIdQuery(categoryId);

    const dispatch = useDispatch();
    const { productType, selectedProductType, selectedSubCategory } = useSelector(
        (state: RootState) => state.category
    );
    if (isSuccess && category) {
        const { SubCategory } = category;
        if (selectedSubCategory.id === "") {
            dispatch(setSelectedSubCategory(SubCategory[0]));
            dispatch(setProductType(SubCategory[0].ProductType));
            dispatch(setSelectedProductType(SubCategory[0].ProductType[0]));
        }
    }

    useEffect(() => {
        // categoryId değiştiğinde çalışacak olan kod
        dispatch(setSelectedSubCategory({ id: "", name: "", description: "", image: "", ProductType: [] }));
        dispatch(setProductType([]));
        dispatch(setSelectedProductType({ id: "", name: "", description: "", image: "" }));
    }, [categoryId, dispatch]); // categoryId'nin değiştiği her seferde bu useEffect çalışır


    if (isLoading) {
        return (
            <Loading/>
        );
    }

    if (isError) {
        return (
            <div>
                <h1>Something went wrong!</h1>
            </div>
        );
    }

    if (isSuccess) {
        const {SubCategory} = category;
        if (selectedSubCategory.id === undefined) {
            dispatch(setSelectedSubCategory(SubCategory[0]));
            dispatch(setProductType(SubCategory[0].ProductType));
            dispatch(setSelectedProductType(SubCategory[0].ProductType[0]));

        }
        return (
            <div className="flex flex-col">
                <div
                    className="flex overflow-x-auto h-[37px] items-center bg-[#25AC10] font-bold text-[14px] text-white whitespace-nowrap hide-scrollbar shadow relative">
                    <div className="flex items-center">
                        {SubCategory && SubCategory.map((subCategory: ISubCategory) => (
                            <div
                                className="flex flex-col justify-center mx-4 items-center relative"
                                onClick={() => {
                                    dispatch(setSelectedSubCategory(subCategory));
                                    dispatch(setProductType(subCategory.ProductType));
                                    if (selectedSubCategory.id !== subCategory.id && subCategory.ProductType.length > 0) {
                                        dispatch(setSelectedProductType(subCategory.ProductType[0]));
                                        console.log('subCategory.ProductType[0]', subCategory.ProductType[0].id)
                                    }
                                }}
                                key={subCategory.id}>
                                <div className="rounded-md">{subCategory.name}
                                </div>
                                {selectedSubCategory.id === subCategory.id && (
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
                            {productType && productType.length === 0 && (
                                <div
                                    className={`flex justify-around m-1 items-center border border-[#E2E2E2] px-4 py-1 rounded-full bg-[#25AC10] text-white`}
                                    key={0}>
                                    Urun Tipi Yok
                                </div>
                            )}
                            {productType && productType.map((productType: IProductType) => (
                                <div
                                    className={`flex justify-around m-1 items-center border border-[#E2E2E2] px-4 py-1 rounded-full ${selectedProductType.id === productType.id ? 'bg-[#25AC10] text-white' : 'bg-white text-[#444444]'}`}
                                    onClick={() => {
                                        dispatch(setSelectedProductType(productType));
                                        console.log('productType.name', productType)
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
