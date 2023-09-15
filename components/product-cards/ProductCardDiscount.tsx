"use client";

import React, { useState } from "react";

import { ICONS } from "@/constants/iconConstants";
import Image from "next/image";
import { useAddToCartMutation } from "@/redux/features/cart/cartApiSlice";
import { useDispatch } from "react-redux";

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
  discountedPrice: number;
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

const ProductCardDiscount = ({ product }: { product: IProduct }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const [addToCart, { isLoading, isError, isSuccess, data, error }] =
    useAddToCartMutation();

  const handleAddToCart = () => {
    const requestData = {
      productId: product.id,
      productUnitId: product.ProductUnits[0].id,
      quantityInProductUnit: 1,
    };

    addToCart(requestData);
  };

  return (
    <div className="flex relative my-2 w-[110px]">
      <div className="flex flex-col">
        <div className="flex flex-wrap flex-col h-[110px] w-[110px] border rounded-lg border-gray-300">
          {product.image && (
            <Image
              src={
                "https://grapes.fra1.digitaloceanspaces.com/1920px-Amazon_Web_Services_Logo.svg.png-1690391588245"
              }
              alt={ICONS.warning}
              width={110}
              height={110}
            />
          )}
          {!product.image && (
            <Image
              src={ICONS.warning}
              alt={ICONS.warning}
              width={110}
              height={110}
            />
          )}
        </div>
        <div className="flex flex-row mt-2 mb-1">
          <span className="text-primary font-bold text-[14px] mr-2">
            {product.discountedPrice}
          </span>
          <span className="text-deepgray font-bold text-[12px] line-through">
            {product.mainProductUnitPrice}
          </span>
        </div>
        <div className="flex flex-row text-[13px] whitespace-nowrap w-[110px] overflow-hidden">
          <div className="whitespace-normal overflow-wrap break-word">
            <span className="font-bold mr-1">{product.brand}</span>
            <span>
              {product.name} {product.description}
            </span>
          </div>
        </div>
      </div>
      <Image
        className="flex flex-col items-center justify-around absolute top-0 left-0 mt-[-10px] ml-[-12.5px] "
        src={ICONS.discount}
        alt={"discount"}
        width={74}
        height={64}
      />
      <span className="flex flex-col items-center justify-around absolute top-0 left-0 mt-[1px] ml-[3px] font-bold text-white text-[13px] ">
        -
        {
          // @ts-ignore
          product.saleAmount
        }
        %
      </span>
      <div className="flex flex-col border items-center justify-around p-1 border-primary bg-white h-[30px] w-[30px] ml-2 rounded-full absolute top-0 right-0 mt-[-6px] mr-[-6px] ">
        <Image
          src={ICONS.plus}
          alt={ICONS.warning}
          width={14}
          height={14}
          onClick={() => {
            handleAddToCart();
          }}
        />
      </div>
    </div>
  );
};

export default ProductCardDiscount;
