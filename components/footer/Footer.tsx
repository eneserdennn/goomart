import React from "react";
import Image from "next/image";
import { IMAGES } from "@/constants/imageConstants";
import { ICONS } from "@/constants/iconConstants";

const Footer = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex h-[710px] w-full py-[100px]">
        <div className="grid grid-cols-8 w-full">
          <div className="col-start-2 col-span-1">
            <span className="text-[16px] font-bold text-[#333333]">
              Is Ortaklarimiz
            </span>
            <div className="mt-[25px]">
              <Image
                src={IMAGES.partner}
                alt={"partner"}
                width={120}
                height={70}
              />
            </div>
          </div>
          <div className="col-start-3 col-span-1">
            <span className="text-[16px] font-bold text-[#333333]">
              Kurumsal
            </span>
            <ul>
              <li className="mt-[25px]">
                <span className="text-[14px] font-semibold text-[#0F1F2C]">
                  Hakkimizda
                </span>
              </li>
              <li className="mt-[10px]">
                <span className="text-[14px] font-semibold text-[#0F1F2C]">
                  Cok Sorulan Sorular
                </span>
              </li>
              <li className="mt-[10px]">
                <span className="text-[14px] font-semibold text-[#0F1F2C]">
                  Iletisim
                </span>
              </li>
              <li className="mt-[10px]">
                <span className="text-[14px] font-semibold text-[#0F1F2C]">
                  Sözlesmeler ve Politikalar
                </span>
              </li>
            </ul>
          </div>
          <div className="col-start-4 col-span-1">
            <span className="text-[16px] font-bold text-[#333333]">
              Kategoriler
            </span>
            <div className="flex">
              <ul>
                <li className="mt-[25px]">
                  <span className="text-[14px] font-semibold text-[#0F1F2C]">
                    Kahvaltilik
                  </span>
                </li>
                <li className="mt-[10px]">
                  <span className="text-[14px] font-semibold text-[#0F1F2C]">
                    Icecekler
                  </span>
                </li>
                <li className="mt-[10px]">
                  <span className="text-[14px] font-semibold text-[#0F1F2C]">
                    Atistirmalik
                  </span>
                </li>
                <li className="mt-[10px]">
                  <span className="text-[14px] font-semibold text-[#0F1F2C]">
                    Hazir,Donuk
                  </span>
                </li>
                <li className="mt-[10px]">
                  <span className="text-[14px] font-semibold text-[#0F1F2C]">
                    Süt Ürünleri
                  </span>
                </li>
                <li className="mt-[10px]">
                  <span className="text-[14px] font-semibold text-[#0F1F2C]">
                    Temel Gida
                  </span>
                </li>
                <li className="mt-[10px]">
                  <span className="text-[14px] font-semibold text-[#0F1F2C]">
                    Firin,Pastane
                  </span>
                </li>
                <li className="mt-[10px]">
                  <span className="text-[14px] font-semibold text-[#0F1F2C]">
                    Cay, Kahve
                  </span>
                </li>
                <li className="mt-[10px]">
                  <span className="text-[14px] font-semibold text-[#0F1F2C]">
                    Arap Ürünleri
                  </span>
                </li>
                <li className="mt-[10px]">
                  <span className="text-[14px] font-semibold text-[#0F1F2C]">
                    Temizlik,Deterjan
                  </span>
                </li>
              </ul>
              <ul>
                <li className="mt-[25px]">
                  <span className="text-[14px] font-semibold text-[#0F1F2C]">
                    Kahvaltilik
                  </span>
                </li>
                <li className="mt-[10px]">
                  <span className="text-[14px] font-semibold text-[#0F1F2C]">
                    Icecekler
                  </span>
                </li>
                <li className="mt-[10px]">
                  <span className="text-[14px] font-semibold text-[#0F1F2C]">
                    Atistirmalik
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-start-5 col-span-1 flex flex-col items-center">
            <span className="text-[16px] font-bold text-[#333333] ">
              Mobil Uygulamalar
            </span>
            <div className="mt-[20px]">
              <Image
                src={IMAGES.appleBorder}
                alt={"apple"}
                width={152}
                height={55}
              />
            </div>
            <div className="mt-[25px]">
              <Image
                src={IMAGES.googleBorder}
                alt={"apple"}
                width={152}
                height={55}
              />
            </div>
          </div>
          <div className="col-start-6 col-span-1 flex flex-col items-center">
            <span className="text-[16px] font-bold text-[#333333] ">
              Bizi Takip Edin
            </span>
            <div className="flex mt-[20px] space-x-[25px]">
              <Image
                src={ICONS.instagram}
                alt={"instagram"}
                width={36}
                height={36}
              />
              <Image
                src={ICONS.facebook}
                alt={"facebook"}
                width={36}
                height={36}
              />
              <Image src={ICONS.tiktok} alt={"tiktok"} width={36} height={36} />
              <Image
                src={ICONS.youtube}
                alt={"youtube"}
                width={36}
                height={36}
              />
            </div>
            <div className="flex flex-col mt-[60px]">
              <div className="border rounded-lg">
                <Image
                  src={IMAGES.qrCode}
                  alt={"qr"}
                  width={100}
                  height={100}
                />
              </div>
            </div>
            <span className="text-[16px] font-bold mt-[20px]">
              Almanya Kayitlidir
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-between w-full bg-[#333333] h-[140px] items-center ">
        <div className="flex flex-col">
          <Image src={ICONS.goomart} alt={"logo"} width={110} height={27} />
          <span className="text-[#FFFFFF] text-[14px] mt-[10px]">
            @2023 Ases GmbH Tüm Haklari Saklidir.
          </span>
        </div>
        <div className="flex">
          <div className="flex space-x-[26px]">
            <Image src={ICONS.klarna} alt={"klarna"} width={65} height={45} />
            <Image
              src={ICONS.paypalfill}
              alt={"paypal"}
              width={65}
              height={45}
            />
            <Image
              src={ICONS.mastercardWhite}
              alt={"mastercard"}
              width={65}
              height={45}
            />
            <Image src={ICONS.visa} alt={"visa"} width={65} height={45} />
          </div>
          <div className="flex">
            <Image src={ICONS.maestro} alt={"klarna"} width={100} height={65} />

            <Image src={ICONS.amex} alt={"klarna"} width={65} height={45} />
            <Image
              src={ICONS.sepaWhite}
              alt={"klarna"}
              width={100}
              height={65}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
