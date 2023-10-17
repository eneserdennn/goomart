import Image from "next/image";
import { IMAGES } from "@/constants/imageConstants";

const InfoSection = () => {
  return (
    <div className="flex w-full mb-[116px] items-center justify-center space-x-[90px]">
      <div className="flex flex-col items-center justify-between">
        <Image
          src={IMAGES.esnekOdeme}
          alt={"esnek ödeme"}
          width={200}
          height={200}
        />
        <div className="flex flex-col items-center justify-between">
          <span className="text-[#4FAB53] font-bold text-[20px] w-[200px] text-center mb-[30px]">
            Esnek Ödeme İmkanları
          </span>
          <span className="text-[#555555] font-semibold text-[17px] w-[436px] text-center justify-end">
            Klarna, Paypal, Kredi karti, Sofort ve Daha Fazla Ödeme Secenekleri
            ile Güvenli ve Hizli Ödeme.
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between">
        <Image
          src={IMAGES.europaOrder}
          alt={"esnek ödeme"}
          width={200}
          height={200}
        />
        <div className="flex flex-col items-center justify-between">
          <span className="text-[#4FAB53] font-bold text-[20px] w-[200px] text-center mb-[30px]">
            Tüm Avrupa Ülkelerine Teslimat
          </span>
          <span className="text-[#555555] font-semibold text-[17px] w-[298px] text-center">
            Tüm Avrupa Ülkelerine Hizli Gönderim 1-3 Gün Icinde Ürünlerin
            Kapinda.
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <Image
          src={IMAGES.halalCertificate}
          alt={"esnek ödeme"}
          width={200}
          height={200}
        />
        <div className="flex flex-col items-center">
          <span className="text-[#4FAB53] font-bold text-[20px] w-[172px] text-center mb-[30px]">
            %100 Halal Ürünler
          </span>
          <span className="text-[#555555] font-semibold text-[17px] w-[402px] text-center">
            Ürün Kategorilerimizde Sadece Halal ürünler satilir. Halal
            Sartlarina Uygun ve Sertifikali.
          </span>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
