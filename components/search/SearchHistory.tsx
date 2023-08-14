import React from "react";

interface ISearchHistoryCompProps {
    searchHistory: string[];
    onSearchTermClick: (term: string) => void;
}

const SearchHistoryComp = ({ searchHistory, onSearchTermClick }: ISearchHistoryCompProps) => {
    return (
        <div>
            {searchHistory.map((term, index) => (
                <div
                    className="flex flex-col bg-white"
                    key={index}
                    onClick={() => onSearchTermClick(term)} // Handle click on search term
                >
                    <span className="flex text-[14px] h-[50px] pl-[15px] pr-[30px] items-center font-semibold">
                        {term}
                    </span>
                    <div className="flex bg-gray-300 h-[1px] w-full" />
                </div>
            ))}
        </div>
    );
};

export default SearchHistoryComp;
