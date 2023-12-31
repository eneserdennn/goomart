"use client";

import BottomNavBar from "@/components/bottom-navbar/BottomNavBar";
import { ICONS } from "@/constants/iconConstants";
import Image from "next/image";
import Link from "next/link";
import MyCoupons from "@/app/my-coupons/page";
import { Tab } from "@headlessui/react";
import { useGetAllCampaignsQuery } from "@/redux/features/campaigns/campaignApiSlice";
import { useState } from "react";
import { BiChevronRight } from "react-icons/bi";

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const {
    data: allCampaigns,
    isLoading: allCampaignsLoading,
    error: allCampaignsError,
  } = useGetAllCampaignsQuery();
  let [categories] = useState({
    Kampanyalar: [],
    "Hediye Kuponları": [],
  });

  return (
    <div className="w-full mb-20">
      <Tab.Group>
        <Tab.List className="lg:hidden flex space-x-1 h-[58px] px-[15px] py-[9px] bg-white shadow">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 font-bold text-[14px] leading-5 text-[#6D6D6D]",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-white focus:outline-none focus:ring-2",
                  selected ? "bg-primary shadow text-primary bg-opacity-20" : ""
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="px-[18px] pt-[18px] lg:px-0 lg:pt-0">
          {Object.keys(categories).map((category) => (
            <Tab.Panel key={category} className="flex flex-col justify-start">
              <div className="hidden lg:grid grid-cols-12   w-[calc(100%-210px)] mx-auto mt-[50px] mb-10">
                <div className="col-span-12 bg-white shadow-md w-full h-[55px] rounded-md flex items-center px-5 ">
                  Ana Sayfa <BiChevronRight size={28} />{" "}
                  <p className="font-semibold">Arama</p>
                </div>
              </div>

              {category === "Kampanyalar" ? (
                allCampaigns?.map((campaign: any) => (
                  <div
                    className="grid 2xl:grid-cols-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-5 2xl:gap-y-10 2xl:gap-x-20 lg:w-[calc(100%-210px)] w-full mx-auto"
                    key={campaign.id}
                  >
                    <Link href={`/campaigns/campaign-detail/${campaign.id}`}>
                      <div
                        key={campaign.id}
                        className="mb-2 bg-white h-[228px] col-span-1  shadow rounded-xl"
                      >
                        <div className="flex flex-shrink-0 h-[183px] items-center justify-center bg-[#C6C6C6] rounded-xl"></div>
                        <div className="flex flex-row items-center text-[13px] font-bold px-[15px] py-[8px] justify-between">
                          <div className="flex">{campaign.name}</div>
                          <Image
                            src={ICONS.rightArrowLong}
                            alt="rightArrow"
                            width={20}
                            height={20}
                            className="h-[30px] w-[30px] p-1"
                          />
                        </div>
                      </div>
                    </Link>
                  </div>
                ))
              ) : category === "Hediye Kuponları" ? (
                <MyCoupons />
              ) : null}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
      <BottomNavBar />
    </div>
  );
}
