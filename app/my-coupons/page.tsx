'use client'

import {useGetCouponsQuery} from "@/redux/features/couponApiSlice";
import Coupon from "@/components/Coupon";

const MyCoupons = () => {
    const {data, error, isLoading} = useGetCouponsQuery();

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>{error}</div>

    return (
            <div>

                {data?.map((coupon, index) => (
                    <Coupon key={index} coupon={coupon}/>
                ))}
            </div>
    );
};

export default MyCoupons;
