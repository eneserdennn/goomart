import React from "react";

const MainCampaigns = () => {
  return (
    <div className="flex flex-col w-full bg-[#4FAB53] h-[430px] relative mb-[116px]">
      <div className="text-white text-[20px] mt-[38px] mb-[46px] font-bold flex justify-center w-full">
        Kampanyalar
      </div>
      <div className="flex justify-center w-full space-x-[30px]">
        <div className="flex flex-col bg-white h-[205px] justify-center items-center w-[420px] rounded-[25px] border-[15px] border-[#ABDBC6]"></div>
        <div className="flex flex-col bg-white h-[205px] justify-center items-center w-[420px] rounded-[25px] border-[15px] border-[#ABDBC6]"></div>
        <div className="flex flex-col bg-white h-[205px] justify-center items-center w-[420px] rounded-[25px] border-[15px] border-[#ABDBC6]"></div>
      </div>
      <div className="flex justify-center absolute bottom-[-26px] w-full ">
        <button className="bg-[#FFD306] w-[270px] h-[52px] rounded-[8px] text-[15px] font-bold text-[#0F1F2C] hover:bg-[#FFD306]/[0.8]">
          Tüm Kampanyaları Gör
        </button>
      </div>
    </div>
  );
};

export default MainCampaigns;
