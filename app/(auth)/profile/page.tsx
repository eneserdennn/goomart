'use client'

import React, {useEffect, useState} from "react";

import BottomNavBar from "@/components/bottom-navbar/BottomNavBar";
import LoggedIn from "@/app/(auth)/profile/LoggedIn";
import LoggedOut from "@/app/(auth)/profile/LoggedOut";
import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import { useGetProfileQuery } from "@/redux/features/auth/userProfileApiSlice";
import { useSelector } from "react-redux";
import Loading from "@/app/loading";

const Profile: React.FC = () => {
    const token = useSelector(selectCurrentToken);
    const { data: profile, isLoading, isSuccess, isError, error } = useGetProfileQuery(token);

    let content;

    if (isLoading) {
        content = <Loading />
    } else if (isSuccess) {
        content = <div className="flex flex-col p-4">
            <LoggedIn/>
            <BottomNavBar/>
    </div>
    } else if (isError) {
        content = <div className="flex flex-col p-4">
            <LoggedOut/>
            <BottomNavBar/>
        </div>
    } else {
        content = <div>Something went wrong</div>;
    }

    return content;
}
;
export default Profile;
