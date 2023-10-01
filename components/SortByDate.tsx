"use client";

import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";

import { BiCheck } from "react-icons/bi";
import { ICONS } from "@/constants/iconConstants";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { setFrom, setTo } from "@/redux/features/order/orderSlice";

const date = [{ date: "Son 1 Ay" }, { date: "Son 3 Ay" }, { date: "Son 6 Ay" }];

const SortByDate = () => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(date[0]);

  const nowDate = new Date();
  const nowYear = nowDate.getFullYear();
  const nowMonth = nowDate.getMonth() + 1;
  const nowDay = nowDate.getDate();
  const now = `${nowYear}-${nowMonth}-${nowDay}`;

  const threeMonthAgo = new Date();
  threeMonthAgo.setMonth(threeMonthAgo.getMonth() - 3);
  const threeMonthAgoYear = threeMonthAgo.getFullYear();
  const threeMonthAgoMonth = threeMonthAgo.getMonth() + 1;
  const threeMonthAgoDay = threeMonthAgo.getDate();
  const threeMonthAgoDate = `${threeMonthAgoYear}-${threeMonthAgoMonth}-${threeMonthAgoDay}`;

  const sixMonthAgo = new Date();
  sixMonthAgo.setMonth(sixMonthAgo.getMonth() - 6);
  const sixMonthAgoYear = sixMonthAgo.getFullYear();
  const sixMonthAgoMonth = sixMonthAgo.getMonth() + 1;
  const sixMonthAgoDay = sixMonthAgo.getDate();
  const sixMonthAgoDate = `${sixMonthAgoYear}-${sixMonthAgoMonth}-${sixMonthAgoDay}`;

  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  const oneMonthAgoYear = oneMonthAgo.getFullYear();
  const oneMonthAgoMonth = oneMonthAgo.getMonth() + 1;
  const oneMonthAgoDay = oneMonthAgo.getDate();
  const oneMonthAgoDate = `${oneMonthAgoYear}-${oneMonthAgoMonth}-${oneMonthAgoDay}`;

  if (selected.date === "Son 1 Ay") {
    dispatch(setFrom(oneMonthAgoDate));
    dispatch(setTo(now));
  } else if (selected.date === "Son 3 Ay") {
    dispatch(setFrom(threeMonthAgoDate));
    dispatch(setTo(now));
  } else if (selected.date === "Son 6 Ay") {
    dispatch(setFrom(sixMonthAgoDate));
    dispatch(setTo(now));
  }

  return (
    <div className="w-full px-[15px] h-[45px] mb-[20px]">
      <Listbox value={selected} onChange={setSelected}>
        <div className=" items-center">
          <Listbox.Button className="relative flex flex-row w-full justify-between cursor-default rounded-lg bg-white py-2 px-[20px] pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate text-[15px] text-[#363636]">
              Tarihe Göre Sıralayın
            </span>
            <span className="block truncate text-[13px] text-[#6D6D6D]">
              {selected.date}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <Image
                src={ICONS.downArrowThin}
                alt={"down-arrow"}
                width={10}
                height={6}
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {date.map((dateTime, dateIdx) => (
                <Listbox.Option
                  key={dateIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active
                        ? "bg-primary bg-opacity-10 text-primary"
                        : "text-gray-900"
                    }`
                  }
                  value={dateTime}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {dateTime.date}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary">
                          <BiCheck className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default SortByDate;
