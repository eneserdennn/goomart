"use client";

import React, { useState } from "react";

import BottomNavBar from "@/components/bottom-navbar/BottomNavBar";
import Toggle from "@/components/Toggle";

interface Pref {
  title: string;
  description: string;
  isEnabled: boolean;
}

const ContactPrefs = () => {
  const initialPrefs: Pref[] = [
    {
      title: "E-Posta",
      description: "Kampanyalarla ilgili e-posta almak istiyorum.",
      isEnabled: false,
    },
    {
      title: "Bildirim",
      description: "Kampanyalarla ilgili bildirim almak istiyorum.",
      isEnabled: false,
    },
    {
      title: "SMS",
      description: "Kampanyalarla ilgili SMS almak istiyorum.",
      isEnabled: false,
    },
    {
      title: "Telefon",
      description: "Kampanyalarla ilgili cep telefonunda aranmak istiyorum.",
      isEnabled: false,
    },
  ];

  const [prefs, setPrefs] = useState<Pref[]>(initialPrefs);

  const handleToggle = (index: number) => {
    const newPrefs = [...prefs];
    newPrefs[index].isEnabled = !newPrefs[index].isEnabled;
    setPrefs(newPrefs);
  };

  return (
    <div className="flex flex-col">
      {prefs.map((pref, index) => (
        <div
          key={index}
          className="flex items-center justify-between border pr-[30px] pl-[15px] py-[20px] bg-white"
        >
          <div className="flex flex-col">
            <span className="text-[15px] font-bold">{pref.title}</span>
            <span className="text-[13px] font-semibold text-deepgray">
              {pref.description}
            </span>
          </div>
          <Toggle
            isEnabled={pref.isEnabled}
            onToggle={() => handleToggle(index)}
          />
        </div>
      ))}
      <BottomNavBar />
    </div>
  );
};

export default ContactPrefs;
