'use client'

import { BiUpArrow } from 'react-icons/bi';
import { Disclosure } from '@headlessui/react'
import Image from "next/image";
import Loading from "@/app/loading";
import { useEffect } from "react";
import { useGetProductsByProductIdQuery } from "@/redux/features/products/productApiSlice";

const ProductDetail = ({params}) => {
    const productId = params.products[0]
    console.log(productId)


    const { data, isLoading, isSuccess, isError } = useGetProductsByProductIdQuery(productId)

   let content;

   if (isLoading) {
    content = <Loading />
   } else if (isError) {
    content = <div>Something went wrong!</div>
   } else if (isSuccess ) {
    console.log(data)


    content = (
        <div className="flex flex-col">
            <div className="flex flex-col justify-center items-center p-[15px]">
            <Image src={data.image ? data.image : "/placeholder.png"} alt={'image'} width={250} height={230}/>
            <span className="text-[16px] font-bold pt-[15px] pb-[15px]">
                {data.name}
            </span>
            </div>
            <div className="flex flex-col justify-center items-center p-[10px]">
            <div className="w-full px-4 pt-16">
            <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-2">
                <Disclosure>
                {({ open }) => (
                    <>
                    <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                        <span>What is your refund policy?</span>
                        <BiUpArrow
                        className={`${
                            open ? 'rotate-180 transform' : ''
                        } h-5 w-5 text-purple-500`}
                        />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                        If you're unhappy with your purchase for any reason, email us
                        within 90 days and we'll refund you in full, no questions asked.
                    </Disclosure.Panel>
                    </>
                )}
                </Disclosure>
                <Disclosure as="div" className="mt-2">
                {({ open }) => (
                    <>
                    <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                        <span>Do you offer technical support?</span>
                        <BiUpArrow
                        className={`${
                            open ? 'rotate-180 transform' : ''
                        } h-5 w-5 text-purple-500`}
                        />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                        No.
                    </Disclosure.Panel>
                    </>
                )}
                </Disclosure>
            </div>
            </div>
            </div>
        </div>
    );
   }

   return content;
};

export default ProductDetail;