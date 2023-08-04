'use client'

import { FaHome, FaSearch, FaShoppingBag, FaTags, FaUser } from 'react-icons/fa';
import React, {useEffect, useState} from 'react';

import { BiSearchAlt } from 'react-icons/bi';
import { BsFillGiftFill } from 'react-icons/bs';
import { GoHomeFill } from 'react-icons/go';
import {useRouter} from "next/navigation";
import {IoPersonSharp} from "react-icons/io5";
import {useSelector} from "react-redux";


const BottomNavBar: React.FC = () => {
  // State variable to hold the cart item count
  const [cartItemCount, setCartItemCount] = useState(3); // Replace with your actual cart item count
    const [isLogin, setIsLogin] = useState(false)
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token){
            setIsLogin(true)
        }

    }, [])



  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300">
      <div className="flex justify-around py-2">
        <button className="flex flex-col items-center justify-center space-x-1">
          {/* <FaHome size={20} color="#888" /> */}
            <GoHomeFill size={25} color="#888" />
          <span className="text-xs text-gray-600">Ana Sayfa</span>
        </button>
        <button className="flex flex-col items-center justify-center space-x-1">
          {/* <FaSearch size={20} color="#888" /> */}
            <BiSearchAlt size={25} color="#888" />
          <span className="text-xs text-gray-600">Arama</span>
        </button>
        <button className="flex flex-col items-center justify-center space-x-1 relative p-3 bg-primary rounded-full">
          <FaShoppingBag size={25} color="#fff" />
        </button>
        <button className="flex flex-col items-center justify-center space-x-1">
          {/* <FaTags size={20} color="#888" /> */}
            <BsFillGiftFill size={25} color="#888" />
          <span className="text-xs text-gray-600">Kampanya</span>
        </button>
        <button className="flex flex-col items-center justify-center space-x-1" onClick={
            () => {
                if(isLogin){
                    router.push('/')
                }else{
                    router.push('/login')
                }
        }}>
          <IoPersonSharp size={25} color="#888" />
            <span className="text-xs text-gray-600 pr-1">Profil</span>
        </button>
      </div>
    </div>
  );
};

export default BottomNavBar;
