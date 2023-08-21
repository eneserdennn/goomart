import React from 'react';
import Image from "next/image";
import {ICONS} from "@/constants/iconConstants";

interface ProgressBarProps {
    current: number;
    minimum: number;
    isFreeShipping?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, minimum, isFreeShipping }) => {
    const percentage = (current / minimum) * 100;
    const rest = minimum - current;

    return (
        <>
        { current >= minimum ? <div className="flex fixed px-[15px] py-[10px] items-center bottom-[136px] h-[51px] bg-primary justify-center text-white w-full">
                Minimum sepet tutarina ulastin. <Image src={ICONS.confetti} alt={'confetti'} width={18} height={18} className="ml-2"/>
            </div> :
        <div className={`flex fixed px-[15px] py-[10px] items-center bottom-[136px] h-[51px] border border-opacity-30 bg-white w-full ${isFreeShipping && 'h-[75px]'}`}>
        <div className="flex flex-col w-full">
            {isFreeShipping && <>
                <div className="flex items-start flex-col mb-1 text-[13px] font-bold">
                    <div className="flex mb-2">
                        <div>
                        <Image src={ICONS.done} alt={'done-icon'} width={18} height={18}/>
                        </div>
                        <span className="text-[13px] text-primary font-bold ml-2">
                        Minimum sepet tutarina ulastin.
                    </span>
                    </div>
                    <div className="flex">
                        <div>
                    <Image src={ICONS.shippingTruck} alt={'euro-circle'} width={18} height={18}/>
                        </div>
                        <span className="ml-2">Ücretsiz teslimat icin sepetine <span className="text-primary">{rest} €</span> daha ekle.</span>
                    </div>
                </div>
                <div className="">
                    <div className="w-full h-1 bg-gray-300 rounded">
                        <div
                            className="h-full bg-[#189C03] rounded transition-all"
                            style={{ width: `${Math.min(percentage, 100)}%` }}
                        ></div>
                    </div>
                </div>
            </>}
            {!isFreeShipping && <>
                <div className="flex mb-1 text-[13px]  font-bold">
                    <Image src={ICONS.euroCircle} alt={'euro-circle'} width={18} height={18}/>
                    <span className="ml-2">{minimum} €´luk minimum sepet tutarina <span className="text-primary">{rest} €</span> kaldi.</span>
                </div>
                <div className="">
                    <div className="w-full h-1 bg-gray-300 rounded">
                        <div
                            className="h-full bg-[#189C03] rounded transition-all"
                            style={{ width: `${Math.min(percentage, 100)}%` }}
                        ></div>
                    </div>
                </div>
            </>}
        </div>
        </div>}
    </>
    );
};

export default ProgressBar;
