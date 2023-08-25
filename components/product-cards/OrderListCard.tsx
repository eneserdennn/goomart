const OrderListCard = () => {
    return (
        <div className="flex mb-[20px] flex-row ">
            <div className=" h-[90px] w-[90px] bg-white border rounded-lg mr-[20px] relative">
                <div className="flex absolute top-[-10px] left-[-10px] w-[34px] justify-center items-center h-[34px] bg-[#FFD306] rounded-full">
                    <span className="text-[17px] text-white">x2</span>
                </div>
            </div>
            <div className="flex flex-col space-y-1 pb-1 justify-center max-w-[145px] text-[15px] font-semibold">
                <span>
                    Nestle Misir Gevregi 500g
                </span>
                <span className="text-primary">
                    €44,99
                </span>
            </div>
        </div>
    );
};

export default OrderListCard;
