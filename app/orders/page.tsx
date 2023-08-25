'use client'
import {useGetOrdersQuery} from "@/redux/features/order/orderApiSlice";
import SortByDate from "@/components/SortByDate";
import Image from "next/image";
import {IMAGES} from "@/constants/imageConstants";
import BottomNavBar from "@/components/bottom-navbar/BottomNavBar";
import Loading from "@/app/loading";
import OrderCard from "@/components/OrderCard";

export default function OrdersPage() {
    const {data, isLoading, error} = useGetOrdersQuery();
    const test = 1


    let content;

    if (isLoading) {
        content = <Loading/>;
    } else if (error) {
        content = <div>Something went wrong</div>;
    } else content =(
        <div className="flex py-[20px] mb-12 flex-col items-center justify-center">
            <SortByDate/>
            {test?.length === 0 ? (
                    <div className="flex flex-col mx-[54px] items-center justify-between">
                        <Image src={IMAGES.notFoundOrder} alt={"not-found-order"} width={230} height={210}/>
                        <span className="my-[50px] text-center text-[16px] font-semibold">Son 1 Ay icerisinde vermis oldugunuz siparis bulunmuyor</span>
                    </div>
                ) : (
                    <div className="flex flex-col px-[15px] w-full">
                        <OrderCard orderStatus={"Teslim Edildi"}/>
                        <OrderCard orderStatus={"Kargoya Verildi"}/>
                        <OrderCard orderStatus={"Siparis Hazirlaniyor"}/>
                        <OrderCard orderStatus={"Siparis Alindi"}/>
                        <OrderCard orderStatus={"Iptal Edildi"}/>
                    </div>
                )
            }
            <BottomNavBar/>
        </div>
    )

    return content;
}

