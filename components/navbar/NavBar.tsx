'use client'
import React from "react";
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { IoMdNotifications } from 'react-icons/io';

import { useGetProfileQuery } from "@/redux/api/authSlice";
import { setUser } from "@/redux/features/userSlice";
import { ICONS } from "@/constants/iconConstants";
import SideBar from '../sidebar/SideBar';
import Loading from "@/app/loading";

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
    const dispatch = useDispatch();

    const path = usePathname();

    const router = useRouter();

    useEffect(() => {
        const token: string | null = localStorage.getItem('token');
        setToken(token);
    }, []);

    // @ts-ignore
    const { data: profile, isLoading } = useGetProfileQuery(token);


    useEffect(() => {
        dispatch(
            setUser({
                name: profile?.name ?? '',
                surname: profile?.surname ?? '',
                email: profile?.email ?? '',
            })
        );
    }, [profile]);

    if (isLoading) {
        return <Loading />;
    }

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
            name: 'Teslimat Adresi',
            href: '/delivery-address',
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
            name: 'Hesap Ayarları',
            href: '/profile/account-settings',
        }
    ]

    const currentPage = pages.find(page => page.href === path);

    return (
        <nav className='w-full bg-primary'>
            {isLoading ? <Loading/> :  <div className="flex items-center justify-between p-4">
                <div className="">
                    {currentPage?.name === 'Home' ? (
                        <SideBar data={data} />
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
                                    src='/goomart.svg'
                                    alt='goomart'
                                    width={100}
                                    height={80}
                                />
                            </Link>
                        </div>
                    ) : (
                        currentPage?.name
                    )}
                </div>
                {currentPage?.name === 'Home' ? <div className="flex items-center">
                    <IoMdNotifications className='text-white' size={30} />
                </div> : <div className="flex items-center"></div>}
            </div>
            }
        </nav>
    );
};

export default NavBar;

