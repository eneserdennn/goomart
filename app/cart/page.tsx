"use client";

import { clearCart, closeModal } from "@/redux/features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import BottomNavBar from "@/components/bottom-navbar/BottomNavBar";
import Button from "@/components/button";
import CartProduct from "@/components/product-cards/CartProduct";
import Cookies from "js-cookie";
import { IMAGES } from "@/constants/imageConstants";
import Image from "next/image";
import Link from "next/link";
import Loading from "@/app/loading";
import Modal from "@/components/modal/Modal";
import ProgressBar from "@/components/ProgressBar";
import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import { useCheckCartMutation } from "@/redux/features/order/orderApiSlice";
import { useDeleteWholeProductFromCartMutation } from "@/redux/features/cart/cartApiSlice";

interface ProductUnit {
  id: number;
  name: string;
  convertionToMainUnit: number;
}

interface Product {
  id: number;
  brand: string;
  name: string;
  description: string;
  image: string;
  mainProductUnitName: string;
  mainProductUnitPrice: number;
  mainProductUnitStock: number;
  ProductUnits: ProductUnit[];
}

interface CartItem {
  productId: number;
  unitId: number;
  quantityInProductUnit: number;
  mainProductUnitDiscountAmount: number;
  productItself: Product;
  productUnitItself: ProductUnit;
  calculatedPrice: number;
}

const Cart: React.FC = () => {
  const token = useSelector(selectCurrentToken);
  const [
    checkCart,
    { isLoading: checkLoading, isError, isSuccess, data, error },
  ] = useCheckCartMutation();
  const cartItems = useSelector((state) => state.cart.cartItems) as CartItem[];
  const isModalOpen = useSelector((state) => state.cart.isModalOpen) as boolean;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [modalToContinue, setModalToContinue] = useState<boolean>(false);
  const [notAuthorized, setNotAuthorized] = useState<boolean>(false);

  const [
    deleteWholeProductFromCart,
    { isLoading: deleteWholeProductFromCartLoading },
  ] = useDeleteWholeProductFromCartMutation();

  useEffect(() => {
    const requestData = {
      deliveryAddressId: 1,
    };
    if (data?.canOrder === false) {
      setModalToContinue(true);
    }
    checkCart(requestData);
  }, []);

  useEffect(() => {
    const cartFromCookie = Cookies.get("cart");
    if (cartFromCookie) {
      const cartItemsFromCookie = JSON.parse(cartFromCookie) as CartItem[];
      // Burada yapılacak işlemleri ekleyin
    }

    // Her cartItems değiştiğinde checkCart'ı tekrar çağır
    const requestData = {
      deliveryAddressId: 1,
    };
    checkCart(requestData);

    setIsLoading(false);
  }, [cartItems]);

  if (checkLoading || deleteWholeProductFromCartLoading) {
    return <Loading />;
  }

  if (isError) {
    setNotAuthorized(true);
    return <div>Something went wrong</div>;
  }

  return (
    <div>
      {data?.products.map((item: Product) => (
        <CartProduct product={item} key={item.id} />
      ))}
      {isLoading ? (
        <Loading />
      ) : (
        data?.products === 0 && (
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
        )
      )}
      {!isLoading && (
        <>
          <div className="flex fixed justify-center flex-row bottom-[70px] bg-white left-0 w-full">
            <div className="flex w-[87px] mx-[34px] items-center justify-center ">
              <span className="text-primary text-[21px] font-bold items-center">
                {data?.totalPrice}
              </span>
              <span className="text-primary text-[21px] font-bold ml-1 items-center">
                €
              </span>
            </div>
            {!token && (
              <div className="flex w-full">
                <Button
                  className="flex justify-center items-center w-full h-[60px] mr-[15px] my-[6px] bg-primary rounded-lg text-white text-[18px] font-bold"
                  onClick={() => setModalToContinue(true)}
                >
                  Devam
                </Button>
              </div>
            )}
            {token && (
              <div className="flex w-full">
                <Link
                  href="/checkout"
                  className="flex justify-center items-center w-full h-[60px] mr-[15px] my-[6px] bg-primary rounded-lg text-white text-[18px] font-bold"
                >
                  Devam
                </Link>
              </div>
            )}
          </div>
          <ProgressBar
            current={data?.totalPrice}
            minimum={data?.shipmentFee}
            isFreeShipping={data?.canFreeShip}
          />
        </>
      )}
      <Modal
        show={isModalOpen}
        onClose={() => dispatch(closeModal())}
        onConfirm={() => {
          dispatch(closeModal());
          dispatch(clearCart());
          deleteWholeProductFromCart();
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
      <BottomNavBar />
    </div>
  );
};

export default Cart;
