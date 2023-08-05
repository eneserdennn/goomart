'use client'

import Link from 'next/link';
import {BiLogoApple} from 'react-icons/bi';
import {FcGoogle} from 'react-icons/fc';
import Container from "@/components/ui/container";
import LoginForm from '@/components/auth/login/LoginForm';
import SocialButtons from '@/components/ui/socialButtons';

import React, {useEffect} from 'react';
import {useRouter} from 'next/navigation';

const Login: React.FC = () => {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            router.push('/');
        }
    }, []);

    const buttons = [
        {
            buttonClassName:
                'text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50',
            buttonText: 'Apple',
            ButtonElement: <BiLogoApple/>,
        },
        {
            buttonClassName:
                'bg-white border ring-deepgray focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center',
            buttonText: 'Google',
            ButtonElement: <FcGoogle/>,
        },
    ];

    return (
        <Container className="flex items-center flex-col m-1">
            <LoginForm/>
            <div className="w-full my-4 ">
                <SocialButtons showText={true} text="veya hesabınla giriş yap" buttons={buttons}/>
            </div>
            <span className="text-black font-bold my-2">
        Hesabınız yok mu?&nbsp; &nbsp;
                <Link href="/signup" className="text-primary font-bold">
        Üye Ol
        </Link>
        </span>
        </Container>
    );
};

export default Login;

