'use client'

import { BiUpArrow } from 'react-icons/bi';
import { Disclosure } from '@headlessui/react'
import { ICONS } from '@/constants/iconConstants';
import Image from "next/image";
import Loading from "@/app/loading";
import { useEffect } from "react";
import { useGetProductsByProductIdQuery } from "@/redux/features/products/productApiSlice";

const ProductDetail = ({params}) => {
    const productId = params.products[0]
    const { data, isLoading, isSuccess, isError } = useGetProductsByProductIdQuery(productId)
    

   let content;

   if (isLoading) {
    content = <Loading />
   } else if (isError) {
    content = <div>Something went wrong!</div>
   } else if (isSuccess ) {
    console.log(data)
    content = (
        <div className="flex flex-col ">
            <div className="flex flex-col relative justify-center items-center pt-[15px] pb-[41px] bg-white">
            <div className='flex absolute top-[15px] left-0 w-full justify-start items-center'>
    <Image src={ICONS.tags} alt={'image'} width={136} height={42}/>
</div>

            <Image src={data.image ? data.image : "/placeholder.png"} alt={'image'} width={250} height={230}/>
            <span className="text-[16px] font-bold pt-[15px]">
                {data.name}
            </span>
            <span className="text-[16px] font-bold text-primary">
                €{data.mainProductUnitPrice}
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
                        <Image src={open ? ICONS.upArrowThin : ICONS.downArrowThin} alt={'image'} width={12} height={7}/>
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
                    <div className="flex justify-center py-2">
                        <button
                            className="h-12 m-2 w-full bg-primary hover:bg-green-800 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-300"
                            type="submit"
                        >
                           Sepete Ekle
                        </button>
                    </div>
                </div>
        </div>
    );
   }

   return content;
};

export default ProductDetail;