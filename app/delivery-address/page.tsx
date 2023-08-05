'use client'

import React, {useState} from 'react';
import {IoMdRadioButtonOn, IoMdRadioButtonOff} from 'react-icons/io';
import {FiEdit} from 'react-icons/fi';
import {FaTrashAlt} from 'react-icons/fa';

interface Props {
    address: string;
    selectedAddress: string | null;
    onSelectAddress: (address: string) => void;
}

const SkeletonElement: React.FC = () => (
    <>
        <div className="flex items-start space-x-4 bg-white rounded-lg px-10 py-3 shadow-sm m-3">
            <div className="flex space-x-4 items-center">
                <div className="rounded-full bg-gray-300 h-20 w-20"></div>
                <div className="flex flex-col space-y-4">
                    <div className="h-6 bg-gray-300 rounded w-5/6"></div>
                    <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                </div>
            </div>
            <div className="flex flex-col space-y-4">
                <div className="w-12 h-4 bg-gray-300 rounded"></div>
                <div className="w-40 h-3 bg-gray-300 rounded"></div>
                <div className="w-28 h-3 bg-gray-300 rounded"></div>
            </div>
        </div>
    </>
);


const DeliveryAddress: React.FC = () => {
    const [deliveryAddress, setDeliveryAddress] = useState<string[] | null>([
        'Ankara, Çankaya',
        'İstanbul, Kadıköy',
    ]);
    const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

    const handleAddAddress = () => {
        // Add logic to handle address addition.
    };

    const handleEditAddress = (address: string) => {
        // Add logic to handle address edit.
    };

    const handleDeleteAddress = (address: string) => {
        // Add logic to handle address deletion.
    };

    const handleSelectAddress = (address: string) => {
        setSelectedAddress(address);
    };

    const CustomRadio: React.FC<Props> = ({address, selectedAddress, onSelectAddress}) => {
        return (
            <div
                className={`flex items-center justify-between w-full border rounded h-24 px-4`}
                onClick={() => onSelectAddress(address)}
            >
                <div className="flex items-center">
                    {address === selectedAddress ? (
                        <IoMdRadioButtonOn className="text-primary mr-4 h-6 w-6"/>
                    ) : (
                        <IoMdRadioButtonOff className="text-gray-300 mr-4 h-6 w-6"/>
                    )}
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold">Home</span>
                        <span className="text-xs text-gray-500">{address}</span>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <FiEdit
                        className="cursor-pointer text-primary h-5 w-5 mr-2"
                        onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                            e.stopPropagation();
                            handleEditAddress(address);
                        }}
                    />
                    <FaTrashAlt
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

    return (
        <div className="relative min-h-screen">
            {deliveryAddress ? (
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
                    <SkeletonElement/>
                    <SkeletonElement/>
                    <SkeletonElement/>
                    <p className="text-lg">Kayıtlı adresiniz bulunmuyor.</p>
                    <p className="text-lg">Hemen ilk adresinizi ekleyin.</p>
                </>
            )}
            <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300">
                <div className="flex justify-center py-2">
                    <button
                        className="h-12 m-2 w-full bg-primary hover:bg-green-800 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-300"
                        onClick={() => console.log('Adres Ekle butonuna tıklandı')}
                    >
                        Adres Ekle
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeliveryAddress;
