'use client'
import { Disclosure } from "@headlessui/react";
import React from "react";
import Image from "next/image";
import {ICONS} from "@/constants/iconConstants";
import { useGetFaqQuery} from "@/redux/features/faqApiSlice";
import Loading from "@/app/loading";
import BottomNavBar from "@/components/bottom-navbar/BottomNavBar";

interface FAQItem {
    question: string;
    answer: string;
}

const FAQData: FAQItem[] = [
    {
        question: "Üye olmadan sipariş verebilir miyim?",
        answer: "Sipariş verebilmeniz için Goomart'a üye olmanız gerekmektedir."
    },
    {
        question: "Uygulama veya siparişlerim ile ilgili size nasıl istekte bulunabilirim?",
        answer: "Uygulama veya siparişlerinizle ilgili talepleriniz için iletişim bölümünden bize ulaşabilirsiniz."
    }
];

const FAQPage = () => {
    const { data, error, isLoading } = useGetFaqQuery();
    if (isLoading) return <Loading/>;
    if (error) return <div>Something went wrong</div>;

    if (data.length === 0) return (
        <div className="flex flex-col mx-2 my-4">
            {FAQData.map((item, index) => (
                <Disclosure key={index}>
                    {({ open }) => (
                        <div className="flex flex-col mb-3">
                            <Disclosure.Button
                                className={`flex items-center justify-between border-b px-[15px] py-[20px] ${
                                    open ? "rounded-t-2xl" : "rounded-2xl"
                                } bg-white`}
                            >
                                <div className="flex flex-col">
                                    <span className="text-[15px] font-bold text-start">
                                        {item.question}
                                    </span>
                                </div>
                                <Image src={ICONS.downArrowBold} alt={"downArrow"} width={10} height={5}/>
                            </Disclosure.Button>
                            <Disclosure.Panel className="rounded-b-2xl border-t bg-white p-4">
                                <p className="text-[14px] text-[#363636]">{item.answer}</p>
                            </Disclosure.Panel>
                        </div>
                    )}
                </Disclosure>
            ))}
            <BottomNavBar/>
        </div>
    );

    if (data.length > 0) {
        return (
            <div className="flex flex-col mx-2 my-4">
                {data.map((item, index) => (
                    <Disclosure key={index}>
                        {({ open }) => (
                            <div className="flex flex-col mb-3">
                                <Disclosure.Button
                                    className={`flex items-center justify-between border-b  px-[15px] py-[20px] ${
                                        open ? "rounded-t-2xl" : "rounded-2xl"
                                    } bg-white`}
                                >
                                    <div className="flex flex-col">
                                    <span className="text-[15px] font-bold text-start">
                                        {item.question}
                                    </span>
                                    </div>
                                    <Image src={ICONS.downArrowBold} alt={"downArrow"} width={10} height={5}/>
                                </Disclosure.Button>
                                <Disclosure.Panel className="rounded-b-2xl border-t bg-white p-4">
                                    <p className="text-[14px] text-[#363636]">{item.answer}</p>
                                </Disclosure.Panel>
                            </div>
                        )}
                    </Disclosure>
                ))}
                <BottomNavBar/>
            </div>
        )
    }


};

export default FAQPage;
