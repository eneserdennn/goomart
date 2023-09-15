import BottomNavBar from "@/components/bottom-navbar/BottomNavBar";
import SearchBox from "@/components/search/SearchBox";

const Search = () => {
  return (
    <div className="flex w-full">
      <SearchBox />
      <BottomNavBar />
    </div>
  );
};

export default Search;
