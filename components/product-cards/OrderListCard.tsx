interface OrderProductUnit {
  id: number;
  name: string;
  convertionToMainUnitRate: number;
  orderProductId: number;
  createdAt: string;
  updatedAt: string;
  archived: boolean;
  archivedAt: null | string;
}

interface Product {
  id: number;
  name: string;
  quantityAsMainUnit: number;
  priceOfMainUnit: number;
  absolutePrice: number;
  productId: number;
  productUnitId: number;
  originalPriceOfMainUnit: number;
  orderId: number;
  createdAt: string;
  updatedAt: string;
  archived: boolean;
  archivedAt: null | string;
  OrderProductUnit: OrderProductUnit;
}

const OrderListCard = ({ product }: { product: Product }) => {
  return (
    <div className="flex mb-[20px] flex-row ">
      <div className=" h-[90px] w-[90px] bg-white border rounded-lg mr-[20px] relative">
        <div className="flex absolute top-[-10px] left-[-10px] w-[34px] justify-center items-center h-[34px] bg-[#FFD306] rounded-full">
          <span className="text-[17px] text-white">
            x{product.quantityAsMainUnit}
          </span>
        </div>
      </div>
      <div className="flex flex-col space-y-1 pb-1 justify-center max-w-[145px] text-[15px] font-semibold">
        <span>{product.name}</span>
        <span className="text-primary">€{product.priceOfMainUnit}</span>
      </div>
    </div>
  );
};

export default OrderListCard;
