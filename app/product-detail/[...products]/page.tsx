"use client";

import { customError, customSuccess } from "@/components/CustomToast";
import { useEffect, useState } from "react";

import { Disclosure } from "@headlessui/react";
import { ICONS } from "@/constants/iconConstants";
import Image from "next/image";
import Loading from "@/app/loading";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { useAddToCartMutation } from "@/redux/features/cart/cartApiSlice";
import { useDispatch } from "react-redux";
import { useGetProductsByProductIdQuery } from "@/redux/features/products/productApiSlice";

const ProductDetail = ({ params }) => {
  const dispatch = useDispatch();
  const productId = params.products[0];
  const [isDiscount, setIsDiscount] = useState<boolean>(true);
  const [isUnitPrice, setIsUnitPrice] = useState<boolean>(false);
  const { data, isLoading, isSuccess, isError } =
    useGetProductsByProductIdQuery(productId);

  const [
    addToCartMutation,
    {
      isLoading: addToCartLoading,
      isError: addToCartError,
      isSuccess: addToCartSuccess,
      error: addToCartErrorData,
      data: addToCartData,
    },
  ] = useAddToCartMutation();

  const handleAddToCart = () => {
    const requestData = {
      productId: data.id,
      productUnitId: data.ProductUnits[0].id,
      quantityInProductUnit: 1,
    };
    addToCartMutation(requestData);

    if (addToCartSuccess) {
      customSuccess("Ürün sepete eklendi");
    }
  };

  useEffect(() => {
    if (addToCartSuccess) {
      customSuccess("Ürün sepete eklendi");
    }

    if (addToCartError) {
      customError("Ürün sepete eklenemedi");
    }
  }, [addToCartSuccess]);

  const [count, setCount] = useState(1);

  let content;

  if (isLoading) {
    content = <Loading />;
  } else if (isError) {
    content = <div>Something went wrong!</div>;
  } else if (isSuccess) {
    content = (
      <div className="flex flex-col ">
        <div className="flex flex-col relative justify-center items-center pt-[15px] pb-[41px] bg-white">
          <div className="flex absolute top-[15px] left-0 w-full justify-start items-center">
            <Image src={ICONS.tags} alt={"image"} width={136} height={42} />
          </div>

          <Image
            src={data.image ? data.image : "/placeholder.png"}
            alt={"image"}
            width={250}
            height={230}
          />
          <span className="text-[16px] font-bold pt-[15px]">{data.name}</span>
          <span className="flex flex-row font-bold">
            {isDiscount ? (
              <div>
                <div className="flex flex-row items-center">
                  <div className="text-white bg-[#FFA81C] px-2 py-1 rounded-lg text-[14px]">
                    %10
                  </div>
                  <div className="pl-[10px] text-[#AAAAAA] text-[15px] line-through">
                    €{data.mainProductUnitPrice}
                  </div>
                  <div className="pl-[10px] text-primary text-[18px]">
                    €{data.mainProductUnitPrice}
                  </div>
                </div>
              </div>
            ) : (
              <div>€{data.mainProductUnitPrice}</div>
            )}
          </span>
        </div>
        <div className="flex flex-col pt-[10px] justify-center items-center">
          <div className="h-[60px] w-[360px] ">
            <div className=" w-full rounded border bg-white">
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full h-[60px] pl-[20px] border-b pr-[15px] items-center justify-between rounded py-2 text-left text-[14px] font-bold ">
                      <span>Ürün Açıklaması</span>
                      <Image
                        src={open ? ICONS.upArrowThin : ICONS.downArrowThin}
                        alt={"image"}
                        width={12}
                        height={7}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                      {data.description}
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </div>
          </div>
        </div>
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300">
          {data.mainProductUnitStock <= 0 ? (
            <div className="flex justify-center py-2">
              <button
                className="h-12 m-2 w-full bg-[#8E8E93B2] opacity-70 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-300"
                disabled={true}
              >
                Stokta Yok
              </button>
            </div>
          ) : isUnitPrice ? (
            <div className="flex justify-center items-center py-2.5">
              <div className="flex justify-evenly items-center rounded-md w-[188px] h-[52px] border transition duration-150">
                <Image
                  src={ICONS.minus}
                  alt={"image"}
                  width={17.25}
                  height={20}
                  onClick={() => {
                    if (count > 0) {
                      setCount(count - 1);
                    }
                  }}
                />
                <div className=" bg-primary text-white h-full w-[61px] flex justify-center items-center">
                  {count}
                </div>
                <Image
                  src={ICONS.plus}
                  alt={"image"}
                  width={17.25}
                  height={20}
                  onClick={() => {
                    setCount(count + 1);
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="flex justify-center py-2">
              <button
                className="h-12 m-2 w-full bg-primary hover:bg-green-800 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-300"
                type="submit"
                onClick={() => {
                  dispatch(
                    addToCart({
                      ...data,
                      qty: count,
                    })
                  );

                  handleAddToCart();
                }}
              >
                Sepete Ekle
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return content;
};

export default ProductDetail;
