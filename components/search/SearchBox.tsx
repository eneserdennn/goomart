"use client";

import React, { useEffect, useState } from "react";

import { ICONS } from "@/constants/iconConstants";
import { IMAGES } from "@/constants/imageConstants";
import Image from "next/image";
import Link from "next/link";
import Loading from "@/app/loading";
import Modal from "@/components/modal/Modal";
import SearchHistory from "@/components/search/SearchHistory";
import SearchResults from "@/components/search/SearchResults";
import { useSearchInAllProductsQuery } from "@/redux/features/categories/categoriesApiSlice";

const SearchBox = () => {
  const [searchHistory, setSearchHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchHistoryOpen, setIsSearchHistoryOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTrashIconClickable, setIsTrashIconClickable] = useState(false);
  const [showCloseIcon, setShowCloseIcon] = useState(false);
  const [isCloseIconClickable, setIsCloseIconClickable] = useState(false);

  const [searchResults, setSearchResults] = useState([]);
  const [searched, setSearched] = useState(false);

  const { data, error, isLoading } = useSearchInAllProductsQuery({
    params: { search: searchTerm },
  });

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      updateSearchHistory(searchTerm);
    }

    setIsSearchHistoryOpen(false);
    setSearched(true);
  };

  const handleSearchTermClick = (term: string) => {
    setSearchTerm(term);

    // Update search history with reordering behavior
    const updatedHistory = searchHistory.filter((item) => item !== term);
    updatedHistory.unshift(
      // @ts-ignore
      term
    );
    setSearchHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));

    // Update search results, even if there are no actual results
    setSearchResults(
      // @ts-ignore
      term.trim() !== "" ? term : []
    );
    setIsSearchHistoryOpen(false);
    setSearched(true);
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

  const updateSearchHistory = (
    // @ts-ignore
    term
  ) => {
    const updatedHistory = searchHistory.filter((item) => item !== term); // Remove the term if it already exists
    updatedHistory.unshift(
      // @ts-ignore
      term
    ); // Add the term to the beginning of the array
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
    setSearched(false);
    setTimeout(() => {
      setSearchTerm("");
      setIsCloseIconClickable(false);
    }, 200);
  };

  if (error) return <div>Something went wrong</div>;

  return (
    <div className="flex flex-col w-full">
      <div className="flex h-[52px] w-full p-3.5 justify-between bg-white shadow-md">
        <form onSubmit={handleSearch} className="flex flex-row justify-between">
          <Image
            src={ICONS.search}
            alt={"search-icon"}
            width={24}
            height={24}
          />
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
              alt={"close-icon"}
              width={15}
              height={15}
              onClick={handleClearSearchTerm}
            />
          </button>
        )}
      </div>
      {isSearchHistoryOpen && searchHistory.length > 0 && (
        <div className="flex flex-col">
          <div className="flex flex-row w-full my-2.5 h-[34px] pl-[15px] pr-[20px] justify-between items-center text-[#363636] font-bold text-[14px] ">
            <span>Arama Geçmişi</span>
            <Image
              src={ICONS.trashGray}
              alt={"trash-icon"}
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
          <SearchHistory
            searchHistory={searchHistory}
            onSearchTermClick={handleSearchTermClick}
          />
        </div>
      )}
      {data && (
        <div className="flex flex-col">
          {searched && !isLoading && (
            <SearchResults
              searchResults={data.products}
              isLoading={isLoading}
            />
          )}
        </div>
      )}
      {data?.productCount === 0 && (
        <>
          <Link href={"/product-recommend"}>
            <div className="flex flex-wrap bg-white shadow-md px-[20px] py-[30px]">
              <div className="flex flex-col justify-center items-center text-center border rounded-md h-[130px] w-[130px]">
                <Image
                  src={IMAGES.recommendProduct}
                  alt={"recommend-product"}
                  width={75}
                  height={90}
                />
                <span className="text-[13px] text-[#363636] font-bold  ">
                  Ürün onermek istermisin?
                </span>
              </div>
            </div>
          </Link>
        </>
      )}
      <Modal
        show={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        onConfirm={() => {
          setIsModalOpen(false);
          setSearchHistory([]);
          localStorage.removeItem("searchHistory");
        }}
        message={"Arama Geçmişini Silmek İstediğinize Emin Misiniz?"}
      />
    </div>
  );
};

export default SearchBox;
