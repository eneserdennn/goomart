"use client";

import { AiFillFilter, AiOutlineLoading3Quarters } from "react-icons/ai";
import { BiSearchAlt, BiSolidChevronDown } from "react-icons/bi";
import { ButtonHTMLAttributes, ReactNode, useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { IoMenu, IoPersonSharp } from "react-icons/io5";

import Button from "@/components/button";
import Cookies from "js-cookie";
import { FaShoppingCart } from "react-icons/fa";
import { ICONS } from "@/constants/iconConstants";
import IconButton from "@/components/icon-button";
import InputMask from "react-input-mask";
import { IoMdNotifications } from "react-icons/io";
import Link from "next/link";
import Loading from "@/app/loading";
import React from "react";
import SideBar from "../sidebar/SideBar";
import { setCredentials } from "@/redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useField } from "formik";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

interface IMenuItem {
  name: string;
  subMenu?: {
    name: string;
    itemImg: string;
  }[];
}

interface IPage {
  name: string;
  href: string;
}

const NavBar: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const path = usePathname();

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(setCredentials({ access_token: token }));
    }
  }, []);

  const data: IMenuItem[] = [
    {
      name: "Menu Item 1",
      subMenu: [
        {
          name: "subMenuItem1",
          itemImg:
            "https://fastly.picsum.photos/id/322/64/64.jpg?hmac=GPBpScfDWKJl0C8fQNJAkjALeR3YbyIoR49Z9OXpe6A",
        },
        {
          name: "subMenuItem2",
          itemImg:
            "https://fastly.picsum.photos/id/322/64/64.jpg?hmac=GPBpScfDWKJl0C8fQNJAkjALeR3YbyIoR49Z9OXpe6A",
        },
        {
          name: "subMenuItem3",
          itemImg:
            "https://fastly.picsum.photos/id/322/64/64.jpg?hmac=GPBpScfDWKJl0C8fQNJAkjALeR3YbyIoR49Z9OXpe6A",
        },
        {
          name: "subMenuItem4",
          itemImg:
            "https://fastly.picsum.photos/id/322/64/64.jpg?hmac=GPBpScfDWKJl0C8fQNJAkjALeR3YbyIoR49Z9OXpe6A",
        },
        {
          name: "subMenuItem5",
          itemImg:
            "https://fastly.picsum.photos/id/322/64/64.jpg?hmac=GPBpScfDWKJl0C8fQNJAkjALeR3YbyIoR49Z9OXpe6A",
        },
        {
          name: "subMenuItem6",
          itemImg:
            "https://fastly.picsum.photos/id/322/64/64.jpg?hmac=GPBpScfDWKJl0C8fQNJAkjALeR3YbyIoR49Z9OXpe6A",
        },
      ],
    },
    { name: "Menu Item 2" },
    { name: "Menu Item 3" },
    { name: "Menu Item 4" },
    { name: "Menu Item 5" },
  ];

  const idPaths = path.split("/").splice(2).join("/");
  const idPaths2 = path.split("/").splice(3).join("/");

  const pages: IPage[] = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Giriş Yap",
      href: "/login",
    },
    {
      name: "Kayıt Ol",
      href: "/signup",
    },
    {
      name: "Adreslerim",
      href: "/addresses",
    },
    {
      name: "Adres Ekle",
      href: "/addresses/add-address",
    },
    {
      name: "Şifremi Unuttum",
      href: "/forgot-password",
    },
    {
      name: "Profil",
      href: "/profile",
    },
    {
      name: "Ayarlar",
      href: "/profile/account-settings",
    },
    {
      name: "Adres Düzenle",
      href: `/addresses/edit-address/${idPaths}`,
    },
    {
      name: "Ürünler",
      href: `/categories/${idPaths}`,
    },
    {
      name: "Ürün Detay",
      href: `/product-detail/${idPaths}`,
    },
    {
      name: "Arama",
      href: `/search`,
    },
    {
      name: "Sepet",
      href: `/cart`,
    },
    {
      name: "Kuponlarım",
      href: `/my-coupons`,
    },
    {
      name: "Iletisim Tercihleri",
      href: `/contact-prefs`,
    },
    {
      name: "Bize Ulasin",
      href: `/contact-us`,
    },
    {
      name: "Cok Sorulan Sorular",
      href: `/faq`,
    },
    {
      name: "Sozlesmeler ve Politikalar",
      href: `/terms`,
    },
    {
      name: "Bildirimler",
      href: `/notification`,
    },
    {
      name: "Kampanyalar",
      href: `/campaigns`,
    },
    {
      name: "Kampanya Uygula",
      href: `/campaigns/apply`,
    },
    {
      name: "Ürün Öneri",
      href: `/product-recommend`,
    },
    {
      name: "Kampanya Detay",
      href: `/campaigns/campaign-detail/${idPaths2}`,
    },
    {
      name: "Favori Ürünler",
      href: `/favorites`,
    },
    {
      name: "Siparişlerim",
      href: `/orders`,
    },
    {
      name: "Sipariş Detayları",
      href: `/orders/order-detail/${idPaths2}`,
    },
    {
      name: "Ödeme",
      href: `/checkout`,
    },
    {
      name: "Kart Ödemesi",
      href: `/checkout/card-payment`,
    },
    {
      name: "Sipariş Onay",
      href: `/checkout/order-confirmation`,
    },
    {
      name: "Sipariş Tekrar",
      href: `/orders/order-reorder`,
    },
  ];

  let currentPage = pages.find((page) => page.href === path);

  interface IconInputProps {
    icon: StaticImageData;
    mask?: string;
    name: string;
    type: string;
    placeholder: string;
  }

  // ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  //     className?: string;
  //     disabled?: boolean;
  //     type?: 'submit' | 'reset' | 'button';
  //     loading?: boolean;
  //     active?: boolean;
  //     icon?: ReactNode;
  //     svgIcon?: string;
  //     iconSize?: number;
  //     rightIcon?: boolean;
  //     rightString?: string;

  const IconInputNoMask: React.FC<IconInputProps> = ({
    icon: Icon,
    ...props
  }) => {
    // const [field, meta] = useField(props);
    // const errorText = meta.error && meta.touched ? meta.error : null;

    return (
      <div className="flex flex-col w-[528px]">
        <div className="relative">
          <div className="absolute px-1 left-3 top-1/2 transform -translate-y-1/2">
            <BiSearchAlt size={23} color="#888" />
          </div>
          <input
            {...props}
            className={`w-full rounded-2xl px-[43px]  h-[45px] gap-[15px] `}
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <nav className="hidden md:flex w-full h-[70px] px-[238px] items-center justify-between  bg-primary text-[16px]">
        {isLoading ? (
          <Loading />
        ) : (
          <div className="flex w-full items-center justify-between mx-[15px]">
            <div className="flex flex-col items-center text-white">
              <IoMenu size={30} color={"#FFF"} />
              <span className="text-[14px] font-bold">Menu</span>
            </div>
            <Link href="/">
              <Image src={ICONS.goomart} alt="goomart" width={100} />
            </Link>
            <IconInputNoMask
              icon={ICONS.search}
              name="search"
              type="text"
              placeholder="Ürün Ara..."
            />
            <div className="flex flex-row space-x-[40px] pr-[90px]">
              <Button
                className="bg-[#0e6200] justify-between w-[180px] font-bold rounded-[16px] px-[15px] py-[12px] text-[14px] hover:bg-primary hover:text-white"
                onClick={() => router.push("/cart")}
              >
                <IoPersonSharp size={19} color={"#FFF"} />
                Giris Yap / Kayit Ol
              </Button>
              <Button
                className="bg-[#0e6200] flex justify-between w-[180px] font-bold rounded-[16px] px-[15px] text-[14px] hover:bg-primary hover:text-white"
                onClick={() => router.push("/cart")}
              >
                <FaShoppingCart size={19} color={"#FFD306"} />
                <span className="flex flex-col text-[14px]">
                  Sepetim
                  <span className="text-[13px] text-[#FFD306]">125,95 €</span>
                </span>
                <BiSolidChevronDown size={24} color={"#FFF"} />
              </Button>
            </div>
          </div>
        )}
      </nav>
      <nav className="flex md:hidden w-full h-[60px] items-center justify-between  bg-primary text-[16px]">
        {isLoading ? (
          <Loading />
        ) : (
          <div className="flex w-full items-center justify-between mx-[15px]">
            <div className="">
              {currentPage?.name === "Home" ||
              currentPage?.name === "Kampanyalar" ||
              currentPage?.name === "Sipariş Onay" ? (
                <div></div>
              ) : currentPage?.name === "Kampanya Detay" ? (
                <div className="flex items-center">
                  <Image
                    src={ICONS.closeOutlined}
                    alt="goomart"
                    className="h-[12px] w-[12px]"
                    onClick={() => router.back()}
                  />
                </div>
              ) : (
                <div className="flex items-center">
                  <Image
                    src={ICONS.leftArrow}
                    alt="goomart"
                    className="h-5 w-5"
                    onClick={() => router.back()}
                  />
                </div>
              )}
            </div>
            <div className="text-white font-bold">
              {currentPage?.name === "Home" ||
              currentPage?.name === "Kampanyalar" ||
              currentPage?.name === "Kampanya Uygula" ||
              currentPage?.name === "Sipariş Onay" ? (
                <div className="">
                  <Link href="/">
                    <Image src={ICONS.goomart} alt="goomart" width={100} />
                  </Link>
                </div>
              ) : (
                currentPage?.name
              )}
            </div>
            {currentPage?.name === "Home" ? (
              <div className="flex items-center">
                <Link href={`/notification`}>
                  <IoMdNotifications
                    className="text-white"
                    size={30}
                    color={"#FFD306"}
                  />
                </Link>
              </div>
            ) : currentPage?.name === "Ürünler" ? (
              <div className="flex justify-between items-center">
                <SideBar data={data} />
              </div>
            ) : currentPage?.name === "Ürün Detay" ? (
              <div className="flex justify-between items-center">
                <Image src={ICONS.heart} alt="filter" width={20} height={19} />
              </div>
            ) : currentPage?.name === "Sepet" ? (
              <Image
                src={ICONS.trashWhite}
                alt="filter"
                width={20}
                height={19}
                onClick={() => {
                  // dispatch(openModal());
                }}
              />
            ) : (
              <div className="flex justify-between items-center"></div>
            )}
          </div>
        )}
      </nav>
    </>
  );
};

export default NavBar;
