'use client'
import Image from 'next/image'
import {IoMdNotifications} from 'react-icons/io'
import Link from 'next/link'
import React from 'react'
import SideBar from '../sidebar/SideBar'
import dynamic from 'next/dynamic'
import {usePathname} from 'next/navigation';
import {IoChevronBack} from 'react-icons/io5';
import {useRouter} from 'next/navigation';

const NavBar = () => {
    const data = [
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

    const pages = [
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
        }
    ]

    const path = usePathname()
    const currentPage = pages.find(page => page.href === path);
    const router = useRouter()

    return (
        <nav className='w-full bg-primary'>
            <div className="flex items-center justify-between p-4">
                {
                    currentPage?.name === 'Home' ? <SideBar data={data}/> :
                        <div className="flex items-center">
                            <div onClick={() => router.back()} className="mr-4">
                                <IoChevronBack className='text-white' size={30} onc/>
                            </div>
                        </div>
                }
                <div className="text-white font-bold text-xl">
                    {/*{currentPage ? currentPage.name : "Page Name"}*/}
                    {currentPage?.name === 'Home' ? <div className=""><Link className='text-secondary' href='/'>
                        <Image
                            src='/goomart.svg'
                            alt='goomart'
                            width={100}
                            height={80}
                        />
                    </Link></div> : currentPage?.name}
                </div>
                <div className="">
                    {currentPage?.name === 'Home' ? <div className="flex items-center">
                            <IoMdNotifications className='text-white' size={30}/>
                        </div> :
                        <div className="flex items-center mr-6">
                        </div>
                    }
                </div>
            </div>
        </nav>
    )
}

export default NavBar
