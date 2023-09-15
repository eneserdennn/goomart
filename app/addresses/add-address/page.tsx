"use client";

import "react-phone-input-2/lib/bootstrap.css";
import React, { useEffect, useState } from "react";
import AddAddressForm from "@/components/address/AddAddressForm";
import Loading from "@/app/loading";
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

interface CountryInfo {
  name: string;
  code: string;
  image: string;
  shipmentFee: number;
  canFreeShip: boolean;
  minCartValue: number;
  minFreeShipCartValue: number;
}


const AddAddress: React.FC = () => {
  const { data, isLoading, isError, isSuccess } = useGetCountriesQuery({});

  const [countries, setCountries] = useState<string[]>([]);
  const [countryCodes, setCountryCodes] = useState<string[]>([]);

  useEffect(() => {
    if (isSuccess && data) {
      setCountries(data.countries.map((country: CountryInfo) => country.name));
      setCountryCodes(data.countries.map((country: CountryInfo) => country.code.toUpperCase()));
    }
  }, [isSuccess, data]);



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
