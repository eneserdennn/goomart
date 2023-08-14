'use client'

import React, {useState} from 'react';
import Image from "next/image";
import {ICONS} from "@/constants/iconConstants";

interface IProduct {
    id: string;
    brand: string;
    name: string;
    description: string;
    image: string;
    mainProductUnitName: string;
    mainProductUnitPrice: number;
    mainProductUnitStock: number;
    productTypeId: string;
    createdAt: string;
    updatedAt: string;
    archived: boolean;
    archivedAt: string;
    ProductUnits: IProductUnit[];
    ProductType: IProductType;
}

interface IProductUnit {
    id: string;
    name: string;
    convertionToMainUnit: number;
    createdAt: string;
    updatedAt: string;
    productId: string;
    archived: boolean;
    archivedAt: string;
    isMainUnit: boolean;
}

interface IProductType {
    id: string;
    name: string;
    description: string;
    image: string;
    subCategoryId: string;
    createdAt: string;
    updatedAt: string;
    archived: boolean;
    archivedAt: string;
    SubCategory: ISubCategory;
}

interface ISubCategory {
    id: string;
    name: string;
    description: string;
    order: number;
    image: string;
    categoryId: string;
    createdAt: string;
    updatedAt: string;
    archived: boolean;
    archivedAt: string;
    Category: ICategory;

}

interface ICategory {
    id: string;
    name: string;
    description: string;
    order: number;
    image: string;
    createdAt: string;
    updatedAt: string;
    archived: boolean;
    archivedAt: string;
}

const ProductCard = ({product}: { product: IProduct }) => {
    const [quantity, setQuantity] = useState(1);
    return (
        <div className="flex relative my-2 w-[110px]">
            <div className="flex flex-col">
                <div className="flex flex-wrap flex-col h-[110px] w-[110px] border rounded-lg border-primary">
                    {product.image && <Image src={product.image} alt={ICONS.warning} width={110} height={110}/>}
                    {!product.image && <Image src={ICONS.warning} alt={ICONS.warning} width={110} height={110}/>}
                </div>
                <div className="text-primary font-bold text-[14px] mt-2 mb-1">
                    {product.mainProductUnitPrice.toString().slice(0, -1)} €
                </div>
                <div className="flex flex-row text-[13px] whitespace-nowrap w-[110px] overflow-hidden">
                    <div className="whitespace-normal overflow-wrap break-word">
                        <span className="font-bold mr-1">
                            {product.brand}
                        </span>
                        <span>
                            {product.name} {product.description}
                        </span>
                    </div>
                </div>
            </div>
            <div
                className="flex flex-col border items-center justify-around p-1 border-primary bg-white h-[106px] w-[40px] ml-2 rounded-full absolute top-0 right-0 mt-[-5px] mr-[-5px] ">
                <Image src={ICONS.plus} alt={ICONS.warning} width={14} height={14}
                       onClick={() => setQuantity(quantity + 1)}/>
                <div
                    className="flex items-center text-primary font-bold text-[14px] bg-primary bg-opacity-20 rounded-full w-[32px] h-[32px] justify-center">{quantity}</div>
                <Image src={ICONS.minus} alt={ICONS.warning} width={14} height={14}
                       onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}/>
            </div>
        </div>
    );
};

export default ProductCard;
