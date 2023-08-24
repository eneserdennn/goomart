'use client'

import { FC } from "react";
import { ICONS } from "@/constants/iconConstants";
import Image from "next/image";
import BottomNavBar from "@/components/bottom-navbar/BottomNavBar";
import CampaignCard from "@/components/CampaignCard";
import { useGetCampaignsUsableQuery, useGetAllCampaignsQuery } from "@/redux/features/campaignApiSlice";
import Loading from "@/app/loading";

const Campaigns: FC = () => {
    // @ts-ignore
    const { data: usableCampaigns, isLoading: usableCampaignsLoading, error: usableCampaignsError } = useGetCampaignsUsableQuery();
    const { data: allCampaigns, isLoading: allCampaignsLoading, error: allCampaignsError } = useGetAllCampaignsQuery();


    if (usableCampaignsLoading || allCampaignsLoading) return <Loading />;
    if (usableCampaignsError || allCampaignsError) return <div>Something went wrong</div>;

    const content = (
        <>
            <div className="flex flex-col p-[20px] mb-14">
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
                {usableCampaigns?.map((campaign: any) => (
                    <div key={campaign.id} className="my-1">
                        <CampaignCard campaign={campaign} />
                    </div>
                ))}
                <span className="font-bold text-[13px] py-[10px] text-deepgray">
                    Kampanyalar
                </span>
                {allCampaigns?.map((campaign: any) => (
                    <div key={campaign.id} className="my-1">
                        <CampaignCard campaign={campaign} isSelectable={false} />
                    </div>
                ))}
            </div>
            <BottomNavBar />
        </>
    );
    if (usableCampaigns) {
        console.log(usableCampaigns);
        return content;
    }
    return null;
};

export default Campaigns;
