'use client'

import {useEffect, useState} from "react";

import {AiFillFilter} from "react-icons/ai";
import {ICONS} from "@/constants/iconConstants";
import Image from 'next/image';
import {IoMdNotifications} from 'react-icons/io';
import Link from 'next/link';
import Loading from "@/app/loading";
import React from "react";
import SideBar from '../sidebar/SideBar';
import {setCredentials} from "@/redux/features/auth/authSlice";
import {useDispatch} from "react-redux";
import {usePathname} from 'next/navigation';
import {useRouter} from 'next/navigation';
import {openModal, closeModal} from "@/redux/features/cart/cartSlice";

import Cookies from "js-cookie";

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
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(setCredentials({access_token: token}));
        }
    }, []);


    const data: IMenuItem[] = [
        {
            name: 'Menu Item 1', subMenu: [
                {
                    name: 'subMenuItem1',
                    itemImg: 'https://fastly.picsum.photos/id/322/64/64.jpg?hmac=GPBpScfDWKJl0C8fQNJAkjALeR3YbyIoR49Z9OXpe6A'
                },
                {
                    name: 'subMenuItem2',
                    itemImg: 'https://fastly.picsum.photos/id/322/64/64.jpg?hmac=GPBpScfDWKJl0C8fQNJAkjALeR3YbyIoR49Z9OXpe6A'
                },
                {
                    name: 'subMenuItem3',
                    itemImg: 'https://fastly.picsum.photos/id/322/64/64.jpg?hmac=GPBpScfDWKJl0C8fQNJAkjALeR3YbyIoR49Z9OXpe6A'
                },
                {
                    name: 'subMenuItem4',
                    itemImg: 'https://fastly.picsum.photos/id/322/64/64.jpg?hmac=GPBpScfDWKJl0C8fQNJAkjALeR3YbyIoR49Z9OXpe6A'
                },
                {
                    name: 'subMenuItem5',
                    itemImg: 'https://fastly.picsum.photos/id/322/64/64.jpg?hmac=GPBpScfDWKJl0C8fQNJAkjALeR3YbyIoR49Z9OXpe6A'
                },
                {
                    name: 'subMenuItem6',
                    itemImg: 'https://fastly.picsum.photos/id/322/64/64.jpg?hmac=GPBpScfDWKJl0C8fQNJAkjALeR3YbyIoR49Z9OXpe6A'
                },
            ]
        },
        {name: 'Menu Item 2'},
        {name: 'Menu Item 3'},
        {name: 'Menu Item 4'},
        {name: 'Menu Item 5'}
    ]

    const idPaths = path.split('/').splice(2).join('/');
    const idPaths2 = path.split('/').splice(3).join('/');

    const pages: IPage[] = [
        {
            name: 'Home',
            href: '/',
        },
        {
            name: 'Giriş Yap',
            href: '/login',
        },
        {
            name: 'Kayıt Ol',
            href: '/signup',
        },
        {
            name: 'Adreslerim',
            href: '/addresses',
        },
        {
            name: 'Adres Ekle',
            href: '/addresses/add-address',
        },
        {
            name: 'Şifremi Unuttum',
            href: '/forgot-password',
        },
        {
            name: 'Profil',
            href: '/profile',
        },
        {
            name: 'Ayarlar',
            href: '/profile/account-settings',
        },
        {
            name: 'Adres Düzenle',
            href: `/addresses/edit-address/${idPaths}`,
        },
        {
            name: 'Ürünler',
            href: `/categories/${idPaths}`,
        },
        {
            name: 'Ürün Detay',
            href: `/product-detail/${idPaths}`,
        },
        {
            name: 'Arama',
            href: `/search`,
        },
        {
            name: 'Sepet',
            href: `/cart`,
        },
        {
            name: 'Kuponlarım',
            href: `/my-coupons`,
        },
        {
            name: 'Iletisim Tercihleri',
            href: `/contact-prefs`,
        },
        {
            name: 'Bize Ulasin',
            href: `/contact-us`,
        },
        {
            name: 'Cok Sorulan Sorular',
            href: `/faq`,
        },
        {
            name: 'Sozlesmeler ve Politikalar',
            href: `/terms`,
        },
        {
            name: 'Bildirimler',
            href: `/notification`,
        },
        {
            name: 'Kampanyalar',
            href: `/campaigns`,
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
        }
    ]

    let currentPage = pages.find(page => page.href === path);

    return (
        <nav className='w-full bg-primary text-[16px]'>
            {isLoading ? <Loading/> : <div className="flex items-center justify-between p-4">
                <div className="">
                    {currentPage?.name === 'Home' || currentPage?.name === 'Kampanyalar' ? (
                        <div></div>
                    ) : currentPage?.name === 'Kampanya Detay' ? (
                        <div className="flex items-center">
                        <Image src={ICONS.closeOutlined} alt='goomart' className="h-[12px] w-[12px]"
                                 onClick={() => router.back()}/>
                        </div>
                    ): (
                        <div className="flex items-center">
                            <Image src={ICONS.leftArrow} alt='goomart' className="h-5 w-5"
                                   onClick={() => router.back()}/>
                        </div>
                    )}
                </div>
                <div className="text-white font-bold">
                    {currentPage?.name === 'Home' || currentPage?.name === 'Kampanyalar' ? (
                        <div className="">
                            <Link href='/'>
                                <Image
                                    src={ICONS.goomart}
                                    alt='goomart'
                                    width={100}
                                />
                            </Link>
                        </div>
                    ) : (
                        currentPage?.name
                    )}
                </div>
                {currentPage?.name === 'Home' ? <div className="flex items-center">
                    <Link href={`/notification`}>
                        <IoMdNotifications className='text-white' size={30} color={'#FFD306'}/>
                    </Link>
                </div> : currentPage?.name === 'Ürünler' ? <div className="flex justify-between items-center">
                    <SideBar data={data}/>
                </div> : currentPage?.name === 'Ürün Detay' ? <div className="flex justify-between items-center">
                    <Image src={ICONS.heart} alt='filter' width={20} height={19}/>
                </div> : currentPage?.name === 'Sepet' ?
                    <Image src={ICONS.trashWhite} alt='filter' width={20} height={19} onClick={() => {
                        dispatch(openModal());
                    }}/>
                    : <div className="flex justify-between items-center"></div>
                }
            </div>
            }
        </nav>
    );
};

export default NavBar;

