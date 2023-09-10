"use client";

import "react-phone-input-2/lib/bootstrap.css";

import * as Yup from "yup";

import { Field, Form, Formik, FormikHelpers } from "formik";
import React, { useEffect, useState } from "react";

import AddAddressForm from "@/components/address/AddAddressForm";
import CountrySelect from "@/components/country-select/CountrySelect";
import Loading from "@/app/loading";
import PhoneInput from "react-phone-input-2";
import { useGetCountriesQuery } from "@/redux/features/countriesApiSlice";

interface IFormValues {
  nameSurname: string;
  address: string;
  countryCode: string;
  city: string;
  zipCode: string;
  areaCode: string;
  phoneNumber: string;
}

interface Values {
  firstName: string;
  lastName: string;
  email: string;
}

const AddAddress: React.FC = () => {
  const { data, isLoading, isError, isSuccess } = useGetCountriesQuery();

  const [countries, setCountries] = useState<string[]>([]);
  const [countryCodes, setCountryCodes] = useState<string[]>([]);

  useEffect(() => {
    if (isSuccess && data) {
      setCountries(data.countries.map((country) => country.name));
      setCountryCodes(
        data.countries.map((country) => country.code.toUpperCase())
      );
    }
  }, [isSuccess, data]);

  // const initialValues: IFormValues = {
  //   nameSurname: "",
  //   address: "",
  //   countryCode: "+90",
  //   city: "",
  //   zipCode: "",
  //   areaCode: "",
  //   phoneNumber: "",
  // };

  // const validationSchema = Yup.object().shape({
  //   nameSurname: Yup.string()
  //     .required("Ad Soyad alanı zorunlu")
  //     .max(100, "Ad Soyad alanı çok uzun"),
  //   address: Yup.string().required("Adres alanı zorunlu"),
  //   countryCode: Yup.string().required(),
  //   city: Yup.string().required("Şehir alanı zorunlu"),
  //   zipCode: Yup.string().required("Posta Kodu alanı zorunlu"),
  //   areaCode: Yup.string().required("Alan Kodu zorunlu"),
  //   phoneNumber: Yup.string()
  //     .required("Telefon Numarası zorunlu")
  //     .matches(/^\+?[0-9]+$/, "Geçerli bir telefon numarası girin"),
  // });

  // const handleSubmit = (values: IFormValues) => {
  //   // Handle form submission here
  // };

  let content;

  if (isLoading) {
    content = <Loading />;
  } else if (isError) {
    content = <div>error</div>;
  } else if (isSuccess) {
    content = <AddAddressForm />;
  }

  return content;
};

export default AddAddress;
