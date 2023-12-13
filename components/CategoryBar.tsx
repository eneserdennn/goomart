"use client";

import React, { useEffect } from "react";
import {
  selectCategories,
  selectIsSearched,
  selectSelectedCategory,
  selectSelectedSubCategory,
  selectSubCategories,
  setCategories,
  setSelectedCategory,
  setSelectedSubCategory,
  setSubCategories,
} from "@/redux/features/filter/filterSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetCategoriesByIdQuery,
  useGetCategoriesQuery,
} from "@/redux/features/categories/categoriesApiSlice";
import Sale from "../assets/icons/sale.svg";
import Link from "next/link";
import Loading from "@/app/loading";
import { usePathname } from "next/navigation";
import { BiChevronRight, BiPlus, BiSearchAlt } from "react-icons/bi";
import { BsArrowDown } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { Disclosure } from "@headlessui/react";
import { IoSnowSharp } from "react-icons/io5";

interface ICategory {
  id: number;
  name: string;
  description: string;
  image: string;
  SubCategory: ISubCategory[];
}
interface ISubCategory {
  id: string;
  name: string;
  description: string;
  image: string;
}

interface IProductType {
  id: string;
  name: string;
  description: string;
  image: string;
}

interface CategoryBarCompProps {
  categoryId: number;
}
const CategoryCard = () => {
  return (
    <>
      {/* category cart start*/}
      <div className="inline-block w-[170px] relative z-50">
        <div className="w-[170px] h-[200px] rounded-[10px] border border-solid border-[#e2e2e2] relative z-40">
          {/** img tag
           * w-full h-full object-cover
           *
           */}
          <div className="absolute bottom-0 left-0">
            <IoSnowSharp className="text-[24px] ml-[10px] mb-[11px] text-[#59ABFF]" />
          </div>
          <div className="absolute -top-1 -left-[1px] bg-[#FFA81C] text-white w-20 h-[44px] rounded-br-[400rem] rounded-tl-[200rem] z-20   after:content-[''] after:bg-[#C66B00] after:z-10 after:w-[7px] after:h-[26px] after:absolute after:top-8 after:left-0 "></div>
        </div>
        <div className="flex justify-between items-center my-5 ">
          <span className="text-primary font-sans text-[15px] font-bold">
            15.99 €
          </span>
          <span className="text-[#B0B9C1] font-sans text-[15px] font-bold line-through">
            16.99 €
          </span>
        </div>
        <p className="font-bold break-words text-[17px]">
          Test Ürünü{" "}
          <span className="font-normal text-[16px]">
            Laktozsuz Dogal Sut 1L{" "}
          </span>
        </p>
        <div className="absolute flex items-center justify-center -top-[10px] -right-[10px] z-[60] bg-white w-[42px] h-[42px] rounded-full border-primary border-solid border-2">
          <button onClick={() => console.log("eklendi")}>
            <BiPlus className="text-[20px] text-primary font-extrabold" />
          </button>
        </div>
      </div>
      {/* category cart finish*/}
    </>
  );
};

const CategoryProductFilter = () => {
  return (
    <div className="shadow-2xl mb-[30px] ">
      <div className="bg-white h-[55px] w-full flex items-center px-[20px] border-b-2 ">
        <p className="font-semibold">Tüm Kategoriler</p>
      </div>
      <div className="mx-[15px] my-5 max-h-[600px] overflow-y-auto">
        <Disclosure>
          <Disclosure.Button className="w-full">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-[15px]">
                <div className="w-[42px] h-[42px] rounded-md border border-solid border-[#E2E2E2]">
                  {/**
                   * img tag
                   * w-full h-full object-cover
                   */}
                </div>
                <span className="text-[#333] font-bold text-[15px]">
                  Süt Ürünleri
                </span>
              </div>
              <IoIosArrowDown className="text-green-600" />
            </div>
          </Disclosure.Button>
          <Disclosure.Panel>
            <ul className="mx-[72px] my-4 ">
              <li className="mb-[25px] font-bold text-[15px]">Peynir</li>
              <li className="mb-[25px] font-bold text-[15px]">Yoğurt</li>
              <li className="mb-[25px] font-bold text-[15px]">Süt</li>
              <li className="mb-[25px] font-bold text-[15px]">Krema</li>
            </ul>
          </Disclosure.Panel>
        </Disclosure>
        <Disclosure>
          <Disclosure.Button className="w-full">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-[15px]">
                <div className="w-[42px] h-[42px] rounded-md border border-solid border-[#E2E2E2]">
                  {/**
                   * img tag
                   * w-full h-full object-cover
                   */}
                </div>
                <span className="text-[#333] font-bold text-[15px]">
                  Süt Ürünleri
                </span>
              </div>
              <IoIosArrowDown className="text-green-600" />
            </div>
          </Disclosure.Button>
          <Disclosure.Panel>
            <ul className="mx-[72px] my-4 ">
              <li className="mb-[25px] font-bold text-[15px]">Peynir</li>
              <li className="mb-[25px] font-bold text-[15px]">Yoğurt</li>
              <li className="mb-[25px] font-bold text-[15px]">Süt</li>
              <li className="mb-[25px] font-bold text-[15px]">Krema</li>
            </ul>
          </Disclosure.Panel>
        </Disclosure>
        <Disclosure>
          <Disclosure.Button className="w-full">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-[15px]">
                <div className="w-[42px] h-[42px] rounded-md border border-solid border-[#E2E2E2]">
                  {/**
                   * img tag
                   * w-full h-full object-cover
                   */}
                </div>
                <span className="text-[#333] font-bold text-[15px]">
                  Süt Ürünleri
                </span>
              </div>
              <IoIosArrowDown className="text-green-600" />
            </div>
          </Disclosure.Button>
          <Disclosure.Panel>
            <ul className="mx-[72px] my-4 ">
              <li className="mb-[25px] font-bold text-[15px]">Peynir</li>
              <li className="mb-[25px] font-bold text-[15px]">Yoğurt</li>
              <li className="mb-[25px] font-bold text-[15px]">Süt</li>
              <li className="mb-[25px] font-bold text-[15px]">Krema</li>
            </ul>
          </Disclosure.Panel>
        </Disclosure>
        <Disclosure>
          <Disclosure.Button className="w-full">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-[15px]">
                <div className="w-[42px] h-[42px] rounded-md border border-solid border-[#E2E2E2]">
                  {/**
                   * img tag
                   * w-full h-full object-cover
                   */}
                </div>
                <span className="text-[#333] font-bold text-[15px]">
                  Süt Ürünleri
                </span>
              </div>
              <IoIosArrowDown className="text-green-600" />
            </div>
          </Disclosure.Button>
          <Disclosure.Panel>
            <ul className="mx-[72px] my-4 ">
              <li className="mb-[25px] font-bold text-[15px]">Peynir</li>
              <li className="mb-[25px] font-bold text-[15px]">Yoğurt</li>
              <li className="mb-[25px] font-bold text-[15px]">Süt</li>
              <li className="mb-[25px] font-bold text-[15px]">Krema</li>
            </ul>
          </Disclosure.Panel>
        </Disclosure>
      </div>
    </div>
  );
};

const CategoryBrandFilter = () => {
  return (
    <div className="shadow-2xl mb-[30px]">
      <div className="bg-white h-[55px] w-full flex items-center px-[20px] border-b-2">
        <p className="font-semibold">Marka</p>
      </div>
      <div className="mx-[15px] my-5 pb-[30px] ">
        <ul>
          <li className="my-5">
            <div className="flex gap-x-[15px]">
              <input
                type="checkbox"
                id="some_id"
                className="
relative peer shrink-0
appearance-none w-4 h-4 border-2 border-gray-500 rounded-sm bg-white
mt-1
checked:bg-primary checked:border-0"
              />
              <label
                htmlFor="some_id"
                className="text-[15px] font-sans font-semibold leading-normal"
              >
                Ege Türk
              </label>
              <svg
                className="
absolute 
text-white
w-4 h-4 mt-1
hidden peer-checked:block"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill=""
                stroke="currentColor"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
          </li>
          <li className="my-5">
            <div className="flex gap-x-[15px]">
              <input
                type="checkbox"
                id="some_id"
                className="
relative peer shrink-0
appearance-none w-4 h-4 border-2 border-gray-500 rounded-sm bg-white
mt-1
checked:bg-primary checked:border-0"
              />
              <label
                htmlFor="some_id"
                className="text-[15px] font-sans font-semibold leading-normal"
              >
                Ege Türk
              </label>
              <svg
                className="
absolute 
text-white
w-4 h-4 mt-1
hidden peer-checked:block"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill=""
                stroke="currentColor"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};
const CategorySaleFilter = () => {
  return (
    <div className="shadow-2xl mb-[30px]">
      <div className="bg-white h-[55px] w-full flex items-center px-[20px] border-b-2">
        <p className="font-semibold">İndirimli Ürünler</p>
      </div>
      <div className="flex items-center justify-between p-5">
        <div className="flex gap-x-[15px]  ">
          <input
            type="checkbox"
            id="some_id"
            className="
relative peer shrink-0
appearance-none w-4 h-4 border-2 border-gray-500 rounded-sm bg-white
mt-1
checked:bg-primary checked:border-0"
          />
          <label
            htmlFor="some_id"
            className="text-[15px] font-sans font-semibold leading-normal pb-[5px]"
          >
            İndirimli Ürünler
          </label>
          <svg
            className="
absolute 
text-white
w-4 h-4 mt-1
hidden peer-checked:block"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill=""
            stroke="currentColor"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <svg
          width="23"
          height="24"
          viewBox="0 0 23 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="23" height="24" fill="#1E1E1E" />
          <g id="Kategoriler" clip-path="url(#clip0_80_2)">
            <rect
              width="1920"
              height="3228"
              transform="translate(-466 -1561)"
              fill="#FAFDFB"
            />
            <g id="Indirim filtre">
              <g id="Frame 37154" filter="url(#filter0_d_80_2)">
                <g clip-path="url(#clip1_80_2)">
                  <rect
                    x="-256"
                    y="-18"
                    width="298"
                    height="59"
                    rx="8"
                    fill="white"
                  />
                  <g id="Group 37337">
                    <g id="Discount Icon">
                      <path
                        id="Vector"
                        d="M23.7167 11.4256L22.6403 10.5996L23.4662 9.52321C23.7563 9.14524 23.6088 8.59503 23.1687 8.41269L21.9152 7.89348L22.4344 6.63998C22.6167 6.19982 22.3319 5.70649 21.8595 5.64434L20.5144 5.46726L20.6915 4.12205C20.7537 3.64973 20.3509 3.2469 19.8785 3.3091L19.3037 3.38477V20.616L19.8785 20.6917C20.3509 20.7539 20.7537 20.3511 20.6915 19.8787L20.5144 18.5336L21.8595 18.3565C22.3319 18.2943 22.6167 17.801 22.4344 17.3609L21.9152 16.1074L23.1687 15.5882C23.6088 15.4059 23.7563 14.8556 23.4662 14.4776L22.6403 13.4012L23.7167 12.5753C24.0947 12.2852 24.0947 11.7156 23.7167 11.4256Z"
                        fill="#148C00"
                      />
                      <path
                        id="Vector_2"
                        d="M18.3561 21.8594L18.5332 20.5142L19.3035 20.6156C19.5305 20.481 19.6787 20.1957 19.642 19.8783L19.4863 18.5332L20.669 18.3561C21.0844 18.2939 21.3348 17.8006 21.1745 17.3604L20.7179 16.1069L21.8201 15.5877C22.2071 15.4054 22.3367 14.8552 22.0817 14.4772L21.3555 13.4008L22.302 12.5748C22.6343 12.2848 22.6343 11.7152 22.302 11.4252L21.3555 10.5992L22.0817 9.52279C22.3367 9.14482 22.2071 8.59461 21.8201 8.41227L20.7179 7.89306L21.1745 6.63955C21.3348 6.19939 21.0844 5.70607 20.669 5.64392L19.4863 5.46684L19.642 4.12163C19.6787 3.80423 19.5305 3.51898 19.3035 3.38435L18.5331 3.4858L18.5179 3.37L18.356 2.14065C18.2938 1.66828 17.8005 1.38351 17.3603 1.56581L16.1068 2.08502L15.5876 0.831512C15.4053 0.391352 14.8551 0.243923 14.4771 0.533951L13.4007 1.3599L12.5748 0.283473C12.2848 -0.0944908 11.7152 -0.0944908 11.4252 0.283473L10.5992 1.3599L9.52279 0.533951C9.14482 0.243923 8.59461 0.391352 8.41227 0.831512L7.89306 2.08502L6.63955 1.56581C6.19939 1.38351 5.70607 1.66832 5.64392 2.14065L5.46684 3.4858L4.12168 3.30872C3.64931 3.24653 3.24653 3.64931 3.30873 4.12168L3.4858 5.46684L2.14065 5.64392C1.66832 5.70611 1.38346 6.19939 1.56581 6.63955L2.08502 7.89306L0.831512 8.41227C0.391352 8.59461 0.243923 9.14477 0.533951 9.52279L1.3599 10.5992L0.283473 11.4252C-0.0944908 11.7152 -0.0944908 12.2848 0.283473 12.5748L1.3599 13.4008L0.533951 14.4772C0.243923 14.8552 0.391352 15.4054 0.831512 15.5877L2.08502 16.1069L1.56581 17.3604C1.38346 17.8006 1.66828 18.2939 2.14065 18.3561L3.4858 18.5332L3.30873 19.8783C3.24653 20.3507 3.64931 20.7535 4.12168 20.6913L5.46684 20.5142L5.64392 21.8594C5.70612 22.3317 6.19939 22.6165 6.63955 22.4342L7.89306 21.915L8.41227 23.1685C8.59456 23.6086 9.14478 23.7561 9.52279 23.466L10.5992 22.6401L11.4252 23.7165C11.7152 24.0945 12.2848 24.0945 12.5748 23.7165L13.4008 22.6401L14.4772 23.466C14.8552 23.7561 15.4054 23.6086 15.5877 23.1685L16.1069 21.915L17.3604 22.4342C17.8006 22.6165 18.2939 22.3317 18.3561 21.8594Z"
                        fill="#148C00"
                      />
                      <g id="Group">
                        <path
                          id="Vector_3"
                          d="M15.5859 12.6885C13.9857 12.6885 12.6885 13.9857 12.6885 15.5859C12.6885 17.186 13.9857 18.4832 15.5859 18.4832C17.186 18.4832 18.4832 17.186 18.4832 15.5859C18.4832 13.9857 17.186 12.6885 15.5859 12.6885ZM15.5859 17.0345C14.7858 17.0345 14.1372 16.386 14.1372 15.5859C14.1372 14.7858 14.7858 14.1372 15.5859 14.1372C16.386 14.1372 17.0345 14.7858 17.0345 15.5859C17.0345 16.386 16.386 17.0345 15.5859 17.0345Z"
                          fill="white"
                        />
                        <path
                          id="Vector_4"
                          d="M8.41496 5.51758C6.81478 5.51758 5.51758 6.81478 5.51758 8.41496C5.51758 10.0151 6.81478 11.3123 8.41496 11.3123C10.0151 11.3123 11.3123 10.0151 11.3123 8.41496C11.3123 6.81478 10.0151 5.51758 8.41496 5.51758ZM8.41496 9.86365C7.6149 9.86365 6.96627 9.21507 6.96627 8.41496C6.96627 7.6149 7.6149 6.96627 8.41496 6.96627C9.21507 6.96627 9.86365 7.6149 9.86365 8.41496C9.86365 9.21507 9.21502 9.86365 8.41496 9.86365Z"
                          fill="white"
                        />
                        <path
                          id="Vector_5"
                          d="M6.72486 17.276C6.44198 16.9931 6.44198 16.5345 6.72486 16.2516L16.2516 6.72486C16.5345 6.44198 16.9931 6.44198 17.276 6.72486C17.5588 7.00774 17.5588 7.46634 17.276 7.74923L7.74923 17.276C7.46634 17.5588 7.00774 17.5588 6.72486 17.276Z"
                          fill="white"
                        />
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
          <defs>
            <filter
              id="filter0_d_80_2"
              x="-271"
              y="-29"
              width="328"
              height="89"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="7.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.541176 0 0 0 0 0.568627 0 0 0 0 0.643137 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_80_2"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_80_2"
                result="shape"
              />
            </filter>
            <clipPath id="clip0_80_2">
              <rect
                width="1920"
                height="3228"
                fill="white"
                transform="translate(-466 -1561)"
              />
            </clipPath>
            <clipPath id="clip1_80_2">
              <rect
                x="-256"
                y="-18"
                width="298"
                height="59"
                rx="8"
                fill="white"
              />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
};
const CategoryTypeFilter = () => {
  return (
    <div className="shadow-2xl mb-[30px]">
      <div className="bg-white h-[55px] w-full flex items-center px-[20px] border-b-2">
        <p className="font-semibold">İndirimli Ürünler</p>
      </div>
      <ul>
        <li>
          {" "}
          <div className="flex items-center justify-between p-5">
            <div className="flex gap-x-[15px]  ">
              <input
                type="checkbox"
                id="some_id"
                className="
relative peer shrink-0
appearance-none w-4 h-4 border-2 border-gray-500 rounded-sm bg-white
mt-1
checked:bg-primary checked:border-0"
              />
              <label
                htmlFor="some_id"
                className="text-[15px] font-sans font-semibold leading-normal pb-[5px]"
              >
                Dondurulmuş
              </label>
              <svg
                className="
absolute 
text-white
w-4 h-4 mt-1
hidden peer-checked:block"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill=""
                stroke="currentColor"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <svg
              width="23"
              height="24"
              viewBox="0 0 23 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="23" height="24" fill="#1E1E1E" />
              <g id="Kategoriler" clip-path="url(#clip0_80_2)">
                <rect
                  width="1920"
                  height="3228"
                  transform="translate(-466 -1561)"
                  fill="#FAFDFB"
                />
                <g id="Indirim filtre">
                  <g id="Frame 37154" filter="url(#filter0_d_80_2)">
                    <g clip-path="url(#clip1_80_2)">
                      <rect
                        x="-256"
                        y="-18"
                        width="298"
                        height="59"
                        rx="8"
                        fill="white"
                      />
                      <g id="Group 37337">
                        <g id="Discount Icon">
                          <path
                            id="Vector"
                            d="M23.7167 11.4256L22.6403 10.5996L23.4662 9.52321C23.7563 9.14524 23.6088 8.59503 23.1687 8.41269L21.9152 7.89348L22.4344 6.63998C22.6167 6.19982 22.3319 5.70649 21.8595 5.64434L20.5144 5.46726L20.6915 4.12205C20.7537 3.64973 20.3509 3.2469 19.8785 3.3091L19.3037 3.38477V20.616L19.8785 20.6917C20.3509 20.7539 20.7537 20.3511 20.6915 19.8787L20.5144 18.5336L21.8595 18.3565C22.3319 18.2943 22.6167 17.801 22.4344 17.3609L21.9152 16.1074L23.1687 15.5882C23.6088 15.4059 23.7563 14.8556 23.4662 14.4776L22.6403 13.4012L23.7167 12.5753C24.0947 12.2852 24.0947 11.7156 23.7167 11.4256Z"
                            fill="#148C00"
                          />
                          <path
                            id="Vector_2"
                            d="M18.3561 21.8594L18.5332 20.5142L19.3035 20.6156C19.5305 20.481 19.6787 20.1957 19.642 19.8783L19.4863 18.5332L20.669 18.3561C21.0844 18.2939 21.3348 17.8006 21.1745 17.3604L20.7179 16.1069L21.8201 15.5877C22.2071 15.4054 22.3367 14.8552 22.0817 14.4772L21.3555 13.4008L22.302 12.5748C22.6343 12.2848 22.6343 11.7152 22.302 11.4252L21.3555 10.5992L22.0817 9.52279C22.3367 9.14482 22.2071 8.59461 21.8201 8.41227L20.7179 7.89306L21.1745 6.63955C21.3348 6.19939 21.0844 5.70607 20.669 5.64392L19.4863 5.46684L19.642 4.12163C19.6787 3.80423 19.5305 3.51898 19.3035 3.38435L18.5331 3.4858L18.5179 3.37L18.356 2.14065C18.2938 1.66828 17.8005 1.38351 17.3603 1.56581L16.1068 2.08502L15.5876 0.831512C15.4053 0.391352 14.8551 0.243923 14.4771 0.533951L13.4007 1.3599L12.5748 0.283473C12.2848 -0.0944908 11.7152 -0.0944908 11.4252 0.283473L10.5992 1.3599L9.52279 0.533951C9.14482 0.243923 8.59461 0.391352 8.41227 0.831512L7.89306 2.08502L6.63955 1.56581C6.19939 1.38351 5.70607 1.66832 5.64392 2.14065L5.46684 3.4858L4.12168 3.30872C3.64931 3.24653 3.24653 3.64931 3.30873 4.12168L3.4858 5.46684L2.14065 5.64392C1.66832 5.70611 1.38346 6.19939 1.56581 6.63955L2.08502 7.89306L0.831512 8.41227C0.391352 8.59461 0.243923 9.14477 0.533951 9.52279L1.3599 10.5992L0.283473 11.4252C-0.0944908 11.7152 -0.0944908 12.2848 0.283473 12.5748L1.3599 13.4008L0.533951 14.4772C0.243923 14.8552 0.391352 15.4054 0.831512 15.5877L2.08502 16.1069L1.56581 17.3604C1.38346 17.8006 1.66828 18.2939 2.14065 18.3561L3.4858 18.5332L3.30873 19.8783C3.24653 20.3507 3.64931 20.7535 4.12168 20.6913L5.46684 20.5142L5.64392 21.8594C5.70612 22.3317 6.19939 22.6165 6.63955 22.4342L7.89306 21.915L8.41227 23.1685C8.59456 23.6086 9.14478 23.7561 9.52279 23.466L10.5992 22.6401L11.4252 23.7165C11.7152 24.0945 12.2848 24.0945 12.5748 23.7165L13.4008 22.6401L14.4772 23.466C14.8552 23.7561 15.4054 23.6086 15.5877 23.1685L16.1069 21.915L17.3604 22.4342C17.8006 22.6165 18.2939 22.3317 18.3561 21.8594Z"
                            fill="#148C00"
                          />
                          <g id="Group">
                            <path
                              id="Vector_3"
                              d="M15.5859 12.6885C13.9857 12.6885 12.6885 13.9857 12.6885 15.5859C12.6885 17.186 13.9857 18.4832 15.5859 18.4832C17.186 18.4832 18.4832 17.186 18.4832 15.5859C18.4832 13.9857 17.186 12.6885 15.5859 12.6885ZM15.5859 17.0345C14.7858 17.0345 14.1372 16.386 14.1372 15.5859C14.1372 14.7858 14.7858 14.1372 15.5859 14.1372C16.386 14.1372 17.0345 14.7858 17.0345 15.5859C17.0345 16.386 16.386 17.0345 15.5859 17.0345Z"
                              fill="white"
                            />
                            <path
                              id="Vector_4"
                              d="M8.41496 5.51758C6.81478 5.51758 5.51758 6.81478 5.51758 8.41496C5.51758 10.0151 6.81478 11.3123 8.41496 11.3123C10.0151 11.3123 11.3123 10.0151 11.3123 8.41496C11.3123 6.81478 10.0151 5.51758 8.41496 5.51758ZM8.41496 9.86365C7.6149 9.86365 6.96627 9.21507 6.96627 8.41496C6.96627 7.6149 7.6149 6.96627 8.41496 6.96627C9.21507 6.96627 9.86365 7.6149 9.86365 8.41496C9.86365 9.21507 9.21502 9.86365 8.41496 9.86365Z"
                              fill="white"
                            />
                            <path
                              id="Vector_5"
                              d="M6.72486 17.276C6.44198 16.9931 6.44198 16.5345 6.72486 16.2516L16.2516 6.72486C16.5345 6.44198 16.9931 6.44198 17.276 6.72486C17.5588 7.00774 17.5588 7.46634 17.276 7.74923L7.74923 17.276C7.46634 17.5588 7.00774 17.5588 6.72486 17.276Z"
                              fill="white"
                            />
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
              <defs>
                <filter
                  id="filter0_d_80_2"
                  x="-271"
                  y="-29"
                  width="328"
                  height="89"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="7.5" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.541176 0 0 0 0 0.568627 0 0 0 0 0.643137 0 0 0 0.25 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_80_2"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_80_2"
                    result="shape"
                  />
                </filter>
                <clipPath id="clip0_80_2">
                  <rect
                    width="1920"
                    height="3228"
                    fill="white"
                    transform="translate(-466 -1561)"
                  />
                </clipPath>
                <clipPath id="clip1_80_2">
                  <rect
                    x="-256"
                    y="-18"
                    width="298"
                    height="59"
                    rx="8"
                    fill="white"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
        </li>
        <li>
          {" "}
          <div className="flex items-center justify-between p-5">
            <div className="flex gap-x-[15px]  ">
              <input
                type="checkbox"
                id="some_id"
                className="
relative peer shrink-0
appearance-none w-4 h-4 border-2 border-gray-500 rounded-sm bg-white
mt-1
checked:bg-primary checked:border-0"
              />
              <label
                htmlFor="some_id"
                className="text-[15px] font-sans font-semibold leading-normal pb-[5px]"
              >
                Vegan
              </label>
              <svg
                className="
absolute 
text-white
w-4 h-4 mt-1
hidden peer-checked:block"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill=""
                stroke="currentColor"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <svg
              width="23"
              height="24"
              viewBox="0 0 23 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="23" height="24" fill="#1E1E1E" />
              <g id="Kategoriler" clip-path="url(#clip0_80_2)">
                <rect
                  width="1920"
                  height="3228"
                  transform="translate(-466 -1561)"
                  fill="#FAFDFB"
                />
                <g id="Indirim filtre">
                  <g id="Frame 37154" filter="url(#filter0_d_80_2)">
                    <g clip-path="url(#clip1_80_2)">
                      <rect
                        x="-256"
                        y="-18"
                        width="298"
                        height="59"
                        rx="8"
                        fill="white"
                      />
                      <g id="Group 37337">
                        <g id="Discount Icon">
                          <path
                            id="Vector"
                            d="M23.7167 11.4256L22.6403 10.5996L23.4662 9.52321C23.7563 9.14524 23.6088 8.59503 23.1687 8.41269L21.9152 7.89348L22.4344 6.63998C22.6167 6.19982 22.3319 5.70649 21.8595 5.64434L20.5144 5.46726L20.6915 4.12205C20.7537 3.64973 20.3509 3.2469 19.8785 3.3091L19.3037 3.38477V20.616L19.8785 20.6917C20.3509 20.7539 20.7537 20.3511 20.6915 19.8787L20.5144 18.5336L21.8595 18.3565C22.3319 18.2943 22.6167 17.801 22.4344 17.3609L21.9152 16.1074L23.1687 15.5882C23.6088 15.4059 23.7563 14.8556 23.4662 14.4776L22.6403 13.4012L23.7167 12.5753C24.0947 12.2852 24.0947 11.7156 23.7167 11.4256Z"
                            fill="#148C00"
                          />
                          <path
                            id="Vector_2"
                            d="M18.3561 21.8594L18.5332 20.5142L19.3035 20.6156C19.5305 20.481 19.6787 20.1957 19.642 19.8783L19.4863 18.5332L20.669 18.3561C21.0844 18.2939 21.3348 17.8006 21.1745 17.3604L20.7179 16.1069L21.8201 15.5877C22.2071 15.4054 22.3367 14.8552 22.0817 14.4772L21.3555 13.4008L22.302 12.5748C22.6343 12.2848 22.6343 11.7152 22.302 11.4252L21.3555 10.5992L22.0817 9.52279C22.3367 9.14482 22.2071 8.59461 21.8201 8.41227L20.7179 7.89306L21.1745 6.63955C21.3348 6.19939 21.0844 5.70607 20.669 5.64392L19.4863 5.46684L19.642 4.12163C19.6787 3.80423 19.5305 3.51898 19.3035 3.38435L18.5331 3.4858L18.5179 3.37L18.356 2.14065C18.2938 1.66828 17.8005 1.38351 17.3603 1.56581L16.1068 2.08502L15.5876 0.831512C15.4053 0.391352 14.8551 0.243923 14.4771 0.533951L13.4007 1.3599L12.5748 0.283473C12.2848 -0.0944908 11.7152 -0.0944908 11.4252 0.283473L10.5992 1.3599L9.52279 0.533951C9.14482 0.243923 8.59461 0.391352 8.41227 0.831512L7.89306 2.08502L6.63955 1.56581C6.19939 1.38351 5.70607 1.66832 5.64392 2.14065L5.46684 3.4858L4.12168 3.30872C3.64931 3.24653 3.24653 3.64931 3.30873 4.12168L3.4858 5.46684L2.14065 5.64392C1.66832 5.70611 1.38346 6.19939 1.56581 6.63955L2.08502 7.89306L0.831512 8.41227C0.391352 8.59461 0.243923 9.14477 0.533951 9.52279L1.3599 10.5992L0.283473 11.4252C-0.0944908 11.7152 -0.0944908 12.2848 0.283473 12.5748L1.3599 13.4008L0.533951 14.4772C0.243923 14.8552 0.391352 15.4054 0.831512 15.5877L2.08502 16.1069L1.56581 17.3604C1.38346 17.8006 1.66828 18.2939 2.14065 18.3561L3.4858 18.5332L3.30873 19.8783C3.24653 20.3507 3.64931 20.7535 4.12168 20.6913L5.46684 20.5142L5.64392 21.8594C5.70612 22.3317 6.19939 22.6165 6.63955 22.4342L7.89306 21.915L8.41227 23.1685C8.59456 23.6086 9.14478 23.7561 9.52279 23.466L10.5992 22.6401L11.4252 23.7165C11.7152 24.0945 12.2848 24.0945 12.5748 23.7165L13.4008 22.6401L14.4772 23.466C14.8552 23.7561 15.4054 23.6086 15.5877 23.1685L16.1069 21.915L17.3604 22.4342C17.8006 22.6165 18.2939 22.3317 18.3561 21.8594Z"
                            fill="#148C00"
                          />
                          <g id="Group">
                            <path
                              id="Vector_3"
                              d="M15.5859 12.6885C13.9857 12.6885 12.6885 13.9857 12.6885 15.5859C12.6885 17.186 13.9857 18.4832 15.5859 18.4832C17.186 18.4832 18.4832 17.186 18.4832 15.5859C18.4832 13.9857 17.186 12.6885 15.5859 12.6885ZM15.5859 17.0345C14.7858 17.0345 14.1372 16.386 14.1372 15.5859C14.1372 14.7858 14.7858 14.1372 15.5859 14.1372C16.386 14.1372 17.0345 14.7858 17.0345 15.5859C17.0345 16.386 16.386 17.0345 15.5859 17.0345Z"
                              fill="white"
                            />
                            <path
                              id="Vector_4"
                              d="M8.41496 5.51758C6.81478 5.51758 5.51758 6.81478 5.51758 8.41496C5.51758 10.0151 6.81478 11.3123 8.41496 11.3123C10.0151 11.3123 11.3123 10.0151 11.3123 8.41496C11.3123 6.81478 10.0151 5.51758 8.41496 5.51758ZM8.41496 9.86365C7.6149 9.86365 6.96627 9.21507 6.96627 8.41496C6.96627 7.6149 7.6149 6.96627 8.41496 6.96627C9.21507 6.96627 9.86365 7.6149 9.86365 8.41496C9.86365 9.21507 9.21502 9.86365 8.41496 9.86365Z"
                              fill="white"
                            />
                            <path
                              id="Vector_5"
                              d="M6.72486 17.276C6.44198 16.9931 6.44198 16.5345 6.72486 16.2516L16.2516 6.72486C16.5345 6.44198 16.9931 6.44198 17.276 6.72486C17.5588 7.00774 17.5588 7.46634 17.276 7.74923L7.74923 17.276C7.46634 17.5588 7.00774 17.5588 6.72486 17.276Z"
                              fill="white"
                            />
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
              <defs>
                <filter
                  id="filter0_d_80_2"
                  x="-271"
                  y="-29"
                  width="328"
                  height="89"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="7.5" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.541176 0 0 0 0 0.568627 0 0 0 0 0.643137 0 0 0 0.25 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_80_2"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_80_2"
                    result="shape"
                  />
                </filter>
                <clipPath id="clip0_80_2">
                  <rect
                    width="1920"
                    height="3228"
                    fill="white"
                    transform="translate(-466 -1561)"
                  />
                </clipPath>
                <clipPath id="clip1_80_2">
                  <rect
                    x="-256"
                    y="-18"
                    width="298"
                    height="59"
                    rx="8"
                    fill="white"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
        </li>
        <li>
          {" "}
          <div className="flex items-center justify-between p-5">
            <div className="flex gap-x-[15px]  ">
              <input
                type="checkbox"
                id="some_id"
                className="
relative peer shrink-0
appearance-none w-4 h-4 border-2 border-gray-500 rounded-sm bg-white
mt-1
checked:bg-primary checked:border-0"
              />
              <label
                htmlFor="some_id"
                className="text-[15px] font-sans font-semibold leading-normal pb-[5px]"
              >
                Bio
              </label>
              <svg
                className="
absolute 
text-white
w-4 h-4 mt-1
hidden peer-checked:block"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill=""
                stroke="currentColor"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <svg
              width="23"
              height="24"
              viewBox="0 0 23 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="23" height="24" fill="#1E1E1E" />
              <g id="Kategoriler" clip-path="url(#clip0_80_2)">
                <rect
                  width="1920"
                  height="3228"
                  transform="translate(-466 -1561)"
                  fill="#FAFDFB"
                />
                <g id="Indirim filtre">
                  <g id="Frame 37154" filter="url(#filter0_d_80_2)">
                    <g clip-path="url(#clip1_80_2)">
                      <rect
                        x="-256"
                        y="-18"
                        width="298"
                        height="59"
                        rx="8"
                        fill="white"
                      />
                      <g id="Group 37337">
                        <g id="Discount Icon">
                          <path
                            id="Vector"
                            d="M23.7167 11.4256L22.6403 10.5996L23.4662 9.52321C23.7563 9.14524 23.6088 8.59503 23.1687 8.41269L21.9152 7.89348L22.4344 6.63998C22.6167 6.19982 22.3319 5.70649 21.8595 5.64434L20.5144 5.46726L20.6915 4.12205C20.7537 3.64973 20.3509 3.2469 19.8785 3.3091L19.3037 3.38477V20.616L19.8785 20.6917C20.3509 20.7539 20.7537 20.3511 20.6915 19.8787L20.5144 18.5336L21.8595 18.3565C22.3319 18.2943 22.6167 17.801 22.4344 17.3609L21.9152 16.1074L23.1687 15.5882C23.6088 15.4059 23.7563 14.8556 23.4662 14.4776L22.6403 13.4012L23.7167 12.5753C24.0947 12.2852 24.0947 11.7156 23.7167 11.4256Z"
                            fill="#148C00"
                          />
                          <path
                            id="Vector_2"
                            d="M18.3561 21.8594L18.5332 20.5142L19.3035 20.6156C19.5305 20.481 19.6787 20.1957 19.642 19.8783L19.4863 18.5332L20.669 18.3561C21.0844 18.2939 21.3348 17.8006 21.1745 17.3604L20.7179 16.1069L21.8201 15.5877C22.2071 15.4054 22.3367 14.8552 22.0817 14.4772L21.3555 13.4008L22.302 12.5748C22.6343 12.2848 22.6343 11.7152 22.302 11.4252L21.3555 10.5992L22.0817 9.52279C22.3367 9.14482 22.2071 8.59461 21.8201 8.41227L20.7179 7.89306L21.1745 6.63955C21.3348 6.19939 21.0844 5.70607 20.669 5.64392L19.4863 5.46684L19.642 4.12163C19.6787 3.80423 19.5305 3.51898 19.3035 3.38435L18.5331 3.4858L18.5179 3.37L18.356 2.14065C18.2938 1.66828 17.8005 1.38351 17.3603 1.56581L16.1068 2.08502L15.5876 0.831512C15.4053 0.391352 14.8551 0.243923 14.4771 0.533951L13.4007 1.3599L12.5748 0.283473C12.2848 -0.0944908 11.7152 -0.0944908 11.4252 0.283473L10.5992 1.3599L9.52279 0.533951C9.14482 0.243923 8.59461 0.391352 8.41227 0.831512L7.89306 2.08502L6.63955 1.56581C6.19939 1.38351 5.70607 1.66832 5.64392 2.14065L5.46684 3.4858L4.12168 3.30872C3.64931 3.24653 3.24653 3.64931 3.30873 4.12168L3.4858 5.46684L2.14065 5.64392C1.66832 5.70611 1.38346 6.19939 1.56581 6.63955L2.08502 7.89306L0.831512 8.41227C0.391352 8.59461 0.243923 9.14477 0.533951 9.52279L1.3599 10.5992L0.283473 11.4252C-0.0944908 11.7152 -0.0944908 12.2848 0.283473 12.5748L1.3599 13.4008L0.533951 14.4772C0.243923 14.8552 0.391352 15.4054 0.831512 15.5877L2.08502 16.1069L1.56581 17.3604C1.38346 17.8006 1.66828 18.2939 2.14065 18.3561L3.4858 18.5332L3.30873 19.8783C3.24653 20.3507 3.64931 20.7535 4.12168 20.6913L5.46684 20.5142L5.64392 21.8594C5.70612 22.3317 6.19939 22.6165 6.63955 22.4342L7.89306 21.915L8.41227 23.1685C8.59456 23.6086 9.14478 23.7561 9.52279 23.466L10.5992 22.6401L11.4252 23.7165C11.7152 24.0945 12.2848 24.0945 12.5748 23.7165L13.4008 22.6401L14.4772 23.466C14.8552 23.7561 15.4054 23.6086 15.5877 23.1685L16.1069 21.915L17.3604 22.4342C17.8006 22.6165 18.2939 22.3317 18.3561 21.8594Z"
                            fill="#148C00"
                          />
                          <g id="Group">
                            <path
                              id="Vector_3"
                              d="M15.5859 12.6885C13.9857 12.6885 12.6885 13.9857 12.6885 15.5859C12.6885 17.186 13.9857 18.4832 15.5859 18.4832C17.186 18.4832 18.4832 17.186 18.4832 15.5859C18.4832 13.9857 17.186 12.6885 15.5859 12.6885ZM15.5859 17.0345C14.7858 17.0345 14.1372 16.386 14.1372 15.5859C14.1372 14.7858 14.7858 14.1372 15.5859 14.1372C16.386 14.1372 17.0345 14.7858 17.0345 15.5859C17.0345 16.386 16.386 17.0345 15.5859 17.0345Z"
                              fill="white"
                            />
                            <path
                              id="Vector_4"
                              d="M8.41496 5.51758C6.81478 5.51758 5.51758 6.81478 5.51758 8.41496C5.51758 10.0151 6.81478 11.3123 8.41496 11.3123C10.0151 11.3123 11.3123 10.0151 11.3123 8.41496C11.3123 6.81478 10.0151 5.51758 8.41496 5.51758ZM8.41496 9.86365C7.6149 9.86365 6.96627 9.21507 6.96627 8.41496C6.96627 7.6149 7.6149 6.96627 8.41496 6.96627C9.21507 6.96627 9.86365 7.6149 9.86365 8.41496C9.86365 9.21507 9.21502 9.86365 8.41496 9.86365Z"
                              fill="white"
                            />
                            <path
                              id="Vector_5"
                              d="M6.72486 17.276C6.44198 16.9931 6.44198 16.5345 6.72486 16.2516L16.2516 6.72486C16.5345 6.44198 16.9931 6.44198 17.276 6.72486C17.5588 7.00774 17.5588 7.46634 17.276 7.74923L7.74923 17.276C7.46634 17.5588 7.00774 17.5588 6.72486 17.276Z"
                              fill="white"
                            />
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
              <defs>
                <filter
                  id="filter0_d_80_2"
                  x="-271"
                  y="-29"
                  width="328"
                  height="89"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="7.5" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.541176 0 0 0 0 0.568627 0 0 0 0 0.643137 0 0 0 0.25 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_80_2"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_80_2"
                    result="shape"
                  />
                </filter>
                <clipPath id="clip0_80_2">
                  <rect
                    width="1920"
                    height="3228"
                    fill="white"
                    transform="translate(-466 -1561)"
                  />
                </clipPath>
                <clipPath id="clip1_80_2">
                  <rect
                    x="-256"
                    y="-18"
                    width="298"
                    height="59"
                    rx="8"
                    fill="white"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
        </li>
        <li>
          {" "}
          <div className="flex items-center justify-between p-5">
            <div className="flex gap-x-[15px]  ">
              <input
                type="checkbox"
                id="some_id"
                className="
relative peer shrink-0
appearance-none w-4 h-4 border-2 border-gray-500 rounded-sm bg-white
mt-1
checked:bg-primary checked:border-0"
              />
              <label
                htmlFor="some_id"
                className="text-[15px] font-sans font-semibold leading-normal pb-[5px]"
              >
                Laktozsuz
              </label>
              <svg
                className="
absolute 
text-white
w-4 h-4 mt-1
hidden peer-checked:block"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill=""
                stroke="currentColor"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <svg
              width="23"
              height="24"
              viewBox="0 0 23 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="23" height="24" fill="#1E1E1E" />
              <g id="Kategoriler" clip-path="url(#clip0_80_2)">
                <rect
                  width="1920"
                  height="3228"
                  transform="translate(-466 -1561)"
                  fill="#FAFDFB"
                />
                <g id="Indirim filtre">
                  <g id="Frame 37154" filter="url(#filter0_d_80_2)">
                    <g clip-path="url(#clip1_80_2)">
                      <rect
                        x="-256"
                        y="-18"
                        width="298"
                        height="59"
                        rx="8"
                        fill="white"
                      />
                      <g id="Group 37337">
                        <g id="Discount Icon">
                          <path
                            id="Vector"
                            d="M23.7167 11.4256L22.6403 10.5996L23.4662 9.52321C23.7563 9.14524 23.6088 8.59503 23.1687 8.41269L21.9152 7.89348L22.4344 6.63998C22.6167 6.19982 22.3319 5.70649 21.8595 5.64434L20.5144 5.46726L20.6915 4.12205C20.7537 3.64973 20.3509 3.2469 19.8785 3.3091L19.3037 3.38477V20.616L19.8785 20.6917C20.3509 20.7539 20.7537 20.3511 20.6915 19.8787L20.5144 18.5336L21.8595 18.3565C22.3319 18.2943 22.6167 17.801 22.4344 17.3609L21.9152 16.1074L23.1687 15.5882C23.6088 15.4059 23.7563 14.8556 23.4662 14.4776L22.6403 13.4012L23.7167 12.5753C24.0947 12.2852 24.0947 11.7156 23.7167 11.4256Z"
                            fill="#148C00"
                          />
                          <path
                            id="Vector_2"
                            d="M18.3561 21.8594L18.5332 20.5142L19.3035 20.6156C19.5305 20.481 19.6787 20.1957 19.642 19.8783L19.4863 18.5332L20.669 18.3561C21.0844 18.2939 21.3348 17.8006 21.1745 17.3604L20.7179 16.1069L21.8201 15.5877C22.2071 15.4054 22.3367 14.8552 22.0817 14.4772L21.3555 13.4008L22.302 12.5748C22.6343 12.2848 22.6343 11.7152 22.302 11.4252L21.3555 10.5992L22.0817 9.52279C22.3367 9.14482 22.2071 8.59461 21.8201 8.41227L20.7179 7.89306L21.1745 6.63955C21.3348 6.19939 21.0844 5.70607 20.669 5.64392L19.4863 5.46684L19.642 4.12163C19.6787 3.80423 19.5305 3.51898 19.3035 3.38435L18.5331 3.4858L18.5179 3.37L18.356 2.14065C18.2938 1.66828 17.8005 1.38351 17.3603 1.56581L16.1068 2.08502L15.5876 0.831512C15.4053 0.391352 14.8551 0.243923 14.4771 0.533951L13.4007 1.3599L12.5748 0.283473C12.2848 -0.0944908 11.7152 -0.0944908 11.4252 0.283473L10.5992 1.3599L9.52279 0.533951C9.14482 0.243923 8.59461 0.391352 8.41227 0.831512L7.89306 2.08502L6.63955 1.56581C6.19939 1.38351 5.70607 1.66832 5.64392 2.14065L5.46684 3.4858L4.12168 3.30872C3.64931 3.24653 3.24653 3.64931 3.30873 4.12168L3.4858 5.46684L2.14065 5.64392C1.66832 5.70611 1.38346 6.19939 1.56581 6.63955L2.08502 7.89306L0.831512 8.41227C0.391352 8.59461 0.243923 9.14477 0.533951 9.52279L1.3599 10.5992L0.283473 11.4252C-0.0944908 11.7152 -0.0944908 12.2848 0.283473 12.5748L1.3599 13.4008L0.533951 14.4772C0.243923 14.8552 0.391352 15.4054 0.831512 15.5877L2.08502 16.1069L1.56581 17.3604C1.38346 17.8006 1.66828 18.2939 2.14065 18.3561L3.4858 18.5332L3.30873 19.8783C3.24653 20.3507 3.64931 20.7535 4.12168 20.6913L5.46684 20.5142L5.64392 21.8594C5.70612 22.3317 6.19939 22.6165 6.63955 22.4342L7.89306 21.915L8.41227 23.1685C8.59456 23.6086 9.14478 23.7561 9.52279 23.466L10.5992 22.6401L11.4252 23.7165C11.7152 24.0945 12.2848 24.0945 12.5748 23.7165L13.4008 22.6401L14.4772 23.466C14.8552 23.7561 15.4054 23.6086 15.5877 23.1685L16.1069 21.915L17.3604 22.4342C17.8006 22.6165 18.2939 22.3317 18.3561 21.8594Z"
                            fill="#148C00"
                          />
                          <g id="Group">
                            <path
                              id="Vector_3"
                              d="M15.5859 12.6885C13.9857 12.6885 12.6885 13.9857 12.6885 15.5859C12.6885 17.186 13.9857 18.4832 15.5859 18.4832C17.186 18.4832 18.4832 17.186 18.4832 15.5859C18.4832 13.9857 17.186 12.6885 15.5859 12.6885ZM15.5859 17.0345C14.7858 17.0345 14.1372 16.386 14.1372 15.5859C14.1372 14.7858 14.7858 14.1372 15.5859 14.1372C16.386 14.1372 17.0345 14.7858 17.0345 15.5859C17.0345 16.386 16.386 17.0345 15.5859 17.0345Z"
                              fill="white"
                            />
                            <path
                              id="Vector_4"
                              d="M8.41496 5.51758C6.81478 5.51758 5.51758 6.81478 5.51758 8.41496C5.51758 10.0151 6.81478 11.3123 8.41496 11.3123C10.0151 11.3123 11.3123 10.0151 11.3123 8.41496C11.3123 6.81478 10.0151 5.51758 8.41496 5.51758ZM8.41496 9.86365C7.6149 9.86365 6.96627 9.21507 6.96627 8.41496C6.96627 7.6149 7.6149 6.96627 8.41496 6.96627C9.21507 6.96627 9.86365 7.6149 9.86365 8.41496C9.86365 9.21507 9.21502 9.86365 8.41496 9.86365Z"
                              fill="white"
                            />
                            <path
                              id="Vector_5"
                              d="M6.72486 17.276C6.44198 16.9931 6.44198 16.5345 6.72486 16.2516L16.2516 6.72486C16.5345 6.44198 16.9931 6.44198 17.276 6.72486C17.5588 7.00774 17.5588 7.46634 17.276 7.74923L7.74923 17.276C7.46634 17.5588 7.00774 17.5588 6.72486 17.276Z"
                              fill="white"
                            />
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
              <defs>
                <filter
                  id="filter0_d_80_2"
                  x="-271"
                  y="-29"
                  width="328"
                  height="89"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="7.5" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.541176 0 0 0 0 0.568627 0 0 0 0 0.643137 0 0 0 0.25 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_80_2"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_80_2"
                    result="shape"
                  />
                </filter>
                <clipPath id="clip0_80_2">
                  <rect
                    width="1920"
                    height="3228"
                    fill="white"
                    transform="translate(-466 -1561)"
                  />
                </clipPath>
                <clipPath id="clip1_80_2">
                  <rect
                    x="-256"
                    y="-18"
                    width="298"
                    height="59"
                    rx="8"
                    fill="white"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
        </li>
      </ul>
    </div>
  );
};

const CategoryBarComp = ({ categoryId }: CategoryBarCompProps) => {
  const { data, isLoading, isSuccess, isError, error } =
    useGetCategoriesByIdQuery(categoryId);

  const pathname = usePathname();
  const path = pathname.split("/");

  const {
    data: categoriesData,
    isLoading: isLoadingCategories,
    isSuccess: isSuccessCategories,
    isError: isErrorCategories,
    error: errorCategories,
  } = useGetCategoriesQuery({});

  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(setSelectedCategory(data));
    }
  }, [data, dispatch]);

  const categories = useSelector(selectCategories);
  const category = useSelector(selectSelectedCategory);
  const subCategories = useSelector(selectSubCategories);
  const selectedSubCategory = useSelector(selectSelectedSubCategory);

  const isSearched = useSelector(selectIsSearched);

  useEffect(() => {
    dispatch(setSelectedSubCategory(subCategories[0]));
  }, [category, subCategories]);

  useEffect(() => {
    if (category?.SubCategory) {
      dispatch(setSubCategories(category.SubCategory));
    }
  }, [category, dispatch]);

  useEffect(() => {
    if (isSuccessCategories && categoriesData.length > 0) {
      dispatch(setCategories(categoriesData));
    }
    console.log(categories);
  }, [categoriesData, isSuccessCategories, dispatch]);

  if (isLoading || isLoadingCategories) {
    return <Loading />;
  }

  if (isError) {
    return (
      <div>
        <h1>Something went wrong!</h1>
      </div>
    );
  }

  if (isSuccess && category) {
    const SubCategory = subCategories;
    if (!selectedSubCategory?.id) {
      dispatch(setSelectedSubCategory(SubCategory[0]));
    }
    const ConvertCategoryName = (name: string) => {
      name = name.toLocaleLowerCase().replace(/ /g, "-");
      name = name.replace(/ı/g, "i");
      name = name.replace(/ö/g, "o");
      name = name.replace(/ü/g, "u");
      name = name.replace(/ş/g, "s");
      name = name.replace(/ç/g, "c");
      name = name.replace(/ğ/g, "g");
      return name;
    };

    return (
      <>
        <div className="sticky top-0 z-10 bg-white lg:hidden">
          <div className="flex overflow-x-auto h-[37px] items-center bg-[#25AC10] font-bold text-[14px] text-white whitespace-nowrap hide-scrollbar shadow relative">
            <div className="flex items-center">
              {categories &&
                categories.map((category: ICategory) => (
                  <Link
                    href={{
                      pathname: `/categories/${
                        category.id
                      }/${ConvertCategoryName(category.name)}`,
                    }}
                    key={category.id}
                  >
                    <div
                      className="flex flex-col justify-center mx-4 items-center relative"
                      onClick={() => {}}
                      key={category.id}
                    >
                      <div className="rounded-md">{category.name}</div>
                      {Number(path[2]) === category.id && (
                        <div className="h-1 w-full bg-yellow-400 rounded-full absolute bottom-[-6px] left-0" />
                      )}
                    </div>
                  </Link>
                ))}
              {categories && categories.length === 0 && (
                <div
                  className={`flex justify-around m-1 items-center border border-[#E2E2E2] px-4 py-1 rounded-full bg-[#25AC10] text-white`}
                  key={0}
                >
                  Kategori Yok
                </div>
              )}
            </div>
          </div>
          <div>
            <div className="flex overflow-x-auto h-[45px] items-center bg-white font-semibold text-[14px] text-[#444444]  whitespace-nowrap hide-scrollbar shadow-lg">
              <div className="flex items-center">
                {isSearched && SubCategory && SubCategory.length > 0 ? (
                  SubCategory.map((subCategory: ISubCategory) => (
                    <div
                      className={`flex justify-around m-1 items-center border border-[#E2E2E2] px-4 py-1 rounded-full ${
                        selectedSubCategory?.id === subCategory.id
                          ? "bg-[#25AC10] text-white"
                          : "bg-white text-[#444444]"
                      }`}
                      onClick={() => {
                        dispatch(setSelectedSubCategory(subCategory));
                      }}
                      key={subCategory.id}
                    >
                      {subCategory.id ? subCategory.name : "Alt Kategori"}
                    </div>
                  ))
                ) : SubCategory && SubCategory.length > 0 ? (
                  SubCategory.map((subCategory: ISubCategory) => (
                    <div
                      className={`flex justify-around m-1 items-center border border-[#E2E2E2] px-4 py-1 rounded-full ${
                        selectedSubCategory?.id === subCategory.id
                          ? "bg-[#25AC10] text-white"
                          : "bg-white text-[#444444]"
                      }`}
                      onClick={() => {
                        dispatch(setSelectedSubCategory(subCategory));
                      }}
                      key={subCategory.id}
                    >
                      {subCategory.id ? subCategory.name : "Alt Kategori"}
                    </div>
                  ))
                ) : (
                  <div
                    className={`flex justify-around m-1 items-center border border-[#E2E2E2] px-4 py-1 rounded-full bg-[#25AC10] text-white`}
                    key={0}
                  >
                    Alt Kategori Yok
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:block bg-white">
          <div className="grid grid-cols-12   w-[calc(100%-210px)] mx-auto mt-[50px]">
            <div className="col-span-12 bg-white shadow-md w-full h-[55px] rounded-md flex items-center px-5 ">
              Ana Sayfa <BiChevronRight size={28} />{" "}
              <p className="font-semibold">Arama</p>
            </div>
          </div>
          <div className="grid grid-cols-6 w-[calc(100%-210px)] mx-auto mt-[30px]  ">
            <div className="col-span-1  w-[300px]">
              <CategoryProductFilter />
              <CategoryBrandFilter />
              <CategoryTypeFilter />
              <CategorySaleFilter />
            </div>
            <div className="col-span-5 w-[1152px] ml-[54px]">
              <p className=" font-bold leading-normal text-[15px] font-sans mb-10">
                <span className="text-primary">“Coca Cola”</span> araman icin ne
                yazikki sonuc bulamadik.
              </p>
              <div className="shadow-2xl w-full py-[50px] px-[56px]">
                <div className="grid grid-cols-5 gap-x-[45px] gap-y-[55px]">
                  <div className="col-span-1">
                    <CategoryCard />
                  </div>
                  <div className="col-span-1">
                    <CategoryCard />
                  </div>
                  <div className="col-span-1">
                    <CategoryCard />
                  </div>
                  <div className="col-span-1">
                    <CategoryCard />
                  </div>
                  <div className="col-span-1">
                    <CategoryCard />
                  </div>
                  <div className="col-span-1">
                    <CategoryCard />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default CategoryBarComp;
