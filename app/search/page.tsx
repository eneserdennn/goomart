import BottomNavBar from "@/components/bottom-navbar/BottomNavBar";
import SearchBox from "@/components/search/SearchBox";
import { BiChevronRight, BiSearchAlt } from "react-icons/bi";

const Search = () => {
  return (
    <>
      {/*   MOBILE */}
      <div className="flex w-full md:hidden">
        <SearchBox />
        <BottomNavBar />
      </div>
      {/*   WEB */}

      <div className="hidden md:flex flex-col items-center my-[50px] justify-center w-[80%] mx-auto">
        <div className="bg-white shadow-md w-full h-[55px] rounded-md flex items-center px-[20px]">
          Ana Sayfa <BiChevronRight size={28} />{" "}
          <p className="font-semibold">Arama</p>
        </div>
        <div className="grid grid-cols-5 w-full mt-[30px] gap-[54px]">
          <div className="h-[600px] w-[300px] rounded-md shadow-md col-span-1">
            <div className="bg-white h-[55px] w-full flex items-center px-[20px] border-b-2">
              <p className="font-semibold">Tüm Kategoriler</p>
            </div>

            <div className="flex flex-col items-center justify-center w-full h-[545px] space-y-[20px]"></div>
          </div>
          <div className=" col-span-4">
            <p>
              <span className="text-primary">“Coca Cola”</span> araman icin ne
              yazikki sonuc bulamadik.
            </p>
            <div className="flex flex-col items-center justify-center w-full h-[600px] space-y-[20px]">
              <div className="bg-white shadow-md rounded-md h-[45px] w-[45px] items-center flex justify-center">
                <BiSearchAlt size={23} color="#888" />
              </div>
              <p className="font-bold text-[14px]">Ilgili Sonuc Bulunamadi</p>
              <p className="text-[14px] text-gray-700 max-w-[340px] text-center">
                Farkli bir ürün grubu veya kategori icin tekrar aramayi deneyin
                ya da kategorilerden inceleyin.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
