"use client";

import { IoMdRadioButtonOff, IoMdRadioButtonOn } from "react-icons/io";
// 1. Importlar
import React, { useEffect, useState } from "react";
import {
  useArchiveAnAddressMutation,
  useGetMyAddressesQuery,
  useSetDefaultAddressMutation,
} from "@/redux/features/address/addressesApiSlice";

import ConfirmModal from "@/components/modal/Modal";
import { ICONS } from "@/constants/iconConstants";
import { IMAGES } from "@/constants/imageConstants";
import Image from "next/image";
import Link from "next/link";
import Loading from "@/app/loading";
import { customSuccess } from "@/components/CustomToast";
import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import { useSelector } from "react-redux";

// 2. Interfaces
interface Country {
  id: number;
  name: string;
  code: string;
  shipmentFee: number;
  image: string;
  canFreeShip: boolean;
  minCartValue: number;
  minFreeShipCartValue: number;
  createdAt: string;
  updatedAt: string;
  archived: boolean;
  archivedAt: null | string;
}

interface Address {
  id: number;
  city: string;
  postalCode: string;
  address: string;
  nameAndSurname: string;
  phone: string;
  type: "DELIVERY";
  country: Country;
}

interface CustomRadioProps {
  address: Address;
  selectedAddress: number | null;
  onSelectAddress: (addressId: number) => void;
}

const DeliveryAddress: React.FC = () => {
  // 3. States
  const token = useSelector(selectCurrentToken);
  const [deliveryAddress, setDeliveryAddress] = useState<Address[] | null>(
    null,
  );
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState<number | null>(null);
  const [localDefaultAddress, setLocalDefaultAddress] = useState<number | null>(
    null,
  );

  // API Calls
  const {
    data: addresses,
    isLoading,
    isSuccess,
    isError,
  } = useGetMyAddressesQuery({});
  const [setDefaultAddress] = useSetDefaultAddressMutation();
  const [archiveAnAddress] = useArchiveAnAddressMutation();

  useEffect(() => {
    if (!token) {
      const defaultAddressLocal: number = JSON.parse(
        localStorage.getItem("defaultAddress") || "null",
      );
      setLocalDefaultAddress(defaultAddressLocal);
      setSelectedAddress(defaultAddressLocal);
    }
  }, []);

  // 4. Effects
  useEffect(() => {
    if (addresses) {
      setDeliveryAddress(addresses.addresses);
      if (addresses.defaultAddressId) {
        setSelectedAddress(addresses.defaultAddressId);
      }
    }
  }, [addresses]);

  // Helper Functions
  const handleDeleteAddress = (addressId: number) => {
    setAddressToDelete(addressId);
    setShowModal(true);
  };

  const handleSelectAddress = (addressId: number) => {
    if (token) {
      setDefaultAddress(addressId);
      setSelectedAddress(addressId);
    } else {
      localStorage.setItem("defaultAddress", JSON.stringify(addressId));
      setSelectedAddress(addressId);
    }
  };

  const confirmDeleteAddress = () => {
    if (addressToDelete) {
      archiveAnAddress(addressToDelete);
      customSuccess("Adresiniz başarıyla silindi");
      setShowModal(false);
      setAddressToDelete(null);
    }

    const deliveryAddressLocal: Address[] = JSON.parse(
      localStorage.getItem("deliveryAddress") || "[]",
    );
    const selectedAddressLocal = deliveryAddressLocal.find(
      (address) => address.id === addressToDelete,
    );

    if (selectedAddressLocal) {
      const index = deliveryAddressLocal.indexOf(selectedAddressLocal);
      if (index > -1) {
        deliveryAddressLocal.splice(index, 1);
      }
      localStorage.setItem(
        "deliveryAddress",
        JSON.stringify(deliveryAddressLocal),
      );
    }
  };

  const CustomRadio: React.FC<CustomRadioProps> = ({
    address,
    selectedAddress,
    onSelectAddress,
  }) => {
    return (
      <div
        className="flex items-center justify-between w-full border h-[100px] rounded p-4"
        onClick={() => onSelectAddress(address.id)}
      >
        <div className="flex items-center">
          {address.id === selectedAddress ? (
            <IoMdRadioButtonOn className="text-primary mr-4 h-6 w-6" />
          ) : (
            <IoMdRadioButtonOff className="text-gray-300 mr-4 h-6 w-6" />
          )}
        </div>
        <div className="flex items-center w-4/5">
          {" "}
          {/* Address section takes 3/5 of the width */}
          {/* Address details */}
          <div className="flex flex-col">
            <span className="text-sm font-bold mb-1">
              {address.nameAndSurname}
            </span>
            <span className="text-sm font-semibold text-gray-500">
              {address.address} {address.city} {address.postalCode}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-end w-1/5">
          {" "}
          {/* Icon section takes 1/5 of the width */}
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
              handleDeleteAddress(address.id);
            }}
          />
        </div>
      </div>
    );
  };

  let content;

  if (isLoading) {
    content = <Loading />;
  } else if (isSuccess) {
    content = (
      <>
        <div className="flex flex-col relative items-center justify-center">
          {deliveryAddress && deliveryAddress?.length > 0 ? (
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
              <Image
                src={IMAGES.address}
                alt={"addresses-image"}
                className="my-12"
              />
              <p className="text-md font-bold">Kayıtlı adresiniz bulunmuyor.</p>
              <p className="text-md font-bold">Hemen ilk adresinizi ekleyin.</p>
            </>
          )}
          <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300">
            <div className="flex justify-center py-2">
              <button className="h-12 m-2 w-full bg-primary hover:bg-green-800 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-300">
                <Link href="/addresses/add-address">Adres Ekle</Link>
              </button>
            </div>
          </div>
          <ConfirmModal
            show={showModal}
            message={
              "Adresiniz silinecektir, devam etmek istediginize emin misiniz?"
            }
            onClose={() => setShowModal(false)}
            onConfirm={confirmDeleteAddress}
          />
        </div>
      </>
    );
  } else if (!token) {
    const deliveryAddressLocal: Address[] = JSON.parse(
      localStorage.getItem("deliveryAddress") || "[]",
    );
    content = (
      <>
        <div className="flex flex-col relative items-center justify-center">
          {deliveryAddressLocal && deliveryAddressLocal?.length > 0 ? (
            <div className="flex flex-col items-center w-full bg-white">
              {deliveryAddressLocal.map((address, idx) => (
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
              <Image
                src={IMAGES.address}
                alt={"addresses-image"}
                className="my-12"
              />
              <p className="text-md font-bold">Kayıtlı adresiniz bulunmuyor.</p>
              <p className="text-md font-bold">Hemen ilk adresinizi ekleyin.</p>
            </>
          )}
          <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300">
            <div className="flex justify-center py-2">
              <button className="h-12 m-2 w-full bg-primary hover:bg-green-800 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-300">
                <Link href="/addresses/add-address">Adres Ekle</Link>
              </button>
            </div>
          </div>
          <ConfirmModal
            show={showModal}
            message={
              "Adresiniz silinecektir, devam etmek istediginize emin misiniz?"
            }
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
