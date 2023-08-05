import React, {useEffect, useState} from 'react';
import Link from "next/link";

import * as Yup from 'yup';

import {useLoginMutation} from "@/redux/api/authSlice";
import {useRouter} from "next/navigation";

import {Formik} from 'formik';
import {BsEye, BsEyeSlash} from 'react-icons/bs';
import Button from '@/components/button';

interface ILoginForm {
    email: string;
    password: string;
}


const LoginForm:React.FC = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [loginMutation, {isLoading, error, data}] = useLoginMutation();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const router = useRouter()

    const initialValues = {
        email: '',
        password: '',
    };

    const handleSubmit = async (values: ILoginForm) => {
        try {
            const result = await loginMutation({username: values.email, password: values.password}).unwrap();
            if (result.access_token) {
                localStorage.setItem('token', result.access_token);
                setIsAuthenticated(true);
            }
        } catch (err: any) {
            console.error(err);
            if (err.data.message === "User not found") {
                setErrorMessage("E-posta adresi ile iliskili kayitli hesap bulunamadi. ");
            } else if (err.data.statusCode === 401) {
                setErrorMessage("Şifre hatalı. Lütfen tekrar deneyin.");
            }
            console.log(errorMessage)
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            router.push('/')
        }
    }, [isAuthenticated])

    return (
        <div className="w-full flex flex-col items-center">
            {isAuthenticated ? (
                <p className="text-green-500 font-semibold my-4">
                    Başarı ile giriş yapıldı. Yönlendiriliyorsunuz...
                </p>
            ) : (
                <Formik
                    onSubmit={handleSubmit}
                    initialValues={initialValues}
                    validationSchema={Yup.object().shape({
                        email: Yup.string().email('Lütfen geçerli bir e-posta girin').required('E-posta adresi zorunlu'),
                        password: Yup.string().required('Şifre alanı boş bırakılamaz').min(3, 'Şifre en az 3 karakterden oluşmalıdır.'),
                    })}
                >
                    {({values, handleChange, handleSubmit, errors, touched}) => (
                        <>
                            <form className="w-full" noValidate onSubmit={handleSubmit}>
                                <div className="flex items-start justify-center flex-col">
                                    <input
                                        name="email"
                                        className={`shadow w-full appearance-none border rounded p-4 my-2 font-semibold text-deepgray placeholder:font-semibold ${
                                            errorMessage ? 'invalid:border-pink-500' : null
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
                                            errorMessage ? 'invalid:border-pink-500' : null
                                        }`}
                                        onChange={handleChange}
                                        value={values.password}
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Şifre"
                                    />
                                    <div
                                        className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <BsEyeSlash size={20}/> : <BsEye size={20}/>}
                                    </div>
                                    {errorMessage && (
                                        <p className="text-red-500 text-xs font-200">{errorMessage}</p>
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
                        </>
                    )}
                </Formik>
            )}
        </div>
    );
};

export default LoginForm;
