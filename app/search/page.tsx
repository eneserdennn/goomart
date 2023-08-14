import SearchBox from "@/components/search/SearchBox";
import BottomNavBar from "@/components/bottom-navbar/BottomNavBar";

const Search = () => {
    return (
        <div className="flex w-full">
            <SearchBox/>
            <BottomNavBar/>
        </div>
    );
};

export default Search;
