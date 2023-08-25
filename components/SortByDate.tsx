'use client'

import {Listbox, Transition} from "@headlessui/react";
import Image from "next/image";
import {ICONS} from "@/constants/iconConstants";
import {Fragment, useState} from "react";
import {BiCheck} from "react-icons/bi";

const people = [
    {date: 'Son 1 Ay'},
    {date: 'Son 3 Ay'},
    {date: 'Son 6 Ay'}
]

const SortByDate = () => {
    const [selected, setSelected] = useState(people[0])

    return (
        <div className="w-[360px] h-[45px] mb-[20px]">
            <Listbox value={selected} onChange={setSelected}>
                <div className=" items-center">
                    <Listbox.Button
                        className="relative flex flex-row w-full justify-between cursor-default rounded-lg bg-white py-2 px-[20px] pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                            <span className="block truncate text-[15px] text-[#363636]">
                                Tarihe Göre Sıralayın
                            </span>
                        <span className="block truncate text-[13px] text-[#6D6D6D]">
                                {selected.date}
                            </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <Image src={ICONS.downArrowThin} alt={"down-arrow"} width={10} height={6}/>
            </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options
                            className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {people.map((person, personIdx) => (
                                <Listbox.Option
                                    key={personIdx}
                                    className={({active}) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                            active ? 'bg-primary bg-opacity-10 text-primary' : 'text-gray-900'
                                        }`
                                    }
                                    value={person}
                                >
                                    {({selected}) => (
                                        <>
                      <span
                          className={`block truncate ${
                              selected ? 'font-medium' : 'font-normal'
                          }`}
                      >
                        {person.date}
                      </span>
                                            {selected ? (
                                                <span
                                                    className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary">
                          <BiCheck className="h-5 w-5" aria-hidden="true"/>
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
