"use client";

import React, { useEffect, useState } from "react";

import BottomNavBar from "@/components/bottom-navbar/BottomNavBar";
import Loading from "@/app/loading";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";
import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import { useGetProfileQuery } from "@/redux/features/auth/userProfileApiSlice";
import { useSelector } from "react-redux";
import AuthWrapper from "../(auth)/AuthWrapper";
import { usePathname } from "next/navigation";

const Profile: React.FC = () => {
  const path = usePathname();
  console.log(path);
  // const token = useSelector(selectCurrentToken);
  return <>PROFILE</>;
};
export default Profile;
