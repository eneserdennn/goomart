'use client'

import {FaAngleDown, FaTimes} from 'react-icons/fa'
import React, {useEffect, useState} from 'react'

import {Switch} from "@headlessui/react";
import {GiHamburgerMenu} from 'react-icons/gi'
import Image from 'next/image';
import dynamic from 'next/dynamic';
import {ICONS} from "@/constants/iconConstants";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {useGetProductsAdvancedQueryQuery} from "@/redux/features/products/productApiSlice";
import {filteredList} from "@/redux/features/products/productFilterSlice";
import {IoMdCheckmark, IoMdRadioButtonOff, IoMdRadioButtonOn, IoMdSquareOutline} from "react-icons/io";

// @ts-ignore
const SideBar = ({data}) => {
    const dispatch = useDispatch();
    const [toggleSideBar, setToggleSideBar] = useState<boolean>(false);
    const [isToggled, setIsToggled] = useState(false);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedSort, setSelectedSort] = useState<string>('Önerilen');


    const pages = ['Main', 'Sıralama', 'Markalar', 'Ürün Çeşidi', 'İndirimli Ürünler'];
    const sorts = ['Önerilen', 'En Düşük Fiyat', 'En Yüksek Fiyat', 'Indirim oranına gore', 'En yeni'];

    const [selectedPage, setSelectedPage] = useState(pages[0]);

    const handleTogglingSideBar = () => {
        setToggleSideBar(prev => !prev);
    }

    const filtered = useSelector((state: RootState) => state.productFilter.isFilter);

    if (filtered) {
        const params = {
            "filter-product-type": useSelector((state: RootState) => state.category.selectedProductType.id),
        }

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const {data, isLoading, error} = useGetProductsAdvancedQueryQuery(params);
        dispatch(filteredList(data));
    }

    const brands = useSelector((state: RootState) => state.productFilter.brandNames);
    const CustomCheckbox = ({label, onCheckChange}) => {
        const [checked, setChecked] = useState(false);

        const handleCheckboxChange = () => {
            const newCheckedState = !checked;
            setChecked(newCheckedState);
            onCheckChange(label, newCheckedState);
        }

        return (
            <div className="flex bg-white flex-row items-center border-b h-[52px] px-[15px]"
                 onClick={handleCheckboxChange}>
                <div className="flex items-center w-full">
                    <div className="flex items-center">
                        <div className="flex flex-col">
                            {selectedBrands.includes(label) ? (
                                <Image src={ICONS.checkWhite} alt={'done'} width={20} height={20}
                                       className="bg-primary rounded-md"/>
                            ) : (
                                <div
                                    className="flex items-center justify-center border-2 border-[#969696] rounded-md h-[20px] w-[20px]">
                                </div>
                            )}
                        </div>
                    </div>
                    <span className="text-[14px] font-semibold ml-3">{label}</span>
                </div>
            </div>
        );
    };

    const CustomRadio = ({label}) => {
        return (
            <div className="flex bg-white flex-row items-center border-b h-[52px] px-[15px]" onClick={() => {
                    setSelectedSort(label)}}>
                <div className="flex ">
                    <div className="flex items-center">
                        {selectedSort === label ? (
                            <IoMdRadioButtonOn className="text-primary h-6 w-6"/>
                        ) : (
                            <IoMdRadioButtonOff className="text-gray-300 h-6 w-6"/>
                        )}
                    </div>
                </div>
                <div
                    className={`flex items-center w-full px-[15px]`}
                >
                    <span className="text-[14px] font-semibold">{label}</span>
                </div>
            </div>
        );
    };


    return (
        <>
            <Image src={ICONS.filter} alt={'filter'} className="h-8 w-8 bg-white p-1.5 rounded-md"
                   onClick={handleTogglingSideBar}/>
            <div
                className={`bg-white fixed right-0 top-0 bottom-0 w-4/5 md:w-1/5 h-screen z-50 transition-transform duration-300 ${
                    toggleSideBar ? 'translate-x-0' : 'translate-x-full'
                }`}>
                <div className="flex items-center justify-between pl-4 py-4 border-b bg-primary">
                    <Image src={ICONS.leftArrow} alt={'left-arrow'} width={11} height={20} onClick={() => {
                        setSelectedPage(pages[0]);
                    }}/>
                    <div className="flex-grow pl-10 flex items-center text-white text-[15px] font-bold justify-center">
              <span>
                Filtre
              </span>
                    </div>
                    <div className="flexitems-center text-white text-[14px] font-bold">
              <span onClick={() => {
                  setToggleSideBar(false);
                  setIsToggled(false);
                  setSelectedPage(pages[0]);
                  setSelectedBrands([]);
              }}>
                Temizle
              </span>
                    </div>
                    <div className={'opacity-0 pointer-events-none'}>
                        <GiHamburgerMenu size={30}/>
                    </div>
                </div>

                {selectedPage === pages[0] && (<>
                        <div className="flex flex-col justify-center white h-[53px]" onClick={() => {
                            setSelectedPage(pages[1]);
                        }}>
                            <div className="flex flex-row justify-between px-3">
                                <span className="text-[14px]">Siralama</span>
                                <div className="flex flex-row items-center">
                                    <span className="mr-3 text-[12px] text-deepgray">
                                        {selectedSort}
                                    </span>
                                    <Image src={ICONS.rightArrow} alt={'right-arrow'} className="h-4 w-4"/>
                                </div>
                            </div>
                        </div>
                        <div className="flex w-full h-[2px] bg-gray-200"></div>

                        <div className="flex flex-col justify-center white h-[53px]" onClick={() => {
                            setSelectedPage(pages[2]);
                        }}>
                            <div className="flex flex-row justify-between px-3">
                                <span className="text-[14px]">Markalar</span>
                                <div className="flex flex-row items-center">
                                    <span className="mr-3 text-[12px] text-deepgray">
                                        {selectedBrands.length > 0 ? `${selectedBrands.length} marka` : 'Tümü'}
                                    </span>
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
                    </>
                )}
                {selectedPage === pages[1] && (
                    <>
                        {sorts && sorts.map((sort) => (
                            <CustomRadio
                                label={sort}
                                key={sort}
                                onCheckChange={(sortName, isChecked) => {
                                    if (isChecked && !selectedSort.includes(sortName)) {
                                        setSelectedSort(prev => [...prev, sortName]);
                                    } else {
                                        setSelectedSort(prev => prev.filter(b => b !== sortName));
                                    }
                                }}
                            />
                        ))}
                    </>)}
                {selectedPage === pages[2] && (
                    <>
                        {brands && brands.map((brand) => (
                            <CustomCheckbox
                                key={brand}
                                label={brand}
                                onCheckChange={(brandName, isChecked) => {
                                    if (isChecked && !selectedBrands.includes(brandName)) {
                                        setSelectedBrands(prev => [...prev, brandName]);
                                    } else {
                                        setSelectedBrands(prev => prev.filter(b => b !== brandName));
                                    }
                                }}
                            />
                        ))}
                    </>
                )}
                <div className="flex w-full h-[2px] bg-gray-200"></div>
                <div className="fixed bottom-0 left-0 w-full bg-white ">
                    <div className="flex justify-center py-2">
                        <button
                            className="h-12 m-2 w-full bg-primary hover:bg-green-800 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-300"
                            type="submit"
                            onClick={() => {
                                setToggleSideBar(false);
                                setIsToggled(false);
                                setSelectedPage(pages[0]);

                            }}
                        >
                            {selectedPage === pages[0] ? 'Ürünleri Görüntüle (12 Ürün)' : 'Uygula'}
                        </button>
                    </div>
                </div>
            </div>
            {toggleSideBar && (<div onClick={() => setToggleSideBar(false)}
                                    className="fixed top-0 right-0 bg-black/[.54] w-full min-h-screen z-40"></div>
            )}
        </>
    )
}

export default SideBar


