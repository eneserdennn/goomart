import React, { useEffect, useState } from "react";
import {
  useAddToCartMutation,
  useRemoveFromCartMutation,
} from "@/redux/features/cart/cartApiSlice";

import { ICONS } from "@/constants/iconConstants";
import Image from "next/image";

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

interface ICartItem {
  productId: string;
  unitId: string;
  quantityInProductUnit: number;
  mainProductUnitDiscountAmount: number;
  productItself: IProduct;
  productUnitItself: IProductUnit;
  calculatedPrice: number;
  ProductUnits: IProductUnit[];
}

const ConvertProductName = (name: string): string => {
  name = name.toLowerCase().replace(/ /g, "-");
  name = name.replace(/ı/g, "i");
  name = name.replace(/ö/g, "o");
  name = name.replace(/ü/g, "u");
  name = name.replace(/ş/g, "s");
  name = name.replace(/ç/g, "c");
  name = name.replace(/ğ/g, "g");
  return name;
};

const CartProduct: React.FC<{ product: ICartItem }> = ({ product }) => {
  const [count, setCount] = useState<number>(1);
  const { productItself } = product;

  const [addToCart, { isLoading: addToCartLoading }] = useAddToCartMutation();
  const [removeFromCart, { isLoading: removeFromCartLoading }] =
    useRemoveFromCartMutation();

  const handleAddToCart = () => {
    const requestData = {
      productId: product.productId,
      productUnitId: product.productItself.ProductUnits[0].id,
      quantityInProductUnit: 1,
    };

    addToCart(requestData);
  };

  const handleRemoveFromCart = () => {
    const requestData = {
      productId: product.productId,
      productUnitId: product.productItself.ProductUnits[0].id,
      quantityInProductUnit: 1,
    };
    removeFromCart(requestData);
  };

  useEffect(() => {
    setCount(product.quantityInProductUnit);
  }, []);

  return (
    <div className="flex border-b bg-white p-[10px]">
      <div className="flex flex-row w-full justify-between" onClick={() => {}}>
        <div className="flex items-center h-[90px] w-[90px] border rounded-[15px] border-[#E2E2E2] overflow-hidden">
          {productItself.image && (
            <Image
              src={productItself.image}
              alt={"product-image"}
              width={90}
              height={90}
              objectFit="cover"
            />
          )}
        </div>

        <div className="flex flex-col w-1/3">
          <div className="font-semibold text-[14px]">
            <span className="mr-1">{productItself.brand}</span>
            <span>{productItself.name}</span>
          </div>
          <div className="text-primary font-bold text-[15px]">
            €{productItself.mainProductUnitPrice}
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
                if (count > 0) {
                  setCount(count - 1);
                  handleRemoveFromCart();
                }
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
                setCount(count + 1);
                handleAddToCart();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
