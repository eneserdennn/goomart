'use client'

import {IoMdCheckmark, IoMdRadioButtonOff, IoMdRadioButtonOn, IoMdSquareOutline} from "react-icons/io";
import React, {useEffect, useState} from 'react'
import {
    isFiltered,
    isSearched,
    selectBrands,
    selectFilteredProductCount,
    selectFilteredProductTypes,
    selectFilteredProductWithBrands,
    selectIsFiltered,
    selectProductTypes,
    selectSortBy,
    setFilteredProductTypes,
    setProducts,
    setSelectedBrands,
    setSortBy
} from "@/redux/features/filter/filterSlice";
import {useDispatch, useSelector} from "react-redux";

import {GiHamburgerMenu} from 'react-icons/gi'
import {ICONS} from "@/constants/iconConstants";
import Image from 'next/image';
import {Switch} from "@headlessui/react";

// @ts-ignore
const SideBar = ({data}) => {
    const dispatch = useDispatch();
    const [toggleSideBar, setToggleSideBar] = useState<boolean>(false);
    const [isToggled, setIsToggled] = useState(false);
    const sortBys = useSelector(selectSortBy);
    const filteredProductCount = useSelector(selectFilteredProductCount);
    const [sortSelected, setSortSelected] = useState(sortBys);
    const selectedBrands = useSelector((state) => state.filter.selectedBrands);
    const [tempSelectedBrands, setTempSelectedBrands] = useState([...selectedBrands]);

    const filtered = useSelector(selectIsFiltered);
    const filteredProductWithBrands = useSelector(selectFilteredProductWithBrands);
    const allProductTypes = useSelector(selectProductTypes)
    const filteredProductTypes = useSelector(selectFilteredProductTypes)
    const [tempSelectedProductTypeList, setTempSelectedProductTypeList] = useState([]);


    const pages = ['Main', 'Sıralama', 'Markalar', 'Ürün Çeşidi', 'İndirimli Ürünler'];

    const sorts = [
        {
            name: 'Önerilen',
            value: 'default'
        },
        {
            name: 'En Düşük Fiyat',
            value: 'min-price'
        },
        {
            name: 'En Yüksek Fiyat',
            value: 'max-price'
        },
        {
            name: 'Indirim oranına gore',
            value: 'sale-percentage'
        },
        {
            name: 'En yeni',
            value: 'newest'
        }
    ]

    const [selectedPage, setSelectedPage] = useState(pages[0]);


    const handleTogglingSideBar = () => {
        setToggleSideBar(prev => !prev);
    }

    const brandList = useSelector(selectBrands);

    const handleBrandCheckChange = (brand) => {
        if (tempSelectedBrands.includes(brand)) {
            setTempSelectedBrands((prevBrands) => prevBrands.filter((b) => b !== brand));
        } else {
            setTempSelectedBrands((prevBrands) => [...prevBrands, brand]);
        }
    };

    const CustomCheckbox = ({label, isChecked, onCheckChange}) => {
        const [checked, setChecked] = useState(isChecked);

        useEffect(() => {
            setChecked(isChecked);
        }, [isChecked]);

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
                            {checked ? (
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


    const CustomRadio = ({label, value}) => {
        return (
            <div className="flex bg-white flex-row items-center border-b h-[52px] px-[15px]" onClick={() => {
                setSortSelected(value);
            }}>
                <div className="flex ">
                    <div className="flex items-center">
                        {sortSelected === value ? (
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
                className={`bg-white fixed right-0 top-0 bottom-0 w-4/5 md:w-1/5 h-screen z-50 transition-transform duration-300 ${toggleSideBar ? 'translate-x-0' : 'translate-x-full'}`}>

                <div className="flex items-center justify-between pl-4 py-4 border-b bg-primary">
                    <Image src={ICONS.leftArrow} alt={'left-arrow'} width={11} height={20} onClick={() => {
                        setSelectedPage(pages[0]);
                        setSortSelected(sortBys);
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
                  dispatch(setSelectedBrands([]));
                  dispatch(setSortBy('default'));
                  dispatch(isFiltered(false));
                  setTempSelectedBrands([]);
                  setTempSelectedProductTypeList([]);
                  dispatch(isSearched(false));
                  dispatch(setFilteredProductTypes([]));
              }}>
                Temizle
              </span>
                    </div>
                    <div className={'opacity-0 pointer-events-none'}>
                        <GiHamburgerMenu size={30}/>
                    </div>
                </div>
                <div className="overflow-y-auto"
                     style={{maxHeight: "calc(100% - 150px)"}}> {/* Buradaki 150px değeri header ve footer'ın toplam yüksekliği olarak varsayıldı. */}

                    {selectedPage === pages[0] && (<>
                            <div className="flex flex-col justify-center white h-[53px]" onClick={() => {
                                setSelectedPage(pages[1]);
                            }}>
                                <div className="flex flex-row justify-between px-3">
                                    <span className="text-[14px]">Siralama</span>
                                    <div className="flex flex-row items-center">
                                    <span className="mr-3 text-[12px] text-deepgray">
                                        {sortBys === 'default' ? 'Önerilen' : sortBys === 'min-price' ? 'En Düşük Fiyat' : sortBys === 'max-price' ? 'En Yüksek Fiyat' : sortBys === 'sale-percentage' ? 'Indirim oranına göre' : sortBys === 'newest' ? 'En yeni' : ''}
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
                                        {selectedBrands.length} marka
                                    </span>
                                        <Image src={ICONS.rightArrow} alt={'right-arrow'} className="h-4 w-4"/>
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-full h-[2px] bg-gray-200"></div>

                            <div className="flex flex-col justify-center white h-[53px]" onClick={
                                () => {
                                    setSelectedPage(pages[3]);
                                }
                            }>
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
                            {sorts.map((sort) => (
                                <CustomRadio
                                    key={sort.value}
                                    label={sort.name}
                                    value={sort.value}
                                />
                            ))}
                            <div className="fixed bottom-0 left-0 w-full bg-white ">
                                <div className="flex justify-center py-2">
                                    <button
                                        className="h-12 m-2 w-full bg-primary hover:bg-green-800 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-300"
                                        type="submit"
                                        onClick={() => {
                                            setSelectedPage(pages[0]);
                                            dispatch(isFiltered(true));
                                            dispatch(setSortBy(sortSelected));
                                        }}
                                    >
                                        Uygula
                                    </button>
                                </div>
                            </div>
                        </>

                    )}
                    {selectedPage === pages[2] && (
                        <>
                            {brandList.map((brand) => (
                                <CustomCheckbox
                                    key={brand.productTypeId}
                                    label={brand}
                                    isChecked={tempSelectedBrands.includes(brand)}
                                    onCheckChange={() => handleBrandCheckChange(brand)}
                                />
                            ))}
                            <div className="fixed bottom-0 left-0 w-full bg-white ">
                                <div className="flex justify-center py-2">
                                    <button
                                        className="h-12 m-2 w-full bg-primary hover:bg-green-800 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-300"
                                        type="submit"
                                        onClick={() => {
                                            dispatch(isFiltered(true));
                                            setSelectedPage(pages[0]);
                                            dispatch(setSelectedBrands([...tempSelectedBrands]));
                                        }}
                                    >
                                        Uygula
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                    {selectedPage === pages[3] && (
                        <>
                            {allProductTypes.map((productType) => (
                                <CustomCheckbox
                                    key={productType.id}
                                    label={productType.name}
                                    isChecked={tempSelectedProductTypeList.includes(productType)}
                                    onCheckChange={() => {
                                        if (tempSelectedProductTypeList.includes(productType)) {
                                            setTempSelectedProductTypeList((prevProductTypes) => prevProductTypes.filter((b) => b !== productType));
                                        } else {
                                            setTempSelectedProductTypeList((prevProductTypes) => [...prevProductTypes, productType]);
                                        }
                                    }}
                                />
                            ))}

                            <div className="fixed bottom-0 left-0 w-full bg-white ">
                                <div className="flex justify-center py-2">
                                    <button
                                        className="h-12 m-2 w-full bg-primary hover:bg-green-800 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-300"
                                        type="submit"
                                        onClick={() => {
                                            dispatch(isFiltered(true));
                                            setSelectedPage(pages[0]);
                                            dispatch(setFilteredProductTypes([...tempSelectedProductTypeList]));
                                        }}
                                    >
                                        Uygula
                                    </button>
                                </div>
                            </div>
                        </>
                    )
                    }
                </div>
                <div className="flex w-full h-[2px] bg-gray-200"></div>
                {selectedPage === pages[0] && (
                    <div className="fixed bottom-0 left-0 w-full bg-white ">
                        <div className="flex justify-center py-2">
                            <button
                                className="h-12 m-2 w-full bg-primary hover:bg-green-800 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-300"
                                type="submit"
                                onClick={() => {
                                    setToggleSideBar(false);
                                    setIsToggled(false);
                                    setSelectedPage(pages[0]);
                                    dispatch(isSearched(true));
                                }}
                            >
                                Ürünleri Görüntüle {filtered && <span>({filteredProductCount})</span>}
                            </button>
                        </div>
                    </div>
                )}
            </div>
            {toggleSideBar && (<div onClick={() => setToggleSideBar(false)}
                                    className="fixed top-0 right-0 bg-black/[.54] w-full min-h-screen z-40"></div>
            )}
        </>
    )
}

export default SideBar


