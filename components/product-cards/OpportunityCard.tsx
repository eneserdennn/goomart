"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { addProductToCart } from "@/redux/features/cart/cartSlice";
import {
  useAddToCartMutation,
  useRemoveFromCartMutation,
} from "@/redux/features/cart/cartApiSlice";
import { useGetProductsByProductIdQuery } from "@/redux/features/products/productApiSlice";

import { ICONS } from "@/constants/iconConstants";
import Image from "next/image";
import Link from "next/link";
import { customSuccess } from "../CustomToast";
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

const OpportunityProductCard = ({ productId }: { productId: string }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(0);
  const [addToCart, { isLoading: addToCartLoading }] = useAddToCartMutation();
  const [removeFromCart, { isLoading: removeFromCartLoading }] =
    useRemoveFromCartMutation();

  const {
    data: product,
    error,
    isLoading,
  } = useGetProductsByProductIdQuery(productId);

  useEffect(() => {
    console.log("product", product);
  }, [product]);

  if (isLoading) return <div>Loading...</div>;

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
    <div className="flex relative my-2 w-[170px]">
      <Link
        href={`/product-detail/${product?.id}/${ConvertProductName(
          product?.name,
        )}`}
      >
        <div className="flex flex-col" onClick={() => {}}>
          <div className="flex flex-wrap flex-col justify-center items-center h-[210px] w-[170px] bg-white border rounded-[10px] border-gray-200">
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
          <div className="text-primary font-bold text-[17px] mt-2 mb-1">
            {product.mainProductUnitPrice} €
          </div>
          <div className="flex flex-row text-[16px] whitespace-nowrap w-[170px] overflow-hidden">
            <div className="whitespace-normal overflow-wrap break-word">
              <span className="font-bold mr-1">{product.brand}</span>
              <span>{product.name}</span>
            </div>
          </div>
        </div>
      </Link>
      <div>
        {quantity > 0 ? (
          <div className="flex flex-col border items-center justify-around p-1 border-primary bg-white h-[130px] w-[42px] ml-2 rounded-full absolute top-0 right-0 mt-[-8px] mr-[-10px] ">
            <Image
              src={ICONS.plus}
              alt={ICONS.warning}
              width={20}
              height={20}
              onClick={() => {
                handleAddToCart();
                setQuantity(quantity + 1);
                customSuccess("Ürün sepete eklendi.");
                // @ts-ignore
                dispatch(addProductToCart(product));
              }}
            />
            <div className="flex items-center text-primary font-bold text-[14px] bg-primary bg-opacity-20 rounded-full w-[40px] h-[42px] justify-center">
              {quantity}
            </div>
            <Image
              src={ICONS.minus}
              alt={ICONS.warning}
              width={20}
              height={20}
              onClick={() => {
                handleRemoveFromCart();
                setQuantity(quantity - 1);
                customSuccess("Ürün sepetten çıkarıldı.");
              }}
            />
          </div>
        ) : (
          <div className="flex flex-col border items-center justify-around p-1 border-primary bg-white h-[42px] w-[42px] ml-2 rounded-full absolute top-0 right-0 mt-[-8px] mr-[-10px]">
            <Image
              src={ICONS.plus}
              alt={ICONS.warning}
              width={20}
              height={20}
              onClick={() => {
                handleAddToCart();
                setQuantity(quantity + 1);
                customSuccess("Ürün sepete eklendi.");
                // @ts-ignore
                dispatch(addProductToCart(product));
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default OpportunityProductCard;
