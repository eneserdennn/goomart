'use client'
import React, {useEffect, useState} from "react";
import LoggedIn from "@/app/(auth)/profile/LoggedIn";
import LoggedOut from "@/app/(auth)/profile/LoggedOut";
import BottomNavBar from "@/components/bottom-navbar/BottomNavBar";

const Profile: React.FC = () => {
    const [logged, setLogged] = useState<boolean>(true);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setLogged(true);
        } else {
            setLogged(false);
        }
    }, []);

    return (
        <div className="flex flex-col p-4">
            {logged ? (
                <LoggedIn/>
            ) : (
                <LoggedOut/>
            )}
            <BottomNavBar/>
        </div>
    );
}
;
export default Profile;
