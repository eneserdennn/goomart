'use client'

import { useEffect, useState } from "react";

import { ICONS } from "@/constants/iconConstants";
import Image from 'next/image';
import { IoMdNotifications } from 'react-icons/io';
import Link from 'next/link';
import Loading from "@/app/loading";
import React from "react";
import SideBar from '../sidebar/SideBar';
import { setCredentials } from "@/redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import {AiFillFilter} from "react-icons/ai";

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
            dispatch(setCredentials({ access_token: token }));
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

    const idPaths = path.split('/').pop();

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
            href: `/products/${idPaths}`,
        },
        {
            name: 'Arama',
            href: `/search`,
        }

    ]

    let currentPage = pages.find(page => page.href === path);

    return (
        <nav className='w-full bg-primary'>
            {isLoading ? <Loading/> :  <div className="flex items-center justify-between p-4">
                <div className="">
                    {currentPage?.name === 'Home' ? (
                        <div></div>
                    ) : (
                        <div className="flex items-center">
                            <Image src={ICONS.leftArrow} alt='goomart' className="h-5 w-5" onClick={() => router.back()} />
                        </div>
                    )}
                </div>
                <div className="text-white font-bold text-xl">
                    {currentPage?.name === 'Home' ? (
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
                    <IoMdNotifications className='text-white' size={30} />
                </div> : currentPage?.name === 'Ürünler' ? <div className="flex justify-between items-center">

                    <SideBar data={data}/>
                </div> : <div className="flex items-center"></div>}

            </div>
            }
        </nav>
    );
};

export default NavBar;

