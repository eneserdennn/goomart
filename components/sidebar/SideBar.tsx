'use client'

import {FaAngleDown, FaTimes} from 'react-icons/fa'
import React, {useState} from 'react'

import {Switch} from "@headlessui/react";
import {GiHamburgerMenu} from 'react-icons/gi'
import Image from 'next/image';
import dynamic from 'next/dynamic';
import {ICONS} from "@/constants/iconConstants";

// @ts-ignore
const SideBar = ({data}) => {
    const [toggleSideBar, setToggleSideBar] = useState<boolean>(false);
    const [isToggled, setIsToggled] = useState(false);

    const handleTogglingSideBar = () => {
        setToggleSideBar(prev => !prev);
    }

    return (
        <>
            <Image src={ICONS.filter} alt={'filter'} className="h-8 w-8 bg-white p-1.5 rounded-md"
                   onClick={handleTogglingSideBar}/>
            <div
                className={`bg-white fixed right-0 top-0 bottom-0 w-4/5 md:w-1/5 h-screen z-50 transition-transform duration-300 ${
                    toggleSideBar ? 'translate-x-0' : 'translate-x-full'
                }`}>
                <div className="flex items-center justify-between pl-4 py-4 border-b bg-primary">
                    {/*<Image src={ICONS.leftArrow} alt='close' width={11} height={20} className="" onClick={handleTogglingSideBar} />*/}

                    <div className="flex-grow pl-10 flex items-center text-white text-[15px] font-bold justify-center">
              <span>
                Filtre
              </span>
                    </div>
                    <div className="flexitems-center text-white text-[14px] font-bold">
              <span>
                Temizle
              </span>
                    </div>
                    <div className={'opacity-0 pointer-events-none'}>
                        <GiHamburgerMenu size={30}/>
                    </div>
                </div>

                <div className="flex flex-col justify-center white h-[53px]">
                    <div className="flex flex-row justify-between px-3">
                        <span className="text-[14px]">Siralama</span>
                        <div className="flex flex-row items-center">
                            <span className="mr-3 text-[12px] text-deepgray">Önerilen</span>
                            <Image src={ICONS.rightArrow} alt={'right-arrow'} className="h-4 w-4"/>
                        </div>
                    </div>
                </div>
                <div className="flex w-full h-[2px] bg-gray-200"></div>


                <div className="flex flex-col justify-center white h-[53px]">
                    <div className="flex flex-row justify-between px-3">
                        <span className="text-[14px]">Markalar</span>
                        <div className="flex flex-row items-center">
                            <span className="mr-3 text-[12px] text-deepgray">Tümü</span>
                            <Image src={ICONS.rightArrow} alt={'right-arrow'} className="h-4 w-4"/>
                        </div>
                    </div>
                </div>
                <div className="flex w-full h-[2px] bg-gray-200"></div>

                <div className="flex flex-col justify-center white h-[53px]">
                    <div className="flex flex-row justify-between px-3">
                        <span className="text-[14px]">Ürün Çesidi</span>
                        <div className="flex flex-row items-center">
                            <span className="mr-3 text-[12px] text-deepgray">Tümü</span>
                            <Image src={ICONS.rightArrow} alt={'right-arrow'} className="h-4 w-4"/>
                        </div>
                    </div>
                </div>
                <div className="flex w-full h-[2px] bg-gray-200"></div>

                <div className="flex flex-col justify-center white h-[53px]">
                    <div className="flex flex-row justify-between px-3">
                        <div className="flex flex-row items-center justify-center">
                            <Image src={ICONS.percent} alt={'discount'} className="h-6 w-6 mr-4"/>
                            <span className="text-[14px]">İndirimli Ürünler</span>
                        </div>
                        <div className="flex flex-row items-center">
                            <Switch
                                as="div"
                                className={`relative inline-flex items-center h-3.5 rounded-full w-8 mr-4 cursor-pointer transition-colors ease-in-out duration-200 ${
                                    isToggled ? 'custom-bg-green' : 'bg-gray-400'
                                }`}
                                role="switch"
                                aria-checked={isToggled}
                                onClick={() => setIsToggled(!isToggled)}
                            >
                            <span
                                className={`${
                                    isToggled ? 'translate-x-4' : 'translate-x-0'
                                } inline-block w-5 h-5 transform bg-primary rounded-full transition-transform ease-in-out duration-200`}
                            />
                            </Switch>
                        </div>
                    </div>
                </div>

                <div className="flex w-full h-[2px] bg-gray-200"></div>

                <div className="fixed bottom-0 left-0 w-full bg-white ">
                    <div className="flex justify-center py-2">
                        <button
                            className="h-12 m-2 w-full bg-primary hover:bg-green-800 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-300"
                            type="submit"
                        >
                            Ürünleri Görüntüle (12 Ürün)
                        </button>
                    </div>
                </div>
            </div>
            {toggleSideBar && (<div onClick={() => setToggleSideBar(false)}
                                    className="fixed top-0 right-0 bg-black/[.54] w-full min-h-screen z-40"></div>)}
        </>
    )
}

export default SideBar


