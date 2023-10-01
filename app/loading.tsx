"use client";

import Lottie from "lottie-react";
import logo from "@/constants/lotties/logo.json";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Lottie animationData={logo} loop={true} className="h-32 w-32" />
    </div>
  );
}
