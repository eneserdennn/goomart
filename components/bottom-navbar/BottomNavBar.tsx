"use client";

import React, { useEffect, useState } from "react";

import { BiSearchAlt } from "react-icons/bi";
import { BsFillGiftFill } from "react-icons/bs";
import { FaShoppingBag } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { IoPersonSharp } from "react-icons/io5";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import { useSelector } from "react-redux";

const BottomNavBar: React.FC = () => {
  const token = useSelector(selectCurrentToken);
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();

  const path = usePathname();
  // http://localhost:3000/profile/account-settings -> profile and http://localhost:3000/campaigns -> campaigns
  const pathName = path.split("/")[1];

  useEffect(() => {}, []);

  return (
    <div className="flex md:hidden justify-around fixed bottom-0 h-[70px] left-0 w-full bg-white border-t border-gray-300">
      <button
        className="flex flex-col items-center justify-center space-x-1"
        onClick={() => router.push("/")}
      >
        {pathName === "" ? (
          <GoHomeFill size={30} color="green" />
        ) : (
          <GoHomeFill size={30} color="#888" />
        )}
      </button>

      <button className="flex flex-col items-center justify-center space-x-1">
        <Link href={"search"}>
          {pathName === "search" ? (
            <BiSearchAlt size={30} color="green" />
          ) : (
            <BiSearchAlt size={30} color="#888" />
          )}
        </Link>
      </button>

      <button className="flex flex-col items-center justify-center space-x-1">
        <Link href={"/cart"}>
          {pathName === "cart" ? (
            <FaShoppingBag size={30} color="green" />
          ) : (
            <FaShoppingBag size={30} color="#888" />
          )}
        </Link>
      </button>

      <button className="flex flex-col items-center justify-center space-x-1">
        <Link href={"/campaigns"}>
          {pathName === "campaigns" ? (
            <BsFillGiftFill size={30} color="green" />
          ) : (
            <BsFillGiftFill size={30} color="#888" />
          )}
        </Link>
      </button>
      <button className="flex flex-col items-center justify-center space-x-1">
        <Link href={"/profile"}>
          {pathName === "profile" ? (
            <IoPersonSharp size={30} color="green" />
          ) : (
            <IoPersonSharp size={30} color="#888" />
          )}
        </Link>
      </button>
    </div>
  );
};

export default BottomNavBar;
