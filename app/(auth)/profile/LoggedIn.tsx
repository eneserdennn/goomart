import {ICONS} from '@/constants/iconConstants'
import IconButton from "@/components/icon-button";
import Image from "next/image";
import Loading from "@/app/loading";
import React from "react";
import {selectCurrentToken} from '@/redux/features/auth/authSlice';
import {useGetProfileQuery} from '@/redux/features/auth/userProfileApiSlice';
import {useRouter} from "next/navigation";
import {useSelector} from 'react-redux';
import {useDispatch} from "react-redux";
import {logOut} from "@/redux/features/auth/authSlice";
import Link from "next/link";

const LoggedIn: React.FC = () => {
    const router = useRouter();
    const dispatch = useDispatch()
    const token = useSelector(selectCurrentToken);
    const {data: profile, isLoading, isSuccess, isError, error} = useGetProfileQuery(token);

    const handleLogOut = () => {
        console.log('asdas')
        // @ts-ignore
        dispatch(logOut())
        localStorage.removeItem('token');
        router.push('/profile')
    }
    const userNameInitials = `${profile?.name?.charAt(0)}${profile?.surname?.charAt(0)}`;


    return (
        <>
            {profile?.name ? (
                <div className="mb-10">
                    <div className="bg-white rounded-2xl shadow">
                        <div className="flex flex-row justify-between ">
                            <div className="flex items-center justify-between p-6">
                                <div className="flex items-center">
                                    <div
                                        className="rounded-full border h-14 w-14 flex items-center justify-center text-2xl font-bold text-primary">
                                        {userNameInitials}
                                    </div>
                                    <div className="flex flex-col px-4">
                                        <span
                                            className="font-bold text-primary my-1">{profile?.name} {profile?.surname}</span>
                                        <span className="text-gray-500 text-sm">{profile?.email}</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="border p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                                    <Link href={'/profile/account-settings'}>
                                        <Image src={ICONS.settings} alt={"settings-icon"} color="#f00"
                                               className="h-6 w-6"/>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-center p-4 mb-4">
                            <div className="flex items-center justify-around w-full md:w-3/4 lg:w-2/3 xl:w-1/2">
                                <div
                                    className="flex flex-col px-4 items-center w-1/5 md:w-auto hover:bg-gray-100 cursor-pointer rounded-lg">
                                    <Image src={ICONS.orders} alt={"person-icon"} className="h-8 w-8 mb-1"/>
                                    <span className="text-sm px-1">Siparişlerim</span>
                                </div>
                                <div className="w-0.5 h-14 mx-2 bg-gray-200"/>
                                <Link href={'/addresses'}
                                      className="flex flex-col px-4 items-center w-1/5 md:w-auto hover:bg-gray-100 cursor-pointer rounded-lg">
                                    <Image src={ICONS.address} alt={"person-icon"} className="h-8 w-8 mb-1"/>
                                    <span className=" text-sm px-1">Adreslerim</span>
                                </Link>
                                <div className="w-0.5 h-14 mx-2 bg-gray-200"/>
                                <div
                                    className="flex flex-col px-4 items-center w-1/5 md:w-auto hover:bg-gray-100 cursor-pointer rounded-lg">
                                    <Image src={ICONS.coupons} alt={"person-icon"} className="h-8 w-8 mb-1"/>
                                    <Link href={'/my-coupons'}>
                                        <span className="text-sm px-1">Kuponlarım</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <Link href={'/favorites'}>
                        <IconButton icon={<Image src={ICONS.favorites} alt="payment-icon"/>}>
                            Favori Ürünler
                        </IconButton>
                        </Link>
                        <IconButton icon={<Image src={ICONS.payment} alt="payment-icon"/>} onClick={() => {
                            router.push('/payment')
                        }}>
                            Ödeme Yöntemlerim
                        </IconButton>
                        <Link href={'/contact-prefs'}>
                            <IconButton
                                icon={<Image className="h-8 w-8" src={ICONS.notification} alt="notification-icon"/>}
                            >
                                İletişim Tercihlerim
                            </IconButton>
                        </Link>
                        <Link href={'/contact-us'}>
                            <IconButton icon={<Image className="h-8 w-8" src={ICONS.contact} alt="contact-icon"/>}
                            >
                                Bize Ulaşın
                            </IconButton>
                        </Link>
                        <IconButton icon={<Image className="h-8 w-8" src={ICONS.SSS} alt="sozlesmeler-icon"/>}
                                    onClick={() => console.log('Heart icon clicked')}>
                            Çok Sorulan Sorular
                        </IconButton>
                        <Link href={'/terms'}>
                            <IconButton icon={<Image className="h-8 w-8" src={ICONS.agreement} alt="sozlesmeler-icon"/>}
                                        onClick={() => console.log('Heart icon clicked')}>
                                Sözleşmeler ve Politikalar
                            </IconButton>
                        </Link>
                        <IconButton rightIcon={false}
                                    icon={<Image className="h-8 w-8" src={ICONS.logout} alt="logout-icon"/>}
                                    onClick={handleLogOut}>
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



