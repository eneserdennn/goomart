'use client'

import {useGetCouponsQuery} from "@/redux/features/couponApiSlice";
import Coupon from "@/components/Coupon";
import Image from "next/image";
import {IMAGES} from "@/constants/imageConstants";
import Loading from "@/app/loading";
import {selectCurrentToken} from "@/redux/features/auth/authSlice";
import {useSelector} from "react-redux";
import {useRouter} from "next/navigation";


const MyCoupons = () => {
    const {data, error, isLoading} = useGetCouponsQuery();
    const token = useSelector(selectCurrentToken);
    const router = useRouter();

    if (!token) {
        router.push('/login')
    }

    if (isLoading) return <Loading/>
    if (error) return <div>
        <span className="text-red-500 flex p-8 text-center justify-center">Something went wrong, please make sure you are connected to the internet.</span>
    </div>

    return (
        <div>
            {data.length === 0 &&
                <div className="flex flex-col items-center pt-28">
                    <Image src={IMAGES.couponEmpty} alt="empty" width={200} height={200}/>
                    <span className="font-bold text-[16px] mt-4 text-primary">Aktif kupon bulunamadi.</span>
                    <span className="text-[15px] mt-4 text-[#444444]">Takipte kalin ve firsatlari kacirmayin. 🤗 </span>
                </div>}
            {data?.map((coupon, index) => (
                <Coupon key={index} coupon={coupon}/>
            ))}
        </div>
    );
};

export default MyCoupons;
