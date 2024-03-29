"use client";
import Container from "@/components/ui/container";
import { ICONS } from "@/constants/iconConstants";
import { IMAGES } from "@/constants/imageConstants";
import Image from "next/image";
import AuthWrapper from "../(auth)/AuthWrapper";
import LoggedIn from "./LoggedIn";
import BottomNavBar from "@/components/bottom-navbar/BottomNavBar";
import IconButton from "@/components/icon-button";
import Link from "next/link";
import { useGetProfileQuery } from "@/redux/features/auth/userProfileApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "@/redux/features/auth/authSlice";
// import { usePathname } from "next/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = useSelector(selectCurrentToken);
  const {
    data: profile,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetProfileQuery(token);
  const userNameInitials = `${profile?.name?.charAt(
    0
  )}${profile?.surname?.charAt(0)}`;

  return (
    <>
      <AuthWrapper>
        <div className="bg-white rounded-2xl shadow">
          <div className="flex lg:hidden flex-row justify-between ">
            <div className="flex items-center justify-between p-6">
              <div className="flex items-center">
                <div className="rounded-full border h-14 w-14 flex items-center justify-center text-2xl font-bold text-primary">
                  {/* {userNameInitials} */}
                  {profile?.name == undefined ? (
                    <Image
                      src={ICONS.person}
                      alt={"person-icon"}
                      className="h-8 w-8"
                    />
                  ) : (
                    userNameInitials
                  )}
                </div>
                <div className="flex flex-col px-4">
                  <span className="font-bold text-primary my-1">
                    {profile?.name == undefined ? (
                      <span>Ad Soyad</span>
                    ) : (
                      `${profile?.name} ${profile?.surname}`
                    )}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {profile?.email}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <div className="border p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                <Link href={"/profile/account-settings"}>
                  <Image
                    src={ICONS.settings}
                    alt={"settings-icon"}
                    color="#f00"
                    className="h-6 w-6"
                  />
                </Link>
              </div>
            </div>
          </div>
          <div className="flex lg:hidden flex-wrap justify-center p-4 mb-4">
            <div className="flex items-center justify-around w-full md:w-3/4 lg:w-2/3 xl:w-1/2">
              <div className="flex flex-col px-4 w-1/5 md:w-auto hover:bg-gray-100 cursor-pointer rounded-lg">
                <Link href={"/orders"} className="flex flex-col items-center">
                  <Image
                    src={ICONS.orders}
                    alt={"person-icon"}
                    className="h-8 w-8 mb-1"
                  />
                  <span className="text-sm px-1">Siparişlerim</span>
                </Link>
              </div>

              <div className="w-0.5 h-14 mx-2 bg-gray-200" />
              <Link
                href={"/addresses"}
                className="flex flex-col px-4 items-center w-1/5 md:w-auto hover:bg-gray-100 cursor-pointer rounded-lg"
              >
                <Image
                  src={ICONS.address}
                  alt={"person-icon"}
                  className="h-8 w-8 mb-1 "
                />
                <span className=" text-sm px-1">Adreslerim</span>
              </Link>
              <div className="w-0.5 h-14 mx-2 bg-gray-200" />
              <div className="flex flex-col px-4 items-center w-1/5 md:w-auto hover:bg-gray-100 cursor-pointer rounded-lg">
                <Image
                  src={ICONS.coupons}
                  alt={"person-icon"}
                  className="h-8 w-8 mb-1"
                />
                <Link href={"/my-coupons"}>
                  <span className="text-sm px-1">Kuponlarım</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col p-4 ">
          <div className="md:grid md:grid-cols-12 md:gap-x-[50px] lg:mt-[60px] md:max-w-[1440px] md:mx-auto block">
            <div className="lg:col-span-3 col-span-12  ">
              <div className="mb-4">
                <Link href={"/favorites"}>
                  <IconButton
                    icon={<Image src={ICONS.favorites} alt="payment-icon" />}
                  >
                    Favori Ürünler
                  </IconButton>
                </Link>
                <IconButton
                  icon={<Image src={ICONS.payment} alt="payment-icon" />}
                  //   onClick={() => {}}
                >
                  Ödeme Yöntemlerim
                </IconButton>
                <Link href={"/contact-prefs"}>
                  <IconButton
                    icon={
                      <Image
                        className="h-8 w-8"
                        src={ICONS.notification}
                        alt="notification-icon"
                      />
                    }
                  >
                    İletişim Tercihlerim
                  </IconButton>
                </Link>
                <Link href={"/contact-us"}>
                  <IconButton
                    icon={
                      <Image
                        className=" h-8 w-8"
                        src={ICONS.contact}
                        alt="contact-icon"
                      />
                    }
                  >
                    Bize Ulaşın
                  </IconButton>
                </Link>
                <Link href={"/faq"}>
                  <IconButton
                    icon={
                      <Image
                        className="h-8 w-8"
                        src={ICONS.SSS}
                        alt="sozlesmeler-icon"
                      />
                    }
                  >
                    Çok Sorulan Sorular
                  </IconButton>
                </Link>
                <Link href={"/terms"}>
                  <IconButton
                    icon={
                      <Image
                        className="h-8 w-8"
                        src={ICONS.agreement}
                        alt="sozlesmeler-icon"
                      />
                    }
                    // onClick={() => {}}
                  >
                    Sözleşmeler ve Politikalar
                  </IconButton>
                </Link>
                <IconButton
                  rightIcon={false}
                  icon={
                    <Image
                      className="h-8 w-8"
                      src={ICONS.logout}
                      alt="logout-icon"
                    />
                  }
                  //   onClick={() => {}}
                >
                  Çıkış Yap
                </IconButton>
              </div>
              <div className="my-4">
                <span className="m-1">Dil - Language</span>
                <div className="mt-4">
                  <IconButton>Türkçe</IconButton>
                  <IconButton
                    rightIcon={false}
                    rightString={"1.0.0"}
                    // onClick={() => {}}
                  >
                    Versiyon
                  </IconButton>
                </div>
              </div>
            </div>
            <div className="col-span-9 hidden lg:block">
              <div className=" flex items-center justify-between ">
                {/* <p className="text-[18px] font-bold text-green-500 p-[30px]">
                  {path.split("/")[1].slice(0, 1).toUpperCase() +
                    path
                      .split("/")[1]
                      .slice(1, path.split("/")[1].length - 1)
                      .toLowerCase()}
                </p> */}
                <p className="text-[16px] font-bold text-green-500 p-[30px]">
                  Son 1 ay
                </p>
              </div>
              <div className="my-4">{children}</div>
            </div>
          </div>
          <BottomNavBar />
        </div>
      </AuthWrapper>
    </>
  );
}
