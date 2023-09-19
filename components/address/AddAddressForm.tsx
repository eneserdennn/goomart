"use client";

import * as Yup from "yup";

import React, { useEffect, useState } from "react";
import { customError, customSuccess } from "@/components/CustomToast";
import {
  useCreateAddressMutation,
  useGetAddressByIdQuery,
  useUpdateAnAddressMutation,
} from "@/redux/features/address/addressesApiSlice";
import { usePathname, useRouter } from "next/navigation";

import Button from "@/components/button";
import { Combobox } from "@headlessui/react";
import CountrySelect from "@/components/CountrySelect";
import { ICONS } from "@/constants/iconConstants";
import IconButton from "@/components/icon-button";
import Image from "next/image";
import Loading from "@/app/loading";
import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import { useFormik } from "formik";
import { useGetCountriesQuery } from "@/redux/features/countriesApiSlice";
import { useSelector } from "react-redux";

interface AddressFormValues {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  phoneNumber: string;
  countryCode: string;
}

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("Ad Soyad zorunludur"),
  address: Yup.string().required("Adres zorunludur"),
  city: Yup.string().required("Şehir zorunludur"),
  postalCode: Yup.string()
    .required("Posta Kodu zorunludur")
    .max(5, "Posta Kodu 5 haneli olmalıdır"),
  phoneNumber: Yup.string().required("Telefon Numarası zorunludur"),
});

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const AddressForm: React.FC = () => {
  const router = useRouter();
  const token = useSelector(selectCurrentToken);

  const pathname = usePathname();
  const lastPartOfUrl = pathname.split("/").pop();
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isEmptyField, setIsEmptyField] = useState(false);

  const [selectCountry, setSelectCountry] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    code: "tr",
    label: "Türkiye",
    flag: "🇹🇷",
  });

  const [createAddress, createAddressMutation] = useCreateAddressMutation();
  const [updateAddress, updateAddressMutation] = useUpdateAnAddressMutation();

  const {
    data: address,
    isLoading: isFetchingAddress,
    isSuccess: isFetchedAddress,
  } = useGetAddressByIdQuery(lastPartOfUrl);

  const formik = useFormik<AddressFormValues>({
    initialValues: {
      fullName: "",
      address: "",
      city: "",
      postalCode: "",
      phoneNumber: "",
      countryCode: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const { fullName, address, city, postalCode, phoneNumber } = values;
      const newAddress = {
        nameAndSurname: fullName,
        address,
        city,
        postalCode,
        phone: phoneNumber,
        countryCode: selectedCountry.code,
      };

      if (!isEditing) {
        if (!token) {
          // Mevcut adresleri al
          let deliveryAddresses =
            JSON.parse(localStorage.getItem("deliveryAddress")) || [];

          // Yeni adresi mevcut adreslere ekle
          deliveryAddresses.push({
            ...newAddress,
            id: Math.floor(Math.random() * 1000),
          });

          // Yenilenen adres listesini tekrar local storage'a yaz
          localStorage.setItem(
            "deliveryAddress",
            JSON.stringify(deliveryAddresses)
          );

          router.push("/addresses");
        } else {
          createAddress(newAddress)
            .unwrap()
            .then((res) => {
              router.push("/addresses");
              customSuccess("Adresiniz başarıyla eklendi");
            })
            .catch((err) => {});
        }
      } else {
        if (!token) {
          const deliveryAddressLocal = JSON.parse(
            // @ts-ignore
            localStorage.getItem("deliveryAddress")
          );
          const addressFind = deliveryAddressLocal.find(
            (item: any) => item.id === Number(lastPartOfUrl)
          );
          if (addressFind) {
            addressFind.nameAndSurname = fullName;
            addressFind.address = address;
            addressFind.city = city;
            addressFind.postalCode = postalCode;
            addressFind.phone = phoneNumber;
            addressFind.countryCode = selectedCountry.code;
          }
          localStorage.setItem(
            "deliveryAddress",
            JSON.stringify(deliveryAddressLocal)
          );

          router.push("/addresses");
        } else {
          updateAddress({ id: lastPartOfUrl, address: newAddress })
            .unwrap()
            .then((res) => {
              router.push("/addresses");
              customSuccess("Adresiniz başarıyla güncellendi");
            })
            .catch((err) => {
              customError("Adresiniz güncellenirken bir hata oluştu");
            });
        }
      }
    },
  });

  useEffect(() => {
    if (!token) {
      if (lastPartOfUrl !== "add-address") {
        setIsEditing(true);

        const addressLocal = JSON.parse(
          // @ts-ignore
          localStorage.getItem("deliveryAddress")
        );
        const addressFind = addressLocal.find(
          (item: any) => item.id === Number(lastPartOfUrl)
        );
        if (addressFind) {
          formik.setValues({
            fullName: addressFind.nameAndSurname || "",
            address: addressFind.address || "",
            city: addressFind.city || "",
            postalCode: addressFind.postalCode || "",
            phoneNumber: addressFind.phone || "",
            countryCode: addressFind.countryCode || "",
          });
        }
      }
    }
  }, []);

  useEffect(() => {
    if (lastPartOfUrl !== "add-address") {
      setIsEditing(true);
      if (isFetchedAddress) {
        formik.setValues({
          fullName: address?.address?.nameAndSurname || "",
          address: address?.address?.address || "",
          city: address?.address?.city || "",
          postalCode: address?.address?.postalCode || "",
          phoneNumber: address?.address?.phone || "",
          countryCode: address?.address?.countryCode || "",
        });
      }
      if (isFetchedAddress) {
        setSelectedCountry({
          code: address?.address?.country.code || "",
          label:
            address?.address?.country.name.charAt(0).toUpperCase() +
              address?.address?.country.name.slice(1) || "",
          flag: address?.address?.country.emoji || "",
        });
      }
    }
  }, [isFetchedAddress]);

  const handleAddressAdd = () => {
    if (
      formik.values.fullName === "" ||
      formik.values.address === "" ||
      formik.values.city === "" ||
      formik.values.postalCode === "" ||
      formik.values.phoneNumber === ""
    ) {
      setIsEmptyField(true);
      return;
    }
    setShowModal(true);
  };

  const handleModalConfirm = () => {
    formik.handleSubmit(); // Formu gönder
    setShowModal(false); // Modali kapat
  };

  const handleModalCancel = () => {
    setShowModal(false);
    setIsEmptyField(false);
  };

  if (isFetchingAddress) return <Loading />;

  // @ts-ignore
  return (
    <>
      {selectCountry ? (
        <CountrySelect
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          setSelectCountry={setSelectCountry}
        />
      ) : (
        <div className="flex flex-col items-center justify-center p-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddressAdd();
            }}
            className="space-y-4"
          >
            <div className="flex items-start justify-center flex-col">
              <div className="flex w-full flex-col mr-4">
                <input
                  className={`shadow w-full appearance-none border rounded p-4 font-semibold text-[14px]placeholder:font-semibold ${
                    formik.errors.fullName ? "border-red-500" : ""
                  }`}
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Adınız ve Soyadınız"
                  onChange={formik.handleChange}
                  value={formik.values.fullName}
                />
                <div>
                  {formik.errors.fullName ? (
                    <div className="text-red-500 text-sm">
                      {formik.errors.fullName}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <div>
              <input
                className={`shadow w-full appearance-none border rounded p-4 font-semibold text-[14px]placeholder:font-semibold ${
                  formik.errors.address ? "border-red-500" : ""
                }`}
                id="address"
                name="address"
                type="text"
                placeholder="Adres"
                onChange={formik.handleChange}
                value={formik.values.address}
              />
              {formik.errors.address ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.address}
                </div>
              ) : null}
            </div>

            <div className="flex w-full flex-col mr-4">
              <IconButton
                onClick={() => setSelectCountry(true)}
                className="border shadow"
                svgIcon={ICONS.downArrow}
              >
                <div className="flex flex-row items-center">
                  <Image
                    src={
                      // @ts-ignore
                      ICONS[selectedCountry.code]
                    }
                    alt={selectedCountry.code}
                    className="h-6 w-6"
                  />
                  <span className="text-[16px] ml-4">
                    {selectedCountry.label}
                  </span>
                </div>
              </IconButton>
            </div>

            <div>
              <div className="flex items-start justify-center">
                <div className="flex w-full flex-col mr-4">
                  <input
                    className={`shadow w-full appearance-none border rounded p-4 font-semibold text-[14px]placeholder:font-semibold ${
                      formik.errors.city ? "border-red-500" : ""
                    }`}
                    id="city"
                    name="city"
                    type="text"
                    placeholder="Şehir"
                    onChange={formik.handleChange}
                    value={formik.values.city}
                  />
                </div>
                <div className="flex w-full flex-col">
                  <input
                    className={`shadow w-full appearance-none border rounded p-4 font-semibold text-[14px]placeholder:font-semibold ${
                      formik.errors.postalCode ? "border-red-500" : ""
                    }`}
                    id="postalCode"
                    name="postalCode"
                    type="text"
                    placeholder="Posta Kodu"
                    onChange={formik.handleChange}
                    value={formik.values.postalCode}
                  />
                </div>
              </div>
            </div>
            <div>
              <input
                className={`shadow w-full appearance-none border rounded p-4 font-semibold text-[14px]placeholder:font-semibold ${
                  formik.errors.phoneNumber ? "border-red-500" : ""
                }`}
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                placeholder="Telefon Numarası"
                onChange={formik.handleChange}
                value={formik.values.phoneNumber}
              />
            </div>
            <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300">
              <div className="flex justify-center py-2">
                <button
                  className="h-12 m-2 w-full bg-primary hover:bg-green-800 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-300"
                  type="submit"
                >
                  {isEditing ? "Güncelle" : "Kaydet"}
                </button>
              </div>
            </div>
          </form>
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div
                className="fixed inset-0 bg-black opacity-50"
                onClick={handleModalCancel}
              ></div>

              <div className="bg-white rounded-lg w-5/6 md:max-w-md mx-auto p-4 z-10 flex flex-col items-center">
                <div className="bg-white rounded-full p-4 -mt-14 mb-4 ">
                  <Image
                    src={ICONS.warning}
                    alt={"warning"}
                    className="h-12 w-12"
                  />
                </div>
                <p className="text-center mb-2">
                  Adres bilgilerinizi eksiksiz ve dogru girdiginize emin
                  misiniz?
                </p>
                <p className="text-center">
                  <p className="text-primary"> {formik.values.fullName} </p>
                  {formik.values.address} <br />
                  {formik.values.city} <br />
                  {formik.values.postalCode}
                  {formik.values.phoneNumber}
                </p>
                <div className="flex justify-center mt-6 space-x-4 w-full">
                  <button
                    className="px-4 py-2 text-primary w-full"
                    onClick={handleModalCancel}
                  >
                    Vazgeç
                  </button>
                  <Button
                    className="px-4 py-2 text-white bg-primary hover:bg-green-800 font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-300"
                    onClick={handleModalConfirm}
                  >
                    Evet
                  </Button>
                </div>
              </div>
            </div>
          )}
          {isEmptyField && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div
                className="fixed inset-0 bg-black opacity-50"
                onClick={handleModalCancel}
              ></div>

              <div className="bg-white rounded-lg w-5/6 md:max-w-md mx-auto p-4 z-10 flex flex-col items-center">
                <div className="bg-white rounded-full p-4 -mt-14 mb-4 ">
                  <Image
                    src={ICONS.warning}
                    alt={"warning"}
                    className="h-12 w-12"
                  />
                </div>
                <p className="text-center mb-2">
                  Lütfen bos alanlari doldurun, tüm alanlar zorunludur.
                </p>
                <div className="flex justify-center mt-6 space-x-4 w-full">
                  <Button
                    className="px-4 py-2 text-primary w-full"
                    onClick={handleModalCancel}
                  >
                    Tamam
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AddressForm;
