'use client'

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ICONS } from "@/constants/iconConstants";
import Modal from "@/components/modal/Modal";

const SearchHistoryComp = ({ searchHistory }) => {
    return (
        <div>
            {searchHistory.map((term, index) => (
                <div className="flex flex-col bg-white" key={index}>
                    <span className="flex text-[14px] h-[50px] pl-[15px] pr-[30px] items-center font-semibold">
                        {term}
                    </span>
                    <div className="flex bg-gray-300 h-[1px] w-full" />
                </div>
            ))}
        </div>
    );
};

const SearchBox = () => {
    const [searchHistory, setSearchHistory] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isSearchHistoryOpen, setIsSearchHistoryOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isTrashIconClickable, setIsTrashIconClickable] = useState(false);


    useEffect(() => {
        const history = localStorage.getItem("searchHistory");
        if (history) {
            setSearchHistory(JSON.parse(history));
        }
    }, []);

    const updateSearchHistory = (term) => {
        const updatedHistory = [...searchHistory, term];
        setSearchHistory(updatedHistory);
        localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim() !== "") {
            updateSearchHistory(searchTerm);
        }
        setSearchTerm(""); // Giriş alanını boşalt
        // Arama işlemini burada gerçekleştirin
    };

    const handleInputFocus = () => {
        setIsSearchHistoryOpen(true);
    };

    const handleInputBlur = () => {
        setTimeout(() => {
            if (!isTrashIconClickable) {
                setIsSearchHistoryOpen(false);
            }
        }, 200);
    };

    return (
        <div className="flex flex-col w-full">
            <div className="flex h-[52px] w-full p-3.5 justify-between bg-white shadow-md">
                <form onSubmit={handleSearch} className="flex flex-row">
                    <Image src={ICONS.search} alt={'search-icon'} width={24} height={24} />
                    <input
                        className="w-full h-full pl-3.5 text-sm text-gray-500 placeholder-gray-500 rounded-md focus:outline-none focus:border-none"
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                        placeholder="Ürün Ara..."
                    />
                </form>
                <div className="flex flex-row">
                    <Image src={ICONS.mic} alt={'mic-icon'} width={15} height={21} className="mx-5" />
                    <Image src={ICONS.scan} alt={'mic-icon'} width={22} height={21} />
                </div>
            </div>
            {isSearchHistoryOpen && searchHistory.length > 0 && (
                <div className="flex flex-col">
                    <div className="flex flex-row w-full my-3 h-[34px] pl-[15px] pr-[20px] justify-between items-center text-[#363636] font-bold text-[14px] ">
                        <span>Arama Geçmişi</span>
                        <Image
                            src={ICONS.trashGray}
                            alt={'trash-icon'}
                            width={15}
                            height={15}
                            onClick={() => {
                                setIsTrashIconClickable(true);
                                setIsModalOpen(true);
                            }}
                            onMouseLeave={() => {
                                setIsTrashIconClickable(false);
                            }}
                        />
                    </div>
                    <SearchHistoryComp searchHistory={searchHistory} />
                </div>
            )}
            <Modal show={isModalOpen} onClose={()=>{
                setIsModalOpen(false)
            }} onConfirm={()=>{
                setIsModalOpen(false)
                setSearchHistory([])
                localStorage.removeItem("searchHistory")
            }} message={'Arama Geçmişini Silmek İstediğinize Emin Misiniz?'} />
        </div>
    );
};

export default SearchBox;
