import * as Yup from "yup";

import { BsEye, BsEyeSlash } from "react-icons/bs";
import { Formik, FormikHelpers } from "formik";
import React, { useEffect, useState } from "react";

import Button from "@/components/button";
import Link from "next/link";
import { customError } from "@/components/CustomToast";
import { setCredentials } from "@/redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "@/redux/features/auth/authApiSlice";
import { useRouter } from "next/navigation";

interface ILoginForm {
  email: string;
  password: string;
}

interface IUser {
  email: string;
  name: string;
  surname: string;
  phone: string | null;
  token: string;
}

interface ISession {
  session: {
    user: IUser;
    expires: string;
  };
}

const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errMsg, setErrMsg] = useState<string>("");

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const router = useRouter();

  const initialValues: ILoginForm = {
    email: "",
    password: "",
  };

  const handleSubmit = async (
    values: ILoginForm,
    { setSubmitting }: FormikHelpers<ILoginForm>
  ) => {
    try {
      const userData = await login({
        username: values.email,
        password: values.password,
      }).unwrap();
      const { access_token } = userData;
      localStorage.setItem("token", access_token);
      dispatch(setCredentials({ ...userData }));
      setIsAuthenticated(true);
    } catch (err) {
      customError(
        "Giriş yapılırken bir hata oluştu. Lütfen kullanıcı adı ve şifrenizi kontrol edin."
      );
      // @ts-ignore
      if (!err.response) {
        setErrMsg("No server response");
      } else {
        // @ts-ignore
        if (err.response?.status === 400) {
          setErrMsg("Invalid credentials");
        } else {
          // @ts-ignore
          if (err.response?.status === 401) {
            setErrMsg("Unauthorized");
          } else {
            setErrMsg("Something went wrong");
          }
        }
      }
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated]);

  return (
    <div className="w-full flex flex-col items-center ">
      {isAuthenticated ? (
        <p className="text-green-500 font-semibold my-4">
          Başarı ile giriş yapıldı. Yönlendiriliyorsunuz...
        </p>
      ) : (
        <Formik
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email("Lütfen geçerli bir e-posta girin")
              .required("E-posta adresi zorunlu"),
            password: Yup.string()
              .required("Şifre alanı boş bırakılamaz")
              .min(3, "Şifre en az 3 karakterden oluşmalıdır."),
          })}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            errors,
            touched,
            isSubmitting,
          }) => (
            <form className="w-full" noValidate onSubmit={handleSubmit}>
              <div className="flex items-start justify-center flex-col">
                <input
                  name="email"
                  className={`shadow w-full appearance-none border rounded p-4 my-2 font-semibold text-deepgray placeholder:font-semibold ${
                    errorMessage ? "invalid:border-pink-500" : ""
                  }`}
                  onChange={handleChange}
                  value={values.email}
                  id="email"
                  placeholder="E-posta adresi"
                  type="email"
                />
              </div>
              <div className="flex items-start justify-center flex-col relative">
                <input
                  name="password"
                  className={`shadow w-full appearance-none border rounded p-4 my-2 font-semibold text-deepgray placeholder:font-semibold ${
                    errorMessage ? "invalid:border-pink-500" : null
                  }`}
                  onChange={handleChange}
                  value={values.password}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Şifre"
                />
                <div
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <BsEyeSlash size={20} />
                  ) : (
                    <BsEye size={20} />
                  )}
                </div>
                {errorMessage && (
                  <p className="text-red-500 text-xs font-200">
                    {errorMessage}
                  </p>
                )}
              </div>
              <div className="my-4">
                <Link href="/forgot-password" className="font-bold">
                  Şifrenizi mi unuttunuz?
                </Link>
              </div>
              <Button className="w-full" type="submit">
                Giriş yap
              </Button>
            </form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default LoginForm;
