'use client'
import React, {useEffect, useState} from 'react';
import {IoMdRadioButtonOff, IoMdRadioButtonOn} from "react-icons/io";
import { useGetCountriesQuery } from "@/redux/features/countriesApiSlice";
import Loading from "@/app/loading";

interface Language {
    code: string;
    label: string;
    flag: string;
}

interface CustomRadioProps {
    code: string;
    label: string;
    flag: string;
    selectedLanguage: string;
    handleLanguageChange: (code: string) => void;
}

const countries: Country[] = [
    {code: 'tr', label: 'Türkiye', flag: '🇹🇷'},
    {code: 'es', label: 'İspanya', flag: '🇪🇸'},
    {code: 'fr', label: 'Fransa', flag: '🇫🇷'},
    {code: 'de', label: 'Almanya', flag: '🇩🇪'},
    {code: 'it', label: 'İtalya', flag: '🇮🇹'},
    {code: 'pt', label: 'Portekiz', flag: '🇵🇹'},
    {code: 'at', label: 'Avusturya', flag: '🇦🇹'},
    {code: 'ch', label: 'İsviçre', flag: '🇨🇭'},
    {code: 'nl', label: 'Hollanda', flag: '🇳🇱'},
    {code: 'be', label: 'Belçika', flag: '🇧🇪'},
    {code: 'gb', label: 'İngiltere', flag: '🇬🇧'},
    {code: 'se', label: 'İsveç', flag: '🇸🇪'},
    {code: 'no', label: 'Norveç', flag: '🇳🇴'},
    {code: 'dk', label: 'Danimarka', flag: '🇩🇰'},
    {code: 'fi', label: 'Finlandiya', flag: '🇫🇮'},
    {code: 'ie', label: 'İrlanda', flag: '🇮🇪'},
    {code: 'lu', label: 'Lüksemburg', flag: '🇱🇺'},
    {code: 'no', label: 'Norveç', flag: '🇳🇴'},
];

interface Country {
    code: string;
    label: string;
    flag: string;
}

const CustomRadio: React.FC<CustomRadioProps> = ({code, label, flag, selectedLanguage, handleLanguageChange}) => {
    return (
        <div className="flex bg-white flex-row items-center border">
            <div
                className={`flex items-center w-full h-11 px-4`}
                onClick={() => handleLanguageChange(code)}
            >
                <div className="flex items-center">
                    <div className="flex flex-col">
                        {flag}
                    </div>
                </div>
                <span className="text-sm font-bold ml-4">{label}</span>
            </div>
            <div>
                <div className="flex items-center">
                    {selectedLanguage === code ? (
                        <IoMdRadioButtonOn className="text-primary mr-4 h-6 w-6"/>
                    ) : (
                        <IoMdRadioButtonOff className="text-gray-300 mr-4 h-6 w-6"/>
                    )}
                </div>
            </div>
        </div>
    );
};

// ... (other imports and code)

const LanguageSelector: React.FC<{
    selectedCountry: Language;
    setSelectedCountry: (country: Language) => void;
    setSelectCountry: (selectCountry: boolean) => void;
}> = ({selectedCountry, setSelectedCountry, setSelectCountry}) => {
    const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
    const { data, error, isLoading } = useGetCountriesQuery();

    const handleLanguageChange = (code: string) => {
        const country = countries.find(country => country.code === code);
        if (country) {
            setSelectedCountry(country);
            setSelectCountry(false);
        }

    };

    let content;

    if (isLoading) {
        content = <Loading />;
    } else if (data) {
        const filteredCountries = countries.filter(country => data.countries.some(apiCountry => apiCountry.code === country.code));


        console.log(data.countries[0].code)

        content = (
            <div className="">
                {filteredCountries.map((country) => (
                    <div key={country.code} className="">
                        <CustomRadio
                            code={country.code}
                            label={country.label}
                            flag={country.flag}
                            selectedLanguage={selectedCountry.code}
                            handleLanguageChange={handleLanguageChange}
                        />
                    </div>
                ))}
            </div>
        );
    }

    return content;
};


export default LanguageSelector;
