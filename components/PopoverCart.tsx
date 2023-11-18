import { Popover, Transition } from "@headlessui/react";

import { Fragment } from "react";

import Image from "next/image";
import { ICONS } from "@/constants/iconConstants";

import PopoverCartPanel from "@/components/PopoverCartPanel";

export default function PopoverCart() {
  return (
    <div className="w-full max-w-sm px-4">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? "text-white" : "text-white/90"}
                md:flex bg-white hidden border items-center justify-center h-[45px] rounded-[15px] px-[11px]
                `}
            >
              <Image
                src={ICONS.basket}
                alt={ICONS.basket}
                width={30}
                height={30}
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute left-[-200px] z-10 mt-3 w-[500px] -translate-x-1/2 transform bg-white">
                <PopoverCartPanel />
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}
