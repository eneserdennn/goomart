'use client'

import {useGetCampaignQuery} from "@/redux/features/campaigns/campaignApiSlice";
import {useGetProductsListWithCampaignQuery} from "@/redux/features/products/productApiSlice";

import Image from "next/image";
import {ICONS} from "@/constants/iconConstants";
import Loading from "@/app/loading";
import {Disclosure} from "@headlessui/react";

const CampaignDetail = ({params}) => {
    const {data: campaign, isLoading: campaignLoading, error: campaignError} = useGetCampaignQuery(params.id);
    const {data: products, isLoading: productsLoading, error: productsError} = useGetProductsListWithCampaignQuery(params.id);
    let content;
    console.log(products)

    if (campaignLoading) {
        content = <Loading/>;
    } else if (campaignError) {
        content = <div>Something went wrong</div>;
    } else

        content = (
            <div className="flex flex-col w-full">
                <div className="flex flex-col w-full mb-2 p-[15px] bg-white h-[245px] shadow justify-between">
                    <div className="flex h-[183px] bg-red-400  rounded-xl w-full ">
                    </div>
                    <div className="flex text-[14px] font-bold text-[#333333]">
                        {campaign?.name}
                    </div>
                </div>
                <div className="flex flex-col pt-[10px] justify-center items-center">
                    <div className="w-[360px] ">
                        <div className=" w-full rounded border bg-white">
                            <Disclosure>
                                {({open}) => (
                                    <>
                                        <Disclosure.Button
                                            className="flex w-full h-[51px] pl-[20px] border-b pr-[15px] items-center justify-between rounded py-2 text-left text-[13px] ">
                                            <span className="text-[#555555]">
                                                Kampanya Detayı
                                            </span>
                                            <Image src={open ? ICONS.upArrowThin : ICONS.downArrowThin} alt={'image'}
                                                   width={12} height={7}/>
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="px-4 pt-4 pb-2 text-[13px] text-[#333333] font-semibold">
                                            {campaign?.description}
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        </div>
                    </div>

                </div>
                {/*    CUSTOM PRODUCT LIST*/}
            </div>
        );

    return content;
};

export default CampaignDetail;
