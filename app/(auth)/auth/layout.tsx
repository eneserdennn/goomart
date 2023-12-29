"use client";
import { Tab } from "@headlessui/react";
import classNames from "classnames";
import React, { ReactNode, useEffect, useState } from "react";
import Login from "./login/page";
import Signup from "./signup/page";
import { usePathname, useRouter } from "next/navigation";

const Layout = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const path = usePathname();
  const handleTabChange = (e: number) => {
    e === 0 ? router.push("/auth/login") : router.push("/auth/signup");
    setSelectedIndex(e);
  };
  useEffect(() => {
    if (path.split("/")[2] == "login") {
      setSelectedIndex(0);
    } else {
      setSelectedIndex(1);
    }
  }, [path]);

  return (
    <Tab.Group selectedIndex={selectedIndex} onChange={handleTabChange}>
      <Tab.List className="hidden md:flex md:space-x-1 md:h-[58px] md:px-[15px] md:py-[9px] md:bg-white md:mb-10">
        <Tab
          className={({ selected }) => {
            return classNames(
              "w-full rounded-lg py-2.5 font-bold text-[14px] leading-5 text-[#6D6D6D]",
              "ring-white ring-opacity-60 ring-offset-2 ring-offset-white focus:outline-none focus:ring-2",
              selected ? "bg-primary shadow text-primary bg-opacity-20" : ""
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
              selected ? "bg-primary shadow text-primary bg-opacity-20" : ""
            )
          }
        >
          Üye Ol
        </Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
          <Login />
        </Tab.Panel>
        <Tab.Panel>
          <Signup />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};

export default Layout;
