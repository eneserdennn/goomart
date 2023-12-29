"use client";
import React, { useEffect, useState } from "react";

import { BiLogoApple } from "react-icons/bi";
import Container from "@/components/ui/container";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import LoginForm from "@/components/auth/login/LoginForm";
import SocialButtons from "@/components/ui/socialButtons";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import { Tab } from "@headlessui/react";
import SignUpForm from "@/components/auth/signup/SignupForm";
import { IMAGES } from "@/constants/imageConstants";
import Image from "next/image";
function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

const Login: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [seen, setSeen] = useState(false);
  const token = useSelector(selectCurrentToken);
  const router = useRouter();
  const buttons = [
    {
      buttonClassName:
        "text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50",
      buttonText: "Apple",
      ButtonElement: <BiLogoApple />,
    },
    {
      buttonClassName:
        "bg-white border ring-deepgray focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center",
      buttonText: "Google",
      ButtonElement: <FcGoogle />,
    },
  ];

  let content;
  if (token) {
    router.push("/");
  } else {
    content = (
      <>
        <LoginForm />
        <div className="w-full my-4 ">
          <SocialButtons
            showText={true}
            text="veya hesabınla giriş yap"
            buttons={buttons}
          />
        </div>
        <span className="text-black font-bold my-2">
          Hesabınız yok mu?&nbsp; &nbsp;
          <Link href="/signup" className="text-primary font-bold">
            Üye Ol
          </Link>
        </span>
      </>
    );
  }

  return content;
};

export default Login;
