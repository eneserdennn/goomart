// Teslim Edildi : text-primary
// Kargoya Verildi : text-[#0085FF]
// Siparis Hazirlaniyor : text-[#FF891C]
// Siparis Alindi: text-[#65A100]
// Iptal Edildi : text-[#FF2121]

import {useState} from "react";
import Image from "next/image";
import {ICONS} from "@/constants/iconConstants";
import Link from "next/link";

const OrderCard = ({orderStatus}) => {
    // const [orderStatus, setOrderStatus] = useState<string>("Teslim Edildi")
    const [orderId, setOrderId] = useState<string>("1234")
    const [orderDate, setOrderDate] = useState<string>("10 Ekim 2023")
    const [orderPrice, setOrderPrice] = useState<string>("145,67")
    const [orderProductCount, setOrderProductCount] = useState<string>("255")

    return (
        <div
            className={`flex bg-white mb-[10px] p-[20px] h-[150px] justify-between border-l-[11px] rounded-md ${orderStatus === "Teslim Edildi" ? "border-primary" : orderStatus === "Kargoya Verildi" ? "border-[#0085FF]" : orderStatus === "Siparis Hazirlaniyor" ? "border-[#FF891C]" : orderStatus === "Siparis Alindi" ? "border-[#65A100]" : "border-[#FF2121]"}`}>
            <div className="flex flex-row">
                <div className="flex flex-col justify-between">
                    <div className="flex flex-col text-[14px] space-y-[5px]">
                <span>
                    #{orderId}
                </span>
                <span>
                    {orderDate}
                </span>
                <span className="text-[#6D6D6D]">
                    {orderProductCount} ürün - {orderPrice} €
                </span>
                </div>
                    <div className="flex flex-row items-center" onClick={() => alert("Siparisi Tekrarla: " + orderId)}>
                    <Image src={ICONS.reorder} alt={"plus-icon"} width={17} height={17}/>
                    <span className="text-[#363636] text-[14px] mx-[10px]">Siparisi Tekrarla</span>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-between">
                    <span className={`text-[12px] font-semibold ${orderStatus === "Teslim Edildi" ? "text-primary" : orderStatus === "Kargoya Verildi" ? "text-[#0085FF]" : orderStatus === "Siparis Hazirlaniyor" ? "text-[#FF891C]" : orderStatus === "Siparis Alindi" ? "text-[#65A100]" : "text-[#FF2121]"}`}>
                        {orderStatus}
                    </span>
                <div className="flex justify-end cursor-pointer">
                    <Link href={`/orders/order-detail/${orderId}`}>
                    <Image src={ICONS.rightArrowLongDark} alt={"right-arrow"} width={20} height={20}/>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderCard;
