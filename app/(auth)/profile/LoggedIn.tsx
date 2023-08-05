import Image from "next/image";
import {useRouter} from "next/navigation";

import {selectUser} from "@/redux/features/userSlice";
import {useSelector} from "react-redux";

import {ICONS} from '@/constants/iconConstants'
import IconButton from "@/components/icon-button";
import Loading from "@/app/loading";
import React from "react";


const LoggedIn:React.FC = () => {
    const router = useRouter();
    const profile = useSelector(selectUser);

    return (
        <>
            {profile.name ? (
                <div className="mb-10">
                    <div className="bg-white rounded-2xl shadow">
                        <div className="flex flex-row justify-between ">
                            <div className="flex items-center justify-between p-6">
                                <div className="flex items-center">
                                    <Image src={ICONS.person} alt={"person-icon"}
                                           className="rounded-full border h-14 w-14"/>
                                    <div className="flex flex-col px-4">
                                    <span
                                        className="font-bold text-primary my-1">{profile?.name} {profile?.surname}</span>
                                        <span className="text-gray-500 text-sm">{profile?.email}</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="border p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                                     onClick={() => {router.push('/profile/account-settings')}}>
                                    <Image src={ICONS.settings} alt={"settings-icon"} className="h-6 w-6"/>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-center p-4">
                            <div className="flex items-center justify-between w-full md:w-3/4 lg:w-2/3 xl:w-1/2">
                                <div
                                    className="flex flex-col px-4 items-center w-1/5 md:w-auto hover:bg-gray-100 cursor-pointer rounded-lg">
                                    <Image src={ICONS.orders} alt={"person-icon"} className="h-8 w-8 mb-1"/>
                                    <span className="text-sm px-1">Siparişlerim</span>
                                </div>
                                <div className="w-0.5 h-14 mx-2 bg-gray-200"/>
                                <div
                                    className="flex flex-col px-4 items-center w-1/5 md:w-auto hover:bg-gray-100 cursor-pointer rounded-lg"
                                    onClick={() => {
                                        router.push('/delivery-address')
                                    }}>
                                    <Image src={ICONS.address} alt={"person-icon"} className="h-8 w-8 mb-1"/>
                                    <span className=" text-sm px-1">Adreslerim</span>
                                </div>
                                <div className="w-0.5 h-14 mx-2 bg-gray-200"/>
                                <div
                                    className="flex flex-col px-4 items-center w-1/5 md:w-auto hover:bg-gray-100 cursor-pointer rounded-lg">
                                    <Image src={ICONS.coupons} alt={"person-icon"} className="h-8 w-8 mb-1"/>
                                    <span className="text-sm px-1">Kuponlarım</span>
                                </div>
                                <div className="w-0.5 h-14 mx-2 bg-gray-200"/>
                                <div
                                    className="flex flex-col px-4 items-center w-1/5 md:w-auto hover:bg-gray-100 cursor-pointer rounded-lg">
                                    <Image src={ICONS.favorites} alt={"person-icon"} className="h-8 w-8 mb-1"/>
                                    <span className="text-sm px-1">Favorilerim</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <IconButton icon={<Image src={ICONS.payment} alt="payment-icon"/>} onClick={() => {
                            router.push('/payment')
                        }}>
                            Ödeme Yöntemlerim
                        </IconButton>
                        <IconButton icon={<Image className="h-8 w-8" src={ICONS.notification} alt="notification-icon"/>}
                                    onClick={() => console.log('Heart icon clicked')}>
                            İletişim Tercihlerim
                        </IconButton>
                        <IconButton icon={<Image className="h-8 w-8" src={ICONS.contact} alt="contact-icon"/>}
                                    onClick={() => console.log('Heart icon clicked')}>
                            Bize Ulaşın
                        </IconButton>
                        <IconButton icon={<Image className="h-8 w-8" src={ICONS.SSS} alt="sozlesmeler-icon"/>}
                                    onClick={() => console.log('Heart icon clicked')}>
                            Sıkça Sorulan Sorular
                        </IconButton>
                        <IconButton icon={<Image className="h-8 w-8" src={ICONS.agreement} alt="sozlesmeler-icon"/>}
                                    onClick={() => console.log('Heart icon clicked')}>
                            Sözleşmeler ve Politikalar
                        </IconButton>
                        <IconButton rightIcon={false}
                                    icon={<Image className="h-8 w-8" src={ICONS.logout} alt="logout-icon"/>}
                                    onClick={() => console.log('Heart icon clicked')}>
                            Çıkış Yap
                        </IconButton>
                    </div>
                    <div className="my-4">
                        <span className="m-1">Dil - Language</span>
                        <div className="mt-4">
                            <IconButton onClick={() => console.log('Heart icon clicked')}>
                                Türkçe
                            </IconButton>
                            <IconButton rightIcon={false} rightString={"1.0.0"}
                                        onClick={() => console.log('Heart icon clicked')}>
                                Versiyon
                            </IconButton>
                        </div>
                    </div>
                </div>
            ) : (
                <Loading/>
            )}
        </>
    )
}

export default LoggedIn;



