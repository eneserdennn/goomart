"use client";

import React, { useState } from "react";

import { Disclosure } from "@headlessui/react";
import { ICONS } from "@/constants/iconConstants";
import Image from "next/image";
import Loading from "@/app/loading";
import ProductCardPlusButton from "@/components/product-cards/ProductCardPlusButton";
import { useGetCampaignQuery } from "@/redux/features/campaigns/campaignApiSlice";
import { useGetProductsListWithCampaignQuery } from "@/redux/features/products/productApiSlice";
import { BiChevronRight } from "react-icons/bi";

interface CampaignParams {
  id: string;
}

const CampaignDetail = ({ params }: { params: CampaignParams }) => {
  const {
    data: campaign,
    isLoading: campaignLoading,
    error: campaignError,
  } = useGetCampaignQuery(Number(params.id));
  const {
    data: products,
    isLoading: productsLoading,
    error: productsError,
  } = useGetProductsListWithCampaignQuery(campaign?.resourceId);

  let content;

  if (campaignLoading) {
    content = <Loading />;
  } else if (campaignError) {
    content = <div>Something went wrong</div>;
  } else
    content = (
      <div className="lg:block flex flex-col w-full">
        <div className="hidden lg:grid grid-cols-12   w-[calc(100%-210px)] mx-auto mt-[50px] mb-10">
          <div className="col-span-12 bg-white shadow-md w-full h-[55px] rounded-md flex items-center px-5 ">
            Ana Sayfa <BiChevronRight size={28} />{" "}
            <p className="font-semibold">Arama</p>
          </div>
        </div>
        <div className="lg:block lg:w-[calc(100%-210px)] lg:mx-auto flex flex-col w-full mb-2 p-[15px] bg-white h-[245px] shadow justify-between">
          <div className="flex h-[183px] bg-red-400 rounded-xl w-full lg:mt-10 lg:ml-[114px] lg:w-[558px] lg:h-[228px] "></div>
          <div className="flex text-[14px] font-bold text-[#333333]">
            {campaign?.name}
          </div>
        </div>
        <div className="lg:hidden flex flex-col pt-[10px] justify-center items-center">
          <div className="w-[360px] ">
            <div className=" w-full rounded border bg-white">
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full h-[51px] pl-[20px] border-b pr-[15px] items-center justify-between rounded py-2 text-left text-[13px] ">
                      <span className="text-[#555555]">Kampanya Detayı</span>
                      <Image
                        src={open ? ICONS.upArrowThin : ICONS.downArrowThin}
                        alt={"image"}
                        width={12}
                        height={7}
                      />
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
        <span className="lg:hidden text-[14px] text-[#6D6D6D] m-[15px]">
          Gecerli Urunler
        </span>
        <div
          className={`flex flex-row justify-between mb-10 shadow w-full bg-white p-1 ${
            window.innerWidth > 360 ? "p-4" : ""
          } flex-wrap`}
        >
          {/*    THIS PART WILL BE DELETED AFTER API INTEGRATION*/}
        </div>
      </div>
    );

  return content;
};

export default CampaignDetail;
