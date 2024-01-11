"use client";
import { logOut, selectCurrentToken } from "@/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

type Props = {
  children: ReactNode;
};

const AuthWrapper = ({ children }: Props) => {
  const dispatch = useDispatch();
  const { push } = useRouter();
  const token = useSelector(selectCurrentToken);

  useEffect(() => {
    if (!token) {
      push("/auth/login");
      // will explain this in a moment
      dispatch(logOut);
    }
  }, [dispatch, token, push]);
  return children;
};

export default AuthWrapper;
