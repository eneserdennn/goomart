const ProductRecommend = () => {
    return (
        <div className="flex flex-col h-[212px] px-[20px] py-[30px] bg-white shadow-sm">
            <span className="flex flex-col text-[#363636] font-bold text-[14px]">
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                Hangi ürünü Goomart'ta görmek istersiniz?
            </span>
            <input
                type="text"
                placeholder="Ürün Ismi"
                className="flex flex-col border text-[13px] h-[51px] px-[20px] rounded-md font-bold text-[#363636] my-4"
            />
            <button
                className="flex flex-col bg-primary text-white justify-center items-center font-bold text-[17px] h-[51px] rounded-md"
            >
                Gönder
            </button>
        </div>
    );
};

export default ProductRecommend;
