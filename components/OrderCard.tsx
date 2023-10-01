// Teslim Edildi : text-primary
// Kargoya Verildi : text-[#0085FF]
// Siparis Hazirlaniyor : text-[#FF891C]
// Siparis Alindi: text-[#65A100]
// Iptal Edildi : text-[#FF2121]

import { ICONS } from "@/constants/iconConstants";
import Image from "next/image";
import Link from "next/link";
import { setOrder } from "@/redux/features/order/orderSlice";
import { useDispatch } from "react-redux";

// @ts-ignore
const OrderCard = ({ orderStatus, order }) => {
  const dispatch = useDispatch();
  let dateFromApi = new Date(order.createdAt);
  let date = dateFromApi.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div
      className={`flex bg-white mb-[10px] p-[20px] h-[150px] justify-between border-l-[11px] rounded-md ${
        orderStatus === "Teslim Edildi"
          ? "border-primary"
          : orderStatus === "Kargoya Verildi"
          ? "border-[#0085FF]"
          : orderStatus === "Siparis Hazirlaniyor"
          ? "border-[#FF891C]"
          : orderStatus === "Siparis Alindi"
          ? "border-[#65A100]"
          : "border-[#FF2121]"
      }`}
    >
      <div className="flex flex-row">
        <div className="flex flex-col justify-between">
          <div className="flex flex-col text-[14px] space-y-[5px]">
            <span>#{order.id}</span>
            <span>{date}</span>
            <span className="text-[#6D6D6D]">
              {order.OrderProduct.length} ürün - {order.totalPrice} €
            </span>
          </div>
          <div
            className="flex flex-row items-center"
            onClick={() => alert("Siparisi Tekrarla: " + order.id)}
          >
            <Image
              src={ICONS.reorder}
              alt={"plus-icon"}
              width={17}
              height={17}
            />
            <span className="text-[#363636] text-[14px] mx-[10px]">
              Siparisi Tekrarla
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <span
          className={`text-[12px] font-semibold ${
            orderStatus === "Teslim Edildi"
              ? "text-primary"
              : orderStatus === "Kargoya Verildi"
              ? "text-[#0085FF]"
              : orderStatus === "Siparis Hazirlaniyor"
              ? "text-[#FF891C]"
              : orderStatus === "Siparis Alindi"
              ? "text-[#65A100]"
              : "text-[#FF2121]"
          }`}
        >
          {orderStatus}
        </span>
        <div className="flex justify-end cursor-pointer">
          <Link href={`/orders/order-detail/${order.id}`}>
            <Image
              src={ICONS.rightArrowLongDark}
              alt={"right-arrow"}
              width={20}
              height={20}
              onClick={() => {
                dispatch(setOrder(order));
              }}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
