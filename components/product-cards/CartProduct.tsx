import React, { useEffect, useState } from "react";
import {
  addProductToCart,
  removeProductFromCart,
} from "@/redux/features/cart/cartSlice";
import {
  useAddToCartMutation,
  useRemoveFromCartMutation,
} from "@/redux/features/cart/cartApiSlice";
import { useDispatch, useSelector } from "react-redux";

import { ICONS } from "@/constants/iconConstants";
import Image from "next/image";

interface Product {
  id: number;
  brand: string;
  name: string;
  description: string;
  image: string;
  mainProductUnitName: string;
  mainProductUnitPrice: number;
  mainProductUnitStock: number;
  productTypeId: number;
  createdAt: string;
  updatedAt: string;
  archived: boolean;
  archivedAt: string | null;
  ProductUnits: ProductUnit[];
  ProductType: ProductType;
}

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

interface ProductType {
  id: number;
  name: string;
  description: string;
  image: string;
  subCategoryId: number;
  createdAt: string;
  updatedAt: string;
  archived: boolean;
  archivedAt: string | null;
  SubCategory: SubCategory;
}

interface SubCategory {
  id: number;
  name: string;
  description: string;
  order: number;
  image: string;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  archived: boolean;
  archivedAt: string | null;
}

interface Category {
  id: number;
  name: string;
  description: string;
  order: number;
  image: string;
  createdAt: string;
  updatedAt: string;
  archived: boolean;
  archivedAt: string | null;
}

interface Props {
  product: Product;
  qty: number;
}

const CartProduct = (props: Props) => {
  const dispatch = useDispatch();
  const { product, qty } = props;

  const [count, setCount] = useState<number>(qty);
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
    setCount(count + 1);

    // @ts-ignore
    dispatch(addProductToCart(product));
  };

  const handleRemoveFromCart = () => {
    const requestData = {
      productId: product.id,
      productUnitId: product.ProductUnits[0].id,
      quantityInProductUnit: 1,
    };
    removeFromCart(requestData);
    setCount(count - 1);

    dispatch(removeProductFromCart(product.id));
  };

  let content;

  content = (
    <>
      {product && (
        <div className="flex border-b bg-white p-[10px]">
          <div
            className="flex flex-row w-full justify-between"
            onClick={() => {}}
          >
            <div className="flex items-center h-[90px] w-[90px] border rounded-[15px] border-[#E2E2E2] overflow-hidden">
              {product.image && (
                <Image
                  src={product.image}
                  alt={"product-image"}
                  width={90}
                  height={90}
                  objectFit="cover"
                />
              )}
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
                <Image
                  src={ICONS.minus}
                  alt={"image"}
                  width={13}
                  height={13}
                  onClick={() => {
                    handleRemoveFromCart();
                  }}
                />
                <div className=" bg-primary text-white h-full w-[42px] flex justify-center items-center">
                  {count}
                </div>
                <Image
                  src={ICONS.plus}
                  alt={"image"}
                  width={13}
                  height={13}
                  onClick={() => {
                    handleAddToCart();
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );

  return content;
};

export default CartProduct;
