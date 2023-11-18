import CartProduct from "@/components/product-cards/CartProduct";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import {
  selectCart,
  setCartFromLocalStorage,
} from "@/redux/features/cart/cartSlice";
import { useEffect, useState } from "react";
import { useGetCartQuery } from "@/redux/features/cart/cartApiSlice";
import { useCheckCartMutation } from "@/redux/features/order/orderApiSlice";
import Loading from "@/app/loading";
import Image from "next/image";
import { IMAGES } from "@/constants/imageConstants";

const PopoverCartPanel = () => {
  const token = useSelector(selectCurrentToken);
  const cart = useSelector(selectCart);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const { data, isLoading, isError, isSuccess, error } = useGetCartQuery({});
  const [
    checkCart,
    {
      isLoading: checkLoading,
      isSuccess: successCheck,
      data: dataCheck,
      error: errorCheck,
    },
  ] = useCheckCartMutation();

  useEffect(() => {
    if (token) {
      const requestData = {
        deliveryAddressId: 1,
      };
      checkCart(requestData);
    }

    // if (!token) {
    //     dispatch(setCartFromLocalStorage());
    // }
  }, []);

  useEffect(() => {
    setTotalPrice(data?.totalPrice);
  }, [data]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  let content;

  if (isLoading) {
    return <Loading />;
  } else if (isError && (error as any).status === 401) {
    content = (
      <div className="bg-rose-500 h-[500px] w-[500px]">Card not checked</div>
    );
  } else if (successCheck)
    content = (
      <div className=" h-[500px] w-[500px] rounded-b-2xl">
        {data?.products.length > 0 ? (
          data?.products?.map((item) => (
            <CartProduct
              product={item.productItself}
              key={item.id}
              qty={item.quantityInProductUnit}
            />
          ))
        ) : (
          <div className="flex justify-center pt-20">
            <div className="flex flex-col items-center">
              <Image
                src={IMAGES.emptyCart}
                alt={"empty-cart"}
                width={250}
                height={215}
              />
              <span className="text-primary font-bold text-[16px] pt-12">
                Sepetinizde Ürün Bulunmamaktadır.
              </span>
              <span className="text-[15px] pt-2">
                Ana sayfadan sepetinize ürün ekleyebilirsiniz.
              </span>
            </div>
          </div>
        )}
      </div>
    );

  return content;
};

export default PopoverCartPanel;
