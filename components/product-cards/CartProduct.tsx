'use client'

import React, {useState} from 'react';

import Button from '../button';
import {ICONS} from "@/constants/iconConstants";
import Image from "next/image";
import Link from 'next/link';

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


const ConvertProductName = (name: string) => {
    name = name.toLocaleLowerCase().replace(/ /g, '-');
    name = name.replace(/ı/g, 'i');
    name = name.replace(/ö/g, 'o');
    name = name.replace(/ü/g, 'u');
    name = name.replace(/ş/g, 's');
    name = name.replace(/ç/g, 'c');
    name = name.replace(/ğ/g, 'g');
    return name;
}

const CartProduct = ({product}: { product: IProduct }) => {
    const [count, setCount] = useState(1);

    return (
        <div className="flex border-b bg-white p-[10px]">
            <div className="flex flex-row w-full  justify-between " onClick={() => { console.log(product.id) }}>
            <div className="flex items-center h-[90px] w-[90px] border rounded-[15px] border-[#E2E2E2] overflow-hidden">
            {/* {!product.image && <Image src={'https://grapes.fra1.digitaloceanspaces.com/1920px-Amazon_Web_Services_Logo.svg.png-1690391588245'} alt={'product-image'} width={90} height={90} objectFit="cover"/>} */}
            {product.image && <Image src={product.image} alt={'product-image'} width={90} height={90} objectFit="cover"/>}
            </div>

                <div className="flex flex-col w-1/3">
                    <div className="font-semibold text-[14px]">
                        <span className="mr-1">{product.brand}</span>
                        <span>{product.name}</span>
                    </div>
                    <div className="text-primary font-bold text-[15px]">
                        €{product.mainProductUnitPrice}
                    </div>
                </div>
                <div className="flex justify-center items-center py-2.5 w-1/3">
                    <div className="flex justify-evenly items-center rounded-md w-[109px] h-[36px] border transition duration-150">
                        <Image src={ICONS.minus} alt={'image'} width={13} height={13} onClick={() => {
                            if (count > 0) {
                                setCount(count - 1);
                            }
                        }}/>
                        <div className=" bg-primary text-white h-full w-[42px] flex justify-center items-center">
                            {count}
                        </div>
                        <Image src={ICONS.plus} alt={'image'} width={13} height={13} onClick={() => {setCount(count + 1)}}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartProduct;
