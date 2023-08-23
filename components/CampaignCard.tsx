import { FC, useState } from "react";
import { ICONS } from "@/constants/iconConstants";
import Image from "next/image";

interface Campaign {
    id: number;
    name: string;
    description: string;
    isActive: boolean;
}

interface CampaignCardProps {
    campaign: Campaign;
}

const CampaignCard: FC<CampaignCardProps> = ({ campaign }) => {
    const [isUsing, setIsUsing] = useState(false);
    const { id, name, description, isActive } = campaign;

    return (
        <div className="flex flex-row bg-white px-[10px] py-[25px] justify-between h-[116px] items-center rounded-md">
            <div className="flex h-[65px] w-[65px] bg-[#B9B9B9] flex-shrink-0"></div>
            <div className="flex flex-col pl-1 flex-grow"> {/* Allow the text to take up remaining space */}
                <span className="font-bold text-[13px] mb-2 max-w-[164px]">
                    {name}
                </span>
                <div className="flex flex-row">
                    {isActive && (
                        <>
                            <Image src={ICONS.done} alt={'done'} width={14} height={14} />
                            <span className="mx-1 text-[12px] text-primary">Uygulandi</span>
                        </>
                    )}
                </div>
            </div>
            <div className="flex items-center"> {/* Adjust alignment */}
                <div
                    className={`flex h-[34px] min-w-[77px] border rounded-md items-center justify-center text-${
                        isActive ? 'primary' : 'white'
                    } text-[13px] ${isActive ? 'border-primary' : 'border-white'}`}
                    onClick={() => setIsUsing(!isUsing)}
                >
                    {isUsing ? "Kaldır" : "Uygula"}
                </div>
                <Image
                    src={ICONS.rightArrow}
                    alt={'rightArrow'}
                    width={10}
                    height={5}
                    className="ml-2" // Add margin to separate the arrow
                />
            </div>
        </div>
    );
};

export default CampaignCard;
