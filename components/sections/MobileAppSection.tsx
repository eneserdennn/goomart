import Image from "next/image";
import { IMAGES } from "@/constants/imageConstants";

const MobileAppSection = () => {
  return (
    <div className="grid grid-cols-2 bg-[#FFD306] h-[390px] gap-[250px] w-full items-center justify-center">
      <div className="grid mx-auto place-items-center">
        <span className="font-extrabold text-[#0F1F2C] text-[32px] mb-[85px]">
          GooMart Uygulamasini Hemen Indir !
        </span>
        <div className="grid grid-cols-2 mt-[30px] space-x-[60px]">
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
      <div className="grid grid-cols-2">
        <div className="flex">
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
