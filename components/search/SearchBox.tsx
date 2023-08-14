'use client'

import React, {useState, useEffect} from "react";
import Image from "next/image";
import {ICONS} from "@/constants/iconConstants";
import {useGetProductsAdvancedQueryQuery} from "@/redux/features/products/productApiSlice";
import Modal from "@/components/modal/Modal";
import SearchHistory from "@/components/search/SearchHistory";
import SearchResults from "@/components/search/SearchResults";


const SearchBox = () => {
    const [searchHistory, setSearchHistory] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isSearchHistoryOpen, setIsSearchHistoryOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isTrashIconClickable, setIsTrashIconClickable] = useState(false);
    const [showCloseIcon, setShowCloseIcon] = useState(false);
    const [isCloseIconClickable, setIsCloseIconClickable] = useState(false);
    const [params, setParams] = useState({
        "filter-product-type": 1,
        "sort-by": "max-price",
        lang: "en",
    });

    const [searchResults, setSearchResults] = useState([]);
    const { data, error, isLoading } = useGetProductsAdvancedQueryQuery(params);


    const handleSearch = (e) => {
        e.preventDefault();

        setParams({
            ...params,
            "filter-brand": searchTerm,
        });


        if (searchTerm.trim() !== "") {
            updateSearchHistory(searchTerm);
            setSearchResults(data);
        }

        console.log('data', data)
        setIsSearchHistoryOpen(false);
    };

    const handleSearchTermClick = (term) => {
        setSearchTerm(term); // Set the clicked search term as the new search term

        // Update search history with reordering behavior
        const updatedHistory = searchHistory.filter((item) => item !== term);
        updatedHistory.unshift(term);
        setSearchHistory(updatedHistory);
        localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));

        // Update search results, even if there are no actual results
        setSearchResults(term.trim() !== "" ? term : []);
        setIsSearchHistoryOpen(false);
    };

    useEffect(() => {
        const history = localStorage.getItem("searchHistory");
        if (history) {
            setSearchHistory(JSON.parse(history));
        }
    }, []);

    useEffect(() => {
        setShowCloseIcon(searchTerm !== "");
    }, [searchTerm]);

    const updateSearchHistory = (term) => {
        const updatedHistory = searchHistory.filter((item) => item !== term); // Remove the term if it already exists
        updatedHistory.unshift(term); // Add the term to the beginning of the array
        setSearchHistory(updatedHistory);
        localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
    };


    const handleInputFocus = () => {
        setIsSearchHistoryOpen(true);
        setShowCloseIcon(true); // Show the close icon when the input is focused
    };

    const handleInputBlur = () => {
        setTimeout(() => {
            if (!isTrashIconClickable && !isCloseIconClickable) {
                setIsSearchHistoryOpen(false);
            }
        }, 200);
    };


    const handleClearSearchTerm = () => {
        setIsCloseIconClickable(true);
        setTimeout(() => {
            setSearchTerm("");
            setIsCloseIconClickable(false);
        }, 200);
    };

    return (
        <div className="flex flex-col w-full">
            <div className="flex h-[52px] w-full p-3.5 justify-between bg-white shadow-md">
                <form onSubmit={handleSearch} className="flex flex-row justify-between">
                    <Image src={ICONS.search} alt={'search-icon'} width={24} height={24}/>
                    <input
                        className="w-full h-full pl-3.5 text-[14px] placeholder-gray-500 rounded-md focus:outline-none focus:border-none"
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                        placeholder="Ürün Ara..."
                    />

                </form>
                {showCloseIcon && (
                    <button
                        className="flex flex-row justify-center items-center"
                        onMouseDown={() => setIsCloseIconClickable(true)}
                        onMouseLeave={() => setIsCloseIconClickable(false)}
                    >
                        <Image
                            src={ICONS.close}
                            alt={'close-icon'}
                            width={15}
                            height={15}
                            onClick={handleClearSearchTerm}
                        />
                    </button>
                )}

                {!showCloseIcon && searchTerm === "" && (
                    <div className="flex flex-row">
                        <Image src={ICONS.mic} alt={'mic-icon'} width={15} height={21} className="mx-5"/>
                        <Image src={ICONS.scan} alt={'mic-icon'} width={22} height={21}/>
                    </div>)
                }
            </div>
            {isSearchHistoryOpen && searchHistory.length > 0 && (
                <div className="flex flex-col">
                    <div
                        className="flex flex-row w-full my-2.5 h-[34px] pl-[15px] pr-[20px] justify-between items-center text-[#363636] font-bold text-[14px] ">
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
                    <SearchHistory searchHistory={searchHistory} onSearchTermClick={handleSearchTermClick}/>
                </div>
            )}
            {data && searchResults.length > 0 && (
                <div className="flex flex-col">
                    {searchResults.length > 0 && (
                        <SearchResults searchResults={searchResults}/>
                    )}
                </div>
            )}
            <Modal show={isModalOpen} onClose={() => {
                setIsModalOpen(false)
            }} onConfirm={() => {
                setIsModalOpen(false)
                setSearchHistory([])
                localStorage.removeItem("searchHistory")
            }} message={'Arama Geçmişini Silmek İstediğinize Emin Misiniz?'}/>
        </div>
    );
};

export default SearchBox;
