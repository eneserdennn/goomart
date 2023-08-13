'use client'

import React, {useEffect, useState} from 'react';
import {IoMdRadioButtonOn, IoMdRadioButtonOff} from 'react-icons/io';
import Image from "next/image";
import {IMAGES} from "@/constants/imageConstants";
import {ICONS} from "@/constants/iconConstants";
import {useRouter} from "next/navigation";
import {useGetMyAddressesQuery, useSetDefaultAddressMutation, useArchiveAnAddressMutation} from "@/redux/features/address/addressesApiSlice";
import Loading from "@/app/loading";
import ConfirmModal from "@/components/modal/Modal";
import {customSuccess} from "@/components/CustomToast";
import Link from "next/link";


interface Props {
    address: string;
    selectedAddress: string | null;
    onSelectAddress: (address: string) => void;
}

const DeliveryAddress: React.FC = () => {
    const [deliveryAddress, setDeliveryAddress] = useState<string[] | null>(null);
    const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [addressToDelete, setAddressToDelete] = useState<string | null>(null);


    const {data: addresses, isLoading, isSuccess, isError, error} = useGetMyAddressesQuery();
    const [setDefaultAddress, {isLoading: isSettingDefaultAddress}] = useSetDefaultAddressMutation();
    const [archiveAnAddress, {isLoading: isArchivingAddress}] = useArchiveAnAddressMutation();

    useEffect(() => {
        if (addresses) {
            // console.log(addresses.addresses);
            setDeliveryAddress(addresses.addresses)

            const defaultAddressID = addresses.defaultAddressId;

            if (defaultAddressID) {
                setSelectedAddress(defaultAddressID);
            }
        }

    }, [addresses]);

    const handleDeleteAddress = (address: string) => {
        setAddressToDelete(address.id);
        setShowModal(true);
    };

    const handleSelectAddress = (address: string) => {
        setDefaultAddress(address.id);
        setSelectedAddress(address.id);
    };

    const confirmDeleteAddress = () => {
        if (addressToDelete) {
            archiveAnAddress(addressToDelete);
            customSuccess("Adresiniz başarıyla silindi")
        }
        setShowModal(false);
        setAddressToDelete(null);
    };

    const CustomRadio: React.FC<Props> = ({address, selectedAddress, onSelectAddress}) => {
        return (
            <div className="flex items-center justify-between w-full border h-[100px] rounded p-4" onClick={() => onSelectAddress(address)}>
                <div className="flex items-center"> {/* Radio button section takes 1/5 of the width */}
                    {/* Radio button icon */}
                    {address.id === selectedAddress ? (
                        <IoMdRadioButtonOn className="text-primary mr-4 h-6 w-6" />
                    ) : (
                        <IoMdRadioButtonOff className="text-gray-300 mr-4 h-6 w-6" />
                    )}
                </div>
                <div className="flex items-center w-4/5"> {/* Address section takes 3/5 of the width */}
                    {/* Address details */}
                    <div className="flex flex-col">
                        <span className="text-sm font-bold mb-1">{address.nameAndSurname}</span>
                        <span className="text-sm font-semibold text-gray-500">{address.address} {address.city} {address.postalCode}</span>
                    </div>
                </div>
                <div className="flex items-center justify-end w-1/5"> {/* Icon section takes 1/5 of the width */}
                    {/* Edit and delete icons */}
                    <Link href={`/addresses/edit-address/${address.id}`}>
                        <Image
                            src={ICONS.edit}
                            alt={"edit-address"}
                            className="cursor-pointer text-primary h-5 w-5 mr-2"
                            onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                                e.stopPropagation();
                            }}
                        />
                    </Link>
                    <Image
                        src={ICONS.trash}
                        alt={"delete-address"}
                        className="cursor-pointer text-primary h-5 w-5"
                        onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                            e.stopPropagation();
                            handleDeleteAddress(address);
                        }}
                    />
                </div>
            </div>

        );
    };

    let content;

    if (isLoading) {
        content = <Loading/>;
    } else if (isSuccess) {
        content = (<>
        <div className="flex flex-col relative items-center justify-center">
            {deliveryAddress?.length > 0 ? (
                <div className="flex flex-col items-center w-full bg-white">
                    {deliveryAddress.map((address, idx) => (
                        <CustomRadio
                            key={idx}
                            address={address}
                            selectedAddress={selectedAddress}
                            onSelectAddress={handleSelectAddress}
                        />
                    ))}
                </div>
            ) : (
                <>
                    <Image src={IMAGES.address} alt={"addresses-image"} className="my-12"/>
                    <p className="text-md font-bold">Kayıtlı adresiniz bulunmuyor.</p>
                    <p className="text-md font-bold">Hemen ilk adresinizi ekleyin.</p>
                </>
            )}
            <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300">
                <div className="flex justify-center py-2">
                    <button
                        className="h-12 m-2 w-full bg-primary hover:bg-green-800 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-300"

                    >
                        <Link href="/addresses/add-address">
                            Adres Ekle
                        </Link>
                    </button>
                </div>
            </div>
            <ConfirmModal
                show={showModal}
                message={"Adresiniz silinecektir, devam etmek istediginize emin misiniz?"}
                onClose={() => setShowModal(false)}
                onConfirm={confirmDeleteAddress}
            />
        </div>

        </>
    );
    } else if (isError) {
        content = <div>ERROR</div>;
    }

    return content;
};

export default DeliveryAddress;
