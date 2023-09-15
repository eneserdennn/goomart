import React, { useEffect, useState } from "react";
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
  };

  const handleRemoveFromCart = () => {
    const requestData = {
      productId: product.id,
      productUnitId: product.ProductUnits[0].id,
      quantityInProductUnit: 1,
    };
    removeFromCart(requestData);
    setCount(count - 1);
  };

  useEffect(() => {}, [product]);

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

// import React, { useEffect, useState } from "react";
// import {
//   useAddToCartMutation,
//   useRemoveFromCartMutation,
// } from "@/redux/features/cart/cartApiSlice";
// import { useDispatch, useSelector } from "react-redux";

// import { ICONS } from "@/constants/iconConstants";
// import Image from "next/image";
// import { selectCurrentToken } from "@/redux/features/auth/authSlice";

// const ConvertProductName = (name: string): string => {
//   name = name.toLowerCase().replace(/ /g, "-");
//   name = name.replace(/ı/g, "i");
//   name = name.replace(/ö/g, "o");
//   name = name.replace(/ü/g, "u");
//   name = name.replace(/ş/g, "s");
//   name = name.replace(/ç/g, "c");
//   name = name.replace(/ğ/g, "g");
//   return name;
// };

// const CartProduct: React.FC<{ product: any }> = ({ product }) => {
//   const dispatch = useDispatch();
//   const selectedToken = useSelector(selectCurrentToken);
//   const [count, setCount] = useState<number>(1);
//   const { productItself } = product;

//   const [addToCart, { isLoading: addToCartLoading }] = useAddToCartMutation();
//   const [removeFromCart, { isLoading: removeFromCartLoading }] =
//     useRemoveFromCartMutation();

//   const handleAddToCart = () => {
//     const requestData = {
//       productId: product.productId,
//       productUnitId: product.productItself.ProductUnits[0].id,
//       quantityInProductUnit: 1,
//     };

//     addToCart(requestData);
//   };

//   const handleRemoveFromCart = () => {
//     const requestData = {
//       productId: product.productId,
//       productUnitId: product.productItself.ProductUnits[0].id,
//       quantityInProductUnit: 1,
//     };

//     removeFromCart(requestData);
//   };

//   useEffect(() => {
//     setCount(product.quantityInProductUnit);
//   }, []);

//   let content;

//   if (selectedToken) {
//     content = (
//       <div className="flex border-b bg-white p-[10px]">
//         <div
//           className="flex flex-row w-full justify-between"
//           onClick={() => {}}
//         >
//           <div className="flex items-center h-[90px] w-[90px] border rounded-[15px] border-[#E2E2E2] overflow-hidden">
//             {productItself.image && (
//               <Image
//                 src={productItself.image}
//                 alt={"product-image"}
//                 width={90}
//                 height={90}
//                 objectFit="cover"
//               />
//             )}
//           </div>

//     );
//   } else {
//     content = (
//       <div className="flex border-b bg-white p-[10px]">
//         <div
//           className="flex flex-row w-full justify-between"
//           onClick={() => {}}
//         >
//           <div className="flex items-center h-[90px] w-[90px] border rounded-[15px] border-[#E2E2E2] overflow-hidden">
//             {product.image && (
//               <Image
//                 src={product.image}
//                 alt={"product-image"}
//                 width={90}
//                 height={90}
//                 objectFit="cover"
//               />
//             )}
//           </div>

//           <div className="flex flex-col w-1/3">
//             <div className="font-semibold text-[14px]">
//               <span className="mr-1">{product.brand}</span>
//               <span>{product.name}</span>
//             </div>
//             <div className="text-primary font-bold text-[15px]">
//               €{product.mainProductUnitPrice}
//             </div>
//           </div>
//           <div className="flex justify-center items-center py-2.5 w-1/3">
//             <div className="flex justify-evenly items-center rounded-md w-[109px] h-[36px] border transition duration-150">
//               <Image
//                 src={ICONS.minus}
//                 alt={"image"}
//                 width={13}
//                 height={13}
//                 onClick={() => {
//                   if (count > 0) {
//                     setCount(count - 1);
//                   }
//                 }}
//               />
//               <div className=" bg-primary text-white h-full w-[42px] flex justify-center items-center">
//                 {
//                   // @ts-ignore
//                   product.qty
//                 }
//               </div>
//               <Image
//                 src={ICONS.plus}
//                 alt={"image"}
//                 width={13}
//                 height={13}
//                 onClick={() => {
//                   setCount(count + 1);
//                 }}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return content;
// };

// export default CartProduct;
