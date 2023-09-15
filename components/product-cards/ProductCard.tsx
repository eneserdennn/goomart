"use client";

import React, { useEffect, useState } from "react";
import {
  useAddToCartMutation,
  useRemoveFromCartMutation,
} from "@/redux/features/cart/cartApiSlice";

import { ICONS } from "@/constants/iconConstants";
import Image from "next/image";
import Link from "next/link";
import { customSuccess } from "../CustomToast";
import { useCheckCartMutation } from "@/redux/features/order/orderApiSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

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
  name = name.toLocaleLowerCase().replace(/ /g, "-");
  name = name.replace(/ı/g, "i");
  name = name.replace(/ö/g, "o");
  name = name.replace(/ü/g, "u");
  name = name.replace(/ş/g, "s");
  name = name.replace(/ç/g, "c");
  name = name.replace(/ğ/g, "g");
  return name;
};

const ProductCard = ({ product }: { product: IProduct }) => {
  const [quantity, setQuantity] = useState(0);
  const [addToCart, { isLoading: addToCartLoading }] = useAddToCartMutation();
  const [removeFromCart, { isLoading: removeFromCartLoading }] =
    useRemoveFromCartMutation();

  const handleAddToCart = () => {
    const requestData = {
      productId: product.id,
      productUnitId: product.ProductUnits[0].id,
      quantityInProductUnit: 1,
    };

    addToCart(requestData);
  };

  const handleRemoveFromCart = () => {
    const requestData = {
      productId: product.id,
      productUnitId: product.ProductUnits[0].id,
      quantityInProductUnit: 1,
    };

    removeFromCart(requestData);
  };

  return (
    <div className="flex relative my-2 w-[110px]">
      <Link
        href={`/product-detail/${product.id}/${ConvertProductName(
          product.name
        )}`}
      >
        <div className="flex flex-col" onClick={() => {}}>
          <div className="flex flex-wrap flex-col justify-center h-[110px] w-[110px] border rounded-lg border-primary">
            {!product.image && (
              <Image
                src={
                  "https://grapes.fra1.digitaloceanspaces.com/1920px-Amazon_Web_Services_Logo.svg.png-1690391588245"
                }
                alt={"product-image"}
                width={110}
                height={110}
              />
            )}
            {product.image && (
              <Image
                src={ICONS.warning}
                alt={ICONS.warning}
                width={110}
                height={110}
              />
            )}
          </div>
          <div className="text-primary font-bold text-[14px] mt-2 mb-1">
            {product.mainProductUnitPrice} €
          </div>
          <div className="flex flex-row text-[13px] whitespace-nowrap w-[110px] overflow-hidden">
            <div className="whitespace-normal overflow-wrap break-word">
              <span className="font-bold mr-1">{product.brand}</span>
              <span>{product.name}</span>
            </div>
          </div>
        </div>
      </Link>
      <div className="flex flex-col border items-center justify-around p-1 border-primary bg-white h-[106px] w-[40px] ml-2 rounded-full absolute top-0 right-0 mt-[-5px] mr-[-5px] ">
        <Image
          src={ICONS.plus}
          alt={ICONS.warning}
          width={14}
          height={14}
          onClick={() => {
            handleAddToCart();
            setQuantity(quantity + 1);
            customSuccess("Ürün sepete eklendi.");
          }}
        />
        <div className="flex items-center text-primary font-bold text-[14px] bg-primary bg-opacity-20 rounded-full w-[32px] h-[32px] justify-center">
          {quantity}
        </div>
        <Image
          src={ICONS.minus}
          alt={ICONS.warning}
          width={14}
          height={14}
          onClick={() => {
            handleRemoveFromCart();
            setQuantity(quantity - 1);
            customSuccess("Ürün sepetten çıkarıldı.");
          }}
        />
      </div>
    </div>
  );
};

export default ProductCard;
