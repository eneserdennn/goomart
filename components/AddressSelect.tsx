import React, {Fragment, useEffect, useState} from "react";
import { Listbox, Transition } from "@headlessui/react";
import { BiCheck } from "react-icons/bi";
import Image from "next/image";
import { ICONS } from "@/constants/iconConstants";

const AddressSelect = ({ addresses }) => {
    const [selected, setSelected] = useState(null);

    const addressArray = addresses?.addresses;

    useEffect(() => {
        if (addresses) {
            const defaultAddressId = addresses.defaultAddressId;
            const defaultAddress = addresses.addresses.find((address) => address.id === defaultAddressId);
            setSelected(defaultAddress);
        }
    }, [addresses]);

    return (
        <div className="w-full h-[45px] mb-[20px]">
            <Listbox value={selected} onChange={setSelected}>
                <div className=" items-center">
                    <Listbox.Button
                        className="relative flex flex-row w-full items-center cursor-default rounded-lg bg-white py-2 px-[20px] pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <Image src={ICONS.address} alt={'address'} width={26} height={34}/>
                        <span className="block truncate text-[15px] text-[#363636]">
                                <span className="pl-[15px] text-[13px] text-[#6D6D6D] font-bold">
                            <span className="text-primary mr-1">
                                {selected?.nameAndSurname.split(' ')[0]},
                            </span>
                                    {selected?.address.length > 40 ? (
                                        <>
                                            {selected?.address.slice(0, 28)}...
                                        </>
                                    ) : (
                                        selected?.address
                                    )}
                        </span>
                            </span>
                        <span
                            className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-[18px]">
                          <Image src={ICONS.downArrowBold} alt={"down-arrow"} width={10} height={6}/>
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
                            {addressArray?.map((address, addressIdx) => (
                                <Listbox.Option
                                    key={addressIdx}
                                    className={({active}) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                            active ? 'bg-primary bg-opacity-10 text-primary' : 'text-gray-900'
                                        }`
                                    }
                                    value={address}
                                >
                                    {({selected}) => (
                                        <>
                                              <span
                                                  className={`block truncate ${
                                                      selected ? 'font-medium' : 'font-normal'
                                                  }`}
                                              >
                                                  <span className="text-primary mr-1">
                                                    {address.nameAndSurname.split(' ')[0]}, <span className="text-[#444444]">{address.address}</span>
                                                </span>
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

export default AddressSelect;
