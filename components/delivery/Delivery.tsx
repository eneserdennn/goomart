"use client";

import { Disclosure, Transition } from "@headlessui/react";

import { BsChevronDown } from "react-icons/bs";
import { ICONS } from "@/constants/iconConstants";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Delivery() {
  const [showContent, setShowContent] = useState<boolean>(false);
  const router = useRouter();

  return (
    <div className="flex">
      <div className="md:hidden z-50 bg-white shadow-md w-full px-4 h-[50px] flex items-center">
        <Disclosure>
          {({ open, close }) => (
            <>
              <Disclosure.Button
                className=" bg-white w-full flex items-center justify-between"
                onClick={() => router.push("/addresses")}
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={ICONS.address}
                    alt="goomart"
                    width={20}
                    height={20}
                  />
                  <p className=" text-sm">Teslimat Adresinizi Belirleyin</p>
                </div>
                <div className="">
                  <BsChevronDown
                    className="rotate-180-deg text-primary"
                    size={15}
                  />
                </div>
              </Disclosure.Button>

              <Transition
                show={showContent}
                enter="transition-opacity duration-150"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                {(ref) => (
                  <div
                    ref={ref}
                    className="fixed inset-0 bg-red-500 z-50 flex justify-center items-center"
                  >
                    <div className="w-full h-full flex justify-center items-center">
                      <Image
                        src="https://images.unsplash.com/photo-1502759683299-cdcd6974244f?auto=format&fit=crop&w=440&h=220&q=60"
                        alt="Your Image"
                        layout="fill"
                        objectFit="contain"
                        objectPosition="center"
                      />
                    </div>
                    <button onClick={() => close()}>Vazgeç</button>
                  </div>
                )}
              </Transition>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
}
