import Image from "next/image";
import {ICONS} from "@/constants/iconConstants";
import React, {useState} from "react";

import {IMAGES} from "@/constants/imageConstants";

const ProductCardPlusButton = () => {
    return (
        <div className="mx-0.5">
        <div className="flex relative my-2 w-[110px]">
            <div className="flex flex-col" onClick={() => console.log('Ürün tıklandı')}>
                <div
                    className="flex flex-wrap justify-center h-[110px] w-[110px] border rounded-lg bg-white border-primary">
                    <Image src={IMAGES.recommendProduct} alt={'image'} width={80} height={80} objectFit="fill"/>
                </div>
            </div>
            <div
                className="flex flex-col border items-center justify-around p-1 border-primary bg-white h-[31px] w-[31px] ml-2 rounded-full absolute top-0 right-0 mt-[-5px] mr-[-5px]">
                <Image src={ICONS.plus} alt={ICONS.warning} width={13} height={13} onClick={() => {
                }}/>
            </div>
        </div>
            <div className="text-primary font-bold text-[14px] mt-2 mb-1">
                99 €
            </div>
            <div className="flex flex-row text-[14px] w-[110px] ">
                <div className="whitespace-normal ">
                        <span className="font-bold mr-1">
                            Brand
                        </span>
                    <span>
                            Name Description Description D
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ProductCardPlusButton;
