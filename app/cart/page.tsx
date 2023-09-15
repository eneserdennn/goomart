"use client";

import {
  selectCart,
  setCartFromLocalStorage,
} from "@/redux/features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import BottomNavBar from "@/components/bottom-navbar/BottomNavBar";
import CartProduct from "@/components/product-cards/CartProduct";
import { IMAGES } from "@/constants/imageConstants";
import Image from "next/image";
import Loading from "../loading";
import Modal from "@/components/modal/Modal";
import ProgressBar from "@/components/ProgressBar";
import { modalToggle } from "@/redux/features/cart/cartSlice";
import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import { useCheckCartMutation } from "@/redux/features/order/orderApiSlice";
import { useDeleteWholeProductFromCartMutation } from "@/redux/features/cart/cartApiSlice";

const Cart = () => {
  const token = useSelector(selectCurrentToken);
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalToContinue, setModalToContinue] = useState<boolean>(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const [
    deleteWholeProductFromCart,
    { isLoading: deleteWholeProductFromCartLoading },
  ] = useDeleteWholeProductFromCartMutation();

  const [
    checkCart,
    { isLoading: checkLoading, isError, isSuccess, data, error },
  ] = useCheckCartMutation();

  useEffect(() => {
    const requestData = {
      deliveryAddressId: 1,
    };
    checkCart(requestData);

    if (!token) {
      console.log("user not logged in");
      console.log(cart.products);
    }

    if (cart.products.length === 0 && !token) {
      dispatch(setCartFromLocalStorage());
    }
  }, [cart]);

  useEffect(() => {
    setTotalPrice(data?.totalPrice);
  }, [data]);

  let content;

  if (checkLoading) {
    return <Loading />;
  } else if (isError && (error as any).status === 401) {
    console.log(cart);
    content = (
      <div>
        {cart?.products.length > 0 ? (
          <>
            {cart.products.map((item: any) => (
              <CartProduct
                product={item}
                key={item.id}
                qty={item.quantityInProductUnit}
              />
            ))}
            <BottomNavBar />
          </>
        ) : (
          <>
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
            <BottomNavBar />
          </>
        )}
      </div>
    );
  } else if (isError && (error as any).status === 400) {
    content = <div> Something went wrong </div>;
  } else if (isSuccess) {
    content =
      data?.products.length > 0 ? (
        <>
          {data?.products.map((item: any) => (
            <CartProduct
              product={item.productItself}
              key={item.id}
              qty={item.quantityInProductUnit}
            />
          ))}
          <BottomNavBar />
        </>
      ) : (
        <>
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
          <BottomNavBar />
        </>
      );
  }

  return (
    <div>
      {content}
      <Modal
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          setIsModalOpen(false);
          // dispatch(clearCart());
          deleteWholeProductFromCart({});
        }}
        message={"Sepetinizdeki tüm ürünler silinecektir, emin misiniz?"}
      />
      <Modal
        show={modalToContinue}
        hasCancelButton={false}
        buttonText={"Tamam"}
        onClose={() => setModalToContinue(false)}
        onConfirm={() => {
          setModalToContinue(false);
        }}
        message={"Ödemeye devam etmek icin giris yapmalisin."}
      />

      {token && (
        <div className="flex fixed justify-center flex-row bottom-[70px] bg-white left-0 w-full">
          <div className="flex w-[87px] mx-[34px] items-center justify-center ">
            <span className="text-primary text-[21px] font-bold items-center">
              {totalPrice}
            </span>
            <span className="text-primary text-[21px] font-bold ml-1 items-center">
              €
            </span>
          </div>
          <div className="flex w-full">
            <a
              href="/checkout"
              className="flex justify-center items-center w-full h-[60px] mr-[15px] my-[6px] bg-primary rounded-lg text-white text-[18px] font-bold"
            >
              Devam
            </a>
          </div>
        </div>
      )}
      <ProgressBar
        current={data?.totalPrice}
        minimum={data?.shipmentFee}
        isFreeShipping={data?.canFreeShip}
      />
    </div>
  );
};

export default Cart;
