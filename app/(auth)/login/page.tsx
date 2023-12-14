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

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

const Login: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [seen, setSeen] = useState(false);
  const token = useSelector(selectCurrentToken);
  const router = useRouter();
  const width = window.innerWidth;
  useEffect(() => {
    if (width < 1024) {
      setSelectedIndex(0);
    }
  }, [width]);

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
  console.log(selectedIndex);
  if (token) {
    router.push("/");
  } else {
    content = (
      <>
        <div className="bg-white md:bg-red-500 w-full h-[398px]">
          <Container className="flex items-center flex-col m-1 relative md:max-w-[500px] bg-white md:mx-auto md:shadow-2xl md:my-10 md:py-[30px] md:rounded-[25px]">
            <div className="w-full">
              <Tab.Group
                selectedIndex={selectedIndex}
                onChange={setSelectedIndex}
              >
                <Tab.List className="hidden md:flex md:space-x-1 md:h-[58px] md:px-[15px] md:py-[9px] md:bg-white md:mb-10">
                  <Tab
                    className={({ selected }) => {
                      console.log(selected);
                      return classNames(
                        "w-full rounded-lg py-2.5 font-bold text-[14px] leading-5 text-[#6D6D6D]",
                        "ring-white ring-opacity-60 ring-offset-2 ring-offset-white focus:outline-none focus:ring-2",
                        selected
                          ? "bg-primary shadow text-primary bg-opacity-20"
                          : ""
                      );
                    }}
                  >
                    Giriş Yap
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        "w-full rounded-lg py-2.5 font-bold text-[14px] leading-5 text-[#6D6D6D]",
                        "ring-white ring-opacity-60 ring-offset-2 ring-offset-white focus:outline-none focus:ring-2",
                        selected
                          ? "bg-primary shadow text-primary bg-opacity-20"
                          : ""
                      )
                    }
                  >
                    Üye Ol
                  </Tab>
                </Tab.List>
                <Tab.Panels>
                  <Tab.Panel>
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
                  </Tab.Panel>
                  <Tab.Panel className="hidden lg:block">
                    <SignUpForm />
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
          </Container>
        </div>
      </>
    );
  }

  return content;
};

export default Login;
