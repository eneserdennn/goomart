'use client'
import Modal from "@/components/modal/Modal";
import {useState} from "react";
import Image from "next/image";
import {ICONS} from "@/constants/iconConstants";

const ProductRecommend = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isError, setIsError] = useState(false);

    return (
        <div className="flex flex-col h-[212px] px-[20px] py-[30px] bg-white shadow-sm">
            <span className="flex flex-col text-[#363636] font-bold text-[14px]">
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                Hangi ürünü Goomart'ta görmek istersiniz?
            </span>
            <input
                type="text"
                placeholder="Ürün Ismi"
                className="flex flex-col border text-[13px] h-[51px] px-[20px] rounded-md font-bold text-[#363636] mt-4"
                value={inputValue}
                onChange={(e) => {
                    setInputValue(e.target.value);
                }}
            />
            {isError && (
                <span className="flex flex-col text-rose-600 font-bold text-[14px]">
                    Lütfen bir ürün ismi giriniz.
                </span>
            )}
            <button
                className="flex flex-col bg-primary text-white justify-center items-center font-bold text-[17px] h-[51px] rounded-md mt-4"
                onClick={() => {
                    if (inputValue === '') {
                        setIsError(true);
                        return
                    } else {
                        setIsModalOpen(true);
                    }
                }}
            >
                Gönder
            </button>
            <Modal show={isModalOpen}
                   onClose={() => {
                       setIsModalOpen(false);
                   }}
                   onConfirm={() => {
                       setIsModalOpen(false);
                   }}
                   hasCancelButton={false}
                   buttonText={"Tamam"}
                   icon={<Image src={ICONS.doneOutlined} alt={'like'} width={56} height={56}/>}
                   message={'Önerini aldık, teşekkürler!'}/>

        </div>
    );
};

export default ProductRecommend;
