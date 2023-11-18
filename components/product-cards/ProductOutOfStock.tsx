"use client";

import React, { useState } from "react";

import { ICONS } from "@/constants/iconConstants";
import Image from "next/image";
import { addBrands } from "@/redux/features/filter/filterSlice";
import { useDispatch } from "react-redux";

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

const ProductCardOutOfStock = ({ product }: { product: Product }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  dispatch(addBrands(product.brand));

  return (
    <div className="flex relative my-2 w-[110px]">
      <div className="flex flex-col">
        <div className="flex relative flex-wrap flex-col h-[110px] w-[110px] border rounded-lg border-gray-300">
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
              className="opacity-40"
            />
          )}
          <div className="flex justify-center items-center absolute bottom-0 bg-gray-300 w-full text-center h-[26px] text-[13px] text-[#363636] text-opacity-50 rounded-b-lg mb-[-1px]">
            <span>Stok Tükendi</span>
          </div>
        </div>
        <div className="flex flex-row mt-2 mb-1">
          <span className="text-primary font-bold text-[14px] mr-2">
            {product.mainProductUnitPrice.toString().slice(0, -1)} €
          </span>
        </div>
        <div className="flex flex-row text-[13px] whitespace-nowrap w-[110px] overflow-hidden">
          <div className="whitespace-normal overflow-wrap break-word">
            <span className="font-bold mr-1">{product.brand}</span>
            <span>{product.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardOutOfStock;
