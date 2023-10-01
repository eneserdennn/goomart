"use client";

import {
  selectFrom,
  selectOrders,
  selectTo,
  setOrders,
} from "@/redux/features/order/orderSlice";
import { useDispatch, useSelector } from "react-redux";

import BottomNavBar from "@/components/bottom-navbar/BottomNavBar";
import { IMAGES } from "@/constants/imageConstants";
import Image from "next/image";
import Loading from "@/app/loading";
import OrderCard from "@/components/OrderCard";
import SortByDate from "@/components/SortByDate";
import { useEffect } from "react";
import { useGetOrdersQuery } from "@/redux/features/order/orderApiSlice";

export default function OrdersPage() {
  const dispatch = useDispatch();
  const from = useSelector(selectFrom);
  const to = useSelector(selectTo);
  const orders = useSelector(selectOrders);

  const { data, error, isLoading } = useGetOrdersQuery({
    pageNo: 0,
    pageSize: 10,
    from: from,
    to: to,
  });

  useEffect(() => {
    if (data) {
      dispatch(setOrders(data.orders));
    }
  }, [data]);

  let content;

  if (isLoading) {
    content = <Loading />;
  } else if (error) {
    content = <div>Something went wrong</div>;
  } else
    content = (
      <div className="flex py-[20px] mb-12 flex-col items-center justify-center">
        <SortByDate />
        {
          // @ts-ignore
          orders?.length === 0 ? (
            <div className="flex flex-col mx-[54px] items-center justify-between">
              <Image
                src={IMAGES.notFoundOrder}
                alt={"not-found-order"}
                width={230}
                height={210}
              />
              <span className="my-[50px] text-center text-[16px] font-semibold">
                Son 1 Ay icerisinde vermis oldugunuz siparis bulunmuyor
              </span>
            </div>
          ) : (
            <div className="flex flex-col px-[15px] w-full">
              {orders.map((order) => (
                <OrderCard orderStatus={"Teslim Edildi"} order={order} />
              ))}

              {/* <OrderCard orderStatus={"Kargoya Verildi"} />
              <OrderCard orderStatus={"Siparis Hazirlaniyor"} />
              <OrderCard orderStatus={"Siparis Alindi"} />
              <OrderCard orderStatus={"Iptal Edildi"} /> */}
            </div>
          )
        }
        <BottomNavBar />
      </div>
    );

  return content;
}
