'use client'

import React, {useEffect, useState} from 'react';

import { BiSearchAlt } from 'react-icons/bi';
import { BsFillGiftFill } from 'react-icons/bs';
import { FaShoppingBag } from 'react-icons/fa';
import { GoHomeFill } from 'react-icons/go';
import {IoPersonSharp} from "react-icons/io5";
import Link from "next/link";
import {useRouter} from "next/navigation";

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
      <div className="flex justify-around fixed bottom-0 h-[70px] left-0 w-full bg-white border-t border-gray-300">
              <button className="flex flex-col items-center justify-center space-x-1" onClick={() => router.push('/')}>
                  <GoHomeFill size={30} color="green" />
              </button>

              <button className="flex flex-col items-center justify-center space-x-1">
                  <Link href={'search'}>
                  <BiSearchAlt size={30} color="#888" />
                  </Link>
              </button>

              <button className="flex flex-col items-center justify-center space-x-1">
              <Link href={'/cart'}>
                  <FaShoppingBag size={30} color="#888" />
                  </Link>
              </button>

              <button className="flex flex-col items-center justify-center space-x-1" onClick={() => {
                  if (isLogin) {
                      router.push('/login');
                  } else {
                      router.push('/login');
                  }
              }}>
                  <BsFillGiftFill size={30} color="#888" />
              </button>
              <button className="flex flex-col items-center justify-center space-x-1">
                  <Link href={'/profile'}>
                        <IoPersonSharp size={30} color="#888" />
                    </Link>

              </button>
      </div>

  );
};

export default BottomNavBar;
