"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import {
  addProductToCart,
  removeProductFromCart,
} from "@/redux/features/cart/cartSlice";
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

interface ProductUnit {
  id: number;
  name: string;
  convertionToMainUnit: number;
  createdAt: string;
  updatedAt: string;
  productId: number;
  archived: boolean;
  archivedAt: string | null;
  isMainUnit: boolean;
}

interface Product {
  id: number;
  brand: string;
  name: string;
  image: string;
  description: string;
  mainProductUnitName: string;
  mainProductUnitPrice: number;
  mainProductUnitStock: number;
  subCategoryId: number;
  productTypeId: number;
  createdAt: string;
  updatedAt: string;
  archived: boolean;
  archivedAt: string | null;
  ProductUnits: ProductUnit[];
}

const ProductCard = ({ product }: { product: Product }) => {
  const dispatch = useDispatch();
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
          product.name,
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
      <AnimatePresence mode="wait">
        {quantity > 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1 }}
            className="flex flex-col border items-center justify-around p-1 border-primary bg-white h-[106px] w-[40px] ml-2 rounded-full absolute top-0 right-0 mt-[-5px] mr-[-5px] "
          >
            <Image
              src={ICONS.plus}
              alt={ICONS.warning}
              width={14}
              height={14}
              onClick={() => {
                handleAddToCart();
                setQuantity(quantity + 1);
                customSuccess("Ürün sepete eklendi.");
                // @ts-ignore
                dispatch(addProductToCart(product));
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
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1 }}
            className="flex flex-col border items-center justify-around p-1 border-primary bg-white h-[40px] w-[40px] ml-2 rounded-full absolute top-0 right-0 mt-[-5px] mr-[-5px]"
          >
            <Image
              src={ICONS.plus}
              alt={ICONS.warning}
              width={14}
              height={14}
              onClick={() => {
                handleAddToCart();
                setQuantity(quantity + 1);
                customSuccess("Ürün sepete eklendi.");
                // @ts-ignore
                dispatch(addProductToCart(product));
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductCard;
