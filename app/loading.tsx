"use client";

import Lottie from "lottie-react";
import logo from "@/constants/lotties/logo.json";

export default function Loading() {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-50 bg-gray-100">
      <Lottie animationData={logo} loop={true} className="h-32 w-32" />
    </div>
  );
}
