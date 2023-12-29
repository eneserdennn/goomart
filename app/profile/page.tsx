"use client";

import React, { useEffect, useState } from "react";

import BottomNavBar from "@/components/bottom-navbar/BottomNavBar";
import Loading from "@/app/loading";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";
import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import { useGetProfileQuery } from "@/redux/features/auth/userProfileApiSlice";
import { useSelector } from "react-redux";

const Profile: React.FC = () => {
  const token = useSelector(selectCurrentToken);
  let content;
  if (token) {
    content = (
      <div className="flex flex-col p-4">
        <LoggedIn />
        <BottomNavBar />
      </div>
    );
  } else if (!token) {
    content = (
      <div className="flex flex-col p-4 mb-10">
        <LoggedOut />
        <BottomNavBar />
      </div>
    );
  } else {
    content = <div>Something went wrong</div>;
  }

  return content;
};
export default Profile;
