import Image from "next/image";
import { IMAGES } from "@/constants/imageConstants";

const MobileAppSection = () => {
  return (
    <div className="flex bg-[#FFD306] h-[390px] w-full space-x-[245px] items-center justify-center">
      <div className="flex flex-col">
        <span className="font-extrabold text-[#0F1F2C] text-[32px] mb-[85px]">
          GooMart Uygulamasini Hemen Indir !
        </span>
        <div className="flex mt-[30px] space-x-[70px]">
          <Image
            src={IMAGES.appleBigBorder}
            alt={"apple"}
            width={200}
            height={60}
          />
          <Image
            src={IMAGES.googleBigBorder}
            alt={"google"}
            width={200}
            height={60}
          />
        </div>
      </div>
      <div className="flex">
        <div className="flex space-x-[67px]">
          <Image
            src={IMAGES.mobileDevice}
            alt={"apple"}
            width={436}
            height={350}
          />
          <Image src={IMAGES.qrCode} alt={"google"} width={180} height={180} />
        </div>
      </div>
    </div>
  );
};

export default MobileAppSection;
