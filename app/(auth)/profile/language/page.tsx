'use client'
import React, { useState } from 'react';
import { IoMdRadioButtonOff, IoMdRadioButtonOn } from "react-icons/io";

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

const languages: Language[] = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', label: 'Italiano', flag: '🇮🇹' },
    { code: 'pt', label: 'Português', flag: '🇵🇹' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
    { code: 'ja', label: '日本語', flag: '🇯🇵' },
    { code: 'zh', label: '中文', flag: '🇨🇳' },
    { code: 'de-at', label: 'Almanya', flag: '🇦🇹' },
    { code: 'fr-fr', label: 'Fransa', flag: '🇫🇷' },
    { code: 'at', label: 'Avusturya', flag: '🇦🇹' },
    { code: 'ch', label: 'Isvicre', flag: '🇨🇭' },
    { code: 'nl', label: 'Hollanda', flag: '🇳🇱' },
    { code: 'be', label: 'Belcika', flag: '🇧🇪' },
    { code: 'sg', label: 'Sia', flag: '🇸🇬' },
    { code: 'en-gb', label: 'Ingiltere', flag: '🇬🇧' },
    { code: 'se', label: 'Isvec', flag: '🇸🇪' },
    { code: 'no', label: 'Norvec', flag: '🇳🇴' },
    { code: 'dk', label: 'Danimarka', flag: '🇩🇰' },
    { code: 'fi', label: 'Finlandiya', flag: '🇫🇮' },
    { code: 'it-it', label: 'Italya', flag: '🇮🇹' },
    { code: 'es-es', label: 'Ispanya', flag: '🇪🇸' },
    { code: 'ie', label: 'Irlanda', flag: '🇮🇪' },
    { code: 'lu', label: 'Luksemburg', flag: '🇱🇺' },
    { code: 'pt-pt', label: 'Portekiz', flag: '🇵🇹' },
    { code: 'us', label: 'Amerika Birlesik Devletleri', flag: '🇺🇸' },
    { code: 'ca', label: 'Canada', flag: '🇨🇦' },
];

const CustomRadio: React.FC<CustomRadioProps> = ({ code, label, flag, selectedLanguage, handleLanguageChange }) => {
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
                        <IoMdRadioButtonOn className="text-primary mr-4 h-6 w-6" />
                    ) : (
                        <IoMdRadioButtonOff className="text-gray-300 mr-4 h-6 w-6" />
                    )}
                </div>
            </div>
        </div>
    );
};

const LanguageSelector: React.FC = () => {
    const [selectedLanguage, setSelectedLanguage] = useState<string>('en');

    const handleLanguageChange = (code: string) => {
        setSelectedLanguage(code);
    };

    return (
        <div className="">
            {languages.map((language) => (
                <div key={language.code} className="">
                    <CustomRadio
                        code={language.code}
                        label={language.label}
                        flag={language.flag}
                        selectedLanguage={selectedLanguage}
                        handleLanguageChange={handleLanguageChange}
                    />
                </div>
            ))}
        </div>
    );
};

export default LanguageSelector;
