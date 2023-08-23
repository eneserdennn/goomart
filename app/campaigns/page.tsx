'use client'

import { FC } from "react";
import { ICONS } from "@/constants/iconConstants";
import Image from "next/image";
import BottomNavBar from "@/components/bottom-navbar/BottomNavBar";
import CampaignCard from "@/components/CampaignCard";
import { useGetCampaignsQuery } from "@/redux/features/campaignApiSlice";
import Loading from "@/app/loading";

const Campaigns: FC = () => {
    // @ts-ignore
    const { data, error, isLoading } = useGetCampaignsQuery();

    if (isLoading) return <Loading />;
    if (error) return <div>Something went wrong</div>;

    const content = (
        <>
            <div className="flex flex-col p-[20px]">
                <div className="flex w-full">
                    <div
                        className="flex bg-white items-center h-[50px] w-full rounded-lg shadow cursor-pointer hover:shadow-xl"
                        onClick={() => console.log('clicked')}
                    >
                        <div className="flex flex-row px-[15px] items-center">
                            <Image src={ICONS.plus} alt="plus" width={20} height={20}
                                   className="border rounded-lg shadow h-[30px] w-[30px] p-1" />
                            <span className="font-bold text-primary px-[15px] text-[14px] text-start">
                                Kupon Kodu Ekle
                            </span>
                        </div>
                    </div>
                </div>
                <span className="font-bold text-[13px] py-[10px] text-deepgray">
                    Kullanıma Hazır Kampanyalar
                </span>
                {data.map((campaign: any) => (
                    <div key={campaign.id} className="my-1">
                        <CampaignCard campaign={campaign} />
                    </div>
                ))}
            </div>
            <BottomNavBar />
        </>
    );
    if (data) {
        console.log(data);
        return content;
    }
    return null;
};

export default Campaigns;
