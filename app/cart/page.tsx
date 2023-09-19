"use client";

import {
  clearCart,
  selectCart,
  selectModal,
  setCartFromLocalStorage,
} from "@/redux/features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import BottomNavBar from "@/components/bottom-navbar/BottomNavBar";
import CartProduct from "@/components/product-cards/CartProduct";
import { IMAGES } from "@/constants/imageConstants";
import Image from "next/image";
import Link from "next/link";
import Loading from "../loading";
import Modal from "@/components/modal/Modal";
import ProgressBar from "@/components/ProgressBar";
import { modalToggle } from "@/redux/features/cart/cartSlice";
import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import { useAddToCartMutation } from "@/redux/features/cart/cartApiSlice";
import { useCheckCartMutation } from "@/redux/features/order/orderApiSlice";
import { useDeleteWholeProductFromCartMutation } from "@/redux/features/cart/cartApiSlice";
import { useGetCartQuery } from "@/redux/features/cart/cartApiSlice";

const Cart = () => {
  const token = useSelector(selectCurrentToken);
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();

  const [modalToContinue, setModalToContinue] = useState<boolean>(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const isModalOpen = useSelector(selectModal);

  const [
    deleteWholeProductFromCart,
    { isLoading: deleteWholeProductFromCartLoading },
  ] = useDeleteWholeProductFromCartMutation();

  const [
    addToCart,
    { isLoading: addToCartLoading, isSuccess: addToCartSuccess },
  ] = useAddToCartMutation();

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

    if (!token) {
      console.log("user not logged in");
      console.log(cart.products);
    }

    if (!token) {
      dispatch(setCartFromLocalStorage());
    }
  }, []);

  useEffect(() => {
    const localCart = JSON.parse(localStorage.getItem("cart") || "{}");
    if (token && localCart?.length > 0) {
      console.log("user logged in and cart is not empty");
      console.log(JSON.parse(localStorage.getItem("cart") || "{}"));

      localCart.map((item: any) => {
        const requestData = {
          productId: item.id,
          quantityInProductUnit: item.quantity,
          productUnitId: item.ProductUnits[0].id,
        };
        addToCart(requestData);
      });
    }
  }, [cart]);

  useEffect(() => {
    setTotalPrice(data?.totalPrice);
  }, [data]);

  let content;

  if (isLoading) {
    return <Loading />;
  } else if (isError && (error as any).status === 401) {
    content = (
      <div>
        {cart?.products?.length > 0 ? (
          <>
            {cart.products.map((item: any) => (
              <CartProduct product={item} key={item.id} qty={item.quantity} />
            ))}
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
        </>
      );
  }

  return (
    <div>
      {content}
      <Modal
        show={isModalOpen}
        onClose={() => dispatch(modalToggle())}
        onConfirm={() => {
          dispatch(modalToggle());
          deleteWholeProductFromCart({});
          dispatch(clearCart());
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

      {token && data?.products?.length > 0 && (
        <>
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
          <ProgressBar
            current={data?.totalPrice}
            minimum={dataCheck?.shipmentFee}
            isFreeShipping={dataCheck?.canFreeShip}
          />
        </>
      )}
      {!token && cart?.products?.length > 0 && (
        <>
          <div className="flex fixed justify-center flex-row bottom-[70px] bg-white left-0 w-full">
            <div className="flex w-[87px] mx-[34px] items-center justify-center ">
              <span className="text-primary text-[21px] font-bold items-center">
                {totalPrice}
              </span>
              <span className="text-primary text-[21px] font-bold ml-1 items-center">
                €{cart.totalPrice}
              </span>
            </div>
            <div
              onClick={() => {
                setModalToContinue(true);
              }}
              className="flex justify-center items-center w-full h-[60px] mr-[15px] my-[6px] bg-primary rounded-lg text-white text-[18px] font-bold"
            >
              <div className="flex  justify-center w-full">Devam</div>
            </div>
          </div>
          <ProgressBar
            current={cart.totalPrice}
            minimum={cart.shipmentFee}
            isFreeShipping={cart.canFreeShip}
          />
        </>
      )}

      <BottomNavBar />
    </div>
  );
};

export default Cart;
