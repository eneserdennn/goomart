'use client'

import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";

import BottomNavBar from "@/components/bottom-navbar/BottomNavBar";
import Button from "@/components/button";
import CartProduct from "@/components/product-cards/CartProduct";
import Cookies from "js-cookie";
import {IMAGES} from '@/constants/imageConstants';
import Image from 'next/image';
import Loading from '@/app/loading';
import Modal from "@/components/modal/Modal";
import {clearCart, closeModal} from "@/redux/features/cart/cartSlice";
import ProgressBar from "@/components/ProgressBar";

type Props = {}

const Cart = (props: Props) => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const isModalOpen = useSelector(state => state.cart.isModalOpen);
    const dispatch = useDispatch();

    const [cart, setCart] = useState(cartItems);
    const [isLoading, setIsLoading] = useState(true); // Yeni state
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [isFreeShipping, setIsFreeShipping] = useState<boolean>(true);

    const cartFromCookie = Cookies.get('cart');

    useEffect(() => {
        if (cartFromCookie) {
            const cartItemsFromCookie = JSON.parse(cartFromCookie);
            // dispatch(addToCart(cartItemsFromCookie.cartItems));
            setCart(cartItemsFromCookie.cartItems);
        }
        setIsLoading(false);
    }, [cartItems])

    useEffect(() => {
        // calculate total price
        let total = 0;
        cart.forEach((item) => {
            total += item.mainProductUnitPrice * item.qty;
        });
        setTotalPrice(total);

    }, [cart])

    const currentAmount = 19.11;
    const minimumAmount = 18;

    return (
        <div>
            {cartFromCookie && cart.map((item) => (
                <CartProduct product={item} key={item.id}/>
            ))}
            {isLoading ? <Loading/> : (cart.length === 0 &&
                <div className='flex justify-center pt-20'>
                    <div className='flex flex-col items-center'>
                        <Image src={IMAGES.emptyCart} alt={'empty-cart'} width={250} height={215}/>
                        <span className='text-primary font-bold text-[16px] pt-12'>
                Sepetinizde Ürün Bulunmamaktadır.
            </span>
                        <span className='text-[15px] pt-2'>
                Ana sayfadan sepetinize ürün ekleyebilirsiniz.
            </span>
                    </div>
                </div>)}
            <div className="flex fixed justify-center flex-row bottom-16 bg-white left-0 w-full">
                <div className="flex w-[87px] mx-[34px] items-center justify-center ">
                    <span className="text-primary text-[21px] font-bold items-center">{totalPrice}</span>
                    <span className="text-primary text-[21px] font-bold ml-1 items-center">€</span>
                </div>
                <div className="flex w-full">
                    <button
                        className="flex justify-center items-center w-full h-[60px] mr-[15px] my-[6px] bg-primary rounded-lg text-white text-[18px] font-bold"
                    >
                        Devam
                    </button>
                </div>
            </div>
            <Modal show={
                isModalOpen
            } onClose={
                () => dispatch(closeModal())
            } onConfirm={
                () => {
                    dispatch(clearCart());
                    dispatch(closeModal());
                }
            } message={'Sepetinizdeki tüm ürünler silinecektir, emin misiniz?'}/>

            <ProgressBar current={currentAmount} minimum={minimumAmount} isFreeShipping={isFreeShipping}/>

            <BottomNavBar/>
        </div>
    )
}

export default Cart
