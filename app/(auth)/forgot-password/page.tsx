'use client';
import React, {useEffect, useState} from 'react';
import * as Yup from 'yup';
import {Field, Form, Formik} from 'formik';
import Button from '@/components/button';
import ForgotPassword from '../../../public/assets/images/forgot-password.svg';
import Verification from '../../../public/assets/images/verification.svg';
import Image from "next/image";
import Link from "next/link";
import OtpInput from 'react-otp-input';
import {
    useForgotPasswordMutation,
    useVerifyForgottenPasswordCodeMutation,
    useChangeForgetPasswordMutation
} from "@/redux/api/authSlice";
import {useDispatch, useSelector} from 'react-redux';
import {setEmail, setVerificationCode} from "@/redux/features/forgotPasswordSlice";
import {RootState} from "@/redux/store";
import {BsEyeSlash, BsEye} from 'react-icons/bs';
import {useRouter} from 'next/navigation';


const ForgotPasswordForm = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const [emailSent, setEmailSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [otpConfirmed, setOtpConfirmed] = useState(false);
    const [resendCodeTimer, setResendCodeTimer] = useState(60);

    const [verifyForgottenPasswordCode] = useVerifyForgottenPasswordCodeMutation();
    const [changeForgetPassword] = useChangeForgetPasswordMutation();
    const [forgotPassword] = useForgotPasswordMutation();

    const forgotPasswordState = useSelector((state: RootState) => state.forgotPassword);

    const initialValues = {
        email: '',
    };

    const handleSubmit = async (values) => {
        try {
            const result = await forgotPassword({
                email: values.email
            }).unwrap();

            dispatch(setEmail(values.email));
            setEmailSent(true);
            setErrorMessage(null); // Başarı durumunda hata mesajını temizle
        } catch (err) {
            console.log(err.data)
            if (err.data.message === "User not found") { // Sunucudan dönen hata mesajına göre kontrol et
                setErrorMessage("E-posta adresi ile iliskili kayitli hesap bulunamadi. "); // Kullanıcıya gösterilecek hata mesajı
            } else {
                console.error(err);
            }
        }
    };

    const handleSubmitVerification = async () => {
        try {
            const result = await verifyForgottenPasswordCode({
                email: forgotPasswordState.email,
                verificationCode: otp
            }).unwrap();

            if (result.statusCode === 200) {
                dispatch(setVerificationCode(otp));
                setOtpConfirmed(true);
            }
        } catch (err) {
            console.error(err);
            // Hata durumunda kullanıcıya bildirim göstermek
        }
    };

    const handleChangePassword = async (newPassword: string) => {
        try {
            const result = await changeForgetPassword({
                email: forgotPasswordState.email,
                newPassword: newPassword,
                verificationCode: forgotPasswordState.verificationCode
            }).unwrap();

            // Check if the password change was successful
            if (result.statusCode === 200) {
                setPasswordChangeSuccess(true);
            }
        } catch (err) {
            console.error(err);
            // Hata durumunda kullanıcıya bildirim göstermek
        }
    };


    const timer = () => {
        setTimeout(() => {
            setResendCodeTimer(resendCodeTimer - 1);
        }, 1000);
    }

    useEffect(() => {
        if (resendCodeTimer > 0) {
            timer();
        }
    }, [resendCodeTimer]);


    const emailSentForm = () => {
        return (
            <div className="items-center justify-center flex flex-col p-10">
                <div className="flex items-center justify-center">
                    <Image src={Verification} alt="Verification" className="my-2"/>
                </div>
                <div className="flex items-start justify-center flex-row">
                            <span className="font-semibold text-gray-500">
                               <span className="font-semibold text-primary">
                                      {forgotPasswordState.email}
                            </span> adresine tek kullanımlık şifre gönderildi.
                            </span>
                </div>
                <div className="items-center justify-center flex flex-col p-4">
                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={4}
                        renderSeparator={<span></span>}
                        inputStyle={{
                            width: '4rem',
                            height: '4rem',
                            margin: '0 0.6rem',
                            fontSize: '1.5rem',
                            borderRadius: 16,
                            border: '1px solid rgba(0,0,0,0.15)',
                        }}
                        renderInput={(props) => (
                            <input
                                {...props}
                            />
                        )}
                    />
                </div>
                <div className="flex items-start justify-center flex-row w-full mt-3">
                    <Button className="w-full" onClick={handleSubmitVerification}>
                        Şifreyi Onayla
                    </Button>
                </div>
                <div className="flex items-start justify-center flex-row w-full mt-3">
                    <span className="font-semibold text-gray-500">
                        Kodu almadınız mı?
                    </span>
                    {resendCodeTimer > 0 ? (
                        <div className="ml-1 font-semibold text-gray-700">
                            {resendCodeTimer} saniye sonra tekrar göndermeyi deneyin.
                        </div>
                    ) : (
                        <div className="ml-1 font-semibold text-primary" onClick={() => {
                            setResendCodeTimer(60);
                            handleSubmit({email: forgotPasswordState.email})
                            // console.log("resend", forgotPasswordState.email)
                        }
                        }>
                            Tekrar Gönder
                        </div>
                    )}
                </div>
            </div>
        )
    }

    const newPasswordForm = () => {
        const validationSchema = Yup.object().shape({
            newPassword: Yup.string()
                .required('Password is required')
                .min(8, 'Password must be longer than or equal to 8 characters')
                .max(20, 'Password must be shorter than or equal to 20 characters'),
            newPasswordConfirm: Yup.string()
                .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
        });

        const handleSubmitNew = (values) => {
            handleChangePassword(values.newPassword);
        };

        return (
            <div>
                {passwordChangeSuccess ? (
                    <div className="items-center justify-center flex flex-col p-10">
                        <div className="flex items-center justify-center">
                            <Image src={Verification} alt="Success" className="my-2"/>
                        </div>
                        <div className="flex items-start justify-center flex-row">
                                <span className="font-semibold text-gray-500">
                                    Şifreniz başarıyla değiştirildi.
                                </span>
                        </div>
                        <div className="flex items-start justify-center flex-row w-full mt-3">
                            <Button className="w-full" onClick={() => {
                                router.push("/login")
                            }}>
                                Giriş Yap
                            </Button>
                        </div>
                    </div>
                ) : (
                    <Formik initialValues={{newPassword: '', newPasswordConfirm: ''}}
                            validationSchema={validationSchema} onSubmit={handleSubmitNew}>
                        {({values, handleChange, errors, touched}) => (
                            <Form
                                className="items-center justify-center flex flex-col p-10"> {/* Form etiketini Formik'ten kullan */}
                                <div className="flex items-center justify-center">
                                    <Image src={Verification} alt="New Password" className="my-2"/>
                                </div>
                                <div className="relative flex items-start justify-center flex-row w-full mt-3">
                                    <input
                                        name="newPassword"
                                        type={showPassword ? "text" : "password"}
                                        className="shadow w-full appearance-none border rounded p-4 my-2 font-semibold text-deepgray placeholder:font-semibold border-gray-200 pr-10"
                                        placeholder="Yeni şifrenizi girin"
                                        value={values.newPassword}
                                        onChange={handleChange}
                                    />
                                    <div
                                        className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <BsEyeSlash size={20}/> : <BsEye size={20}/>}
                                    </div>
                                </div>
                                <div className="relative flex items-start justify-center flex-row w-full mt-3">
                                    <input
                                        name="newPasswordConfirm"
                                        type={showConfirmPassword ? "text" : "password"}
                                        className="shadow w-full appearance-none border rounded p-4 my-2 font-semibold text-deepgray placeholder:font-semibold border-gray-200 pr-10"
                                        placeholder="Yeni şifrenizi tekrar girin"
                                        value={values.newPasswordConfirm}
                                        onChange={handleChange}
                                    />
                                    {errors.newPasswordConfirm && touched.newPasswordConfirm &&
                                        <div className="text-red-500">{errors.newPasswordConfirm}</div>}
                                    <div
                                        className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? <BsEyeSlash size={20}/> : <BsEye size={20}/>}
                                    </div>
                                </div>
                                <div className="flex items-start justify-center flex-row w-full mt-3">
                                    <Button className="w-full" onClick={handleSubmitNew}> Şifreyi Onayla </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                )}
            </div>
        )
    }


    return (
        <div>
            <div className="w-full flex flex-col">
                {emailSent ? (
                    <div>
                        {
                            otpConfirmed ? (
                                <div>
                                    {newPasswordForm()}
                                </div>
                            ) : (
                                <div>
                                    {emailSentForm()}
                                </div>
                            )
                        }
                    </div>

                ) : (
                    <div>
                        <Formik
                            onSubmit={handleSubmit}
                            initialValues={initialValues}
                            validationSchema={Yup.object().shape({
                                email: Yup.string().email('Lütfen geçerli bir e-posta girin').required('E-posta adresi zorunlu'),
                            })}
                        >
                            {({values, handleChange, handleSubmit}) => (
                                <form className="w-full items-center justify-center flex flex-col p-8"
                                      onSubmit={handleSubmit}>
                                    <div className="flex items-center justify-center">
                                        <Image src={ForgotPassword} alt="Forgot Password" className="my-5"/>
                                    </div>
                                    <div className="flex items-start justify-center flex-col w-full">
                                        <input
                                            name="email"
                                            className={`shadow w-full appearance-none border rounded p-4 my-2 font-semibold text-deepgray placeholder:font-semibold ${
                                                errorMessage ? 'border-red-500' : 'border-gray-200'
                                            }`}
                                            onChange={handleChange}
                                            value={values.email}
                                            id="email"
                                            placeholder="E-posta adresi"
                                            type="email"
                                        />

                                        {errorMessage ? (
                                            <p className="text-red-500 text-sm font-semibold font-200">
                                                {errorMessage}
                                            </p>
                                        ) : (
                                            <span className="text-sm font-semibold text-gray-500">E-postanıza tek kullanımlık bir kod göndereceğiz.</span>
                                        )}
                                    </div>
                                    <Button type="submit" className="mt-6" style={{fontSize: '1.1rem'}}>
                                        Kodu Gönder
                                    </Button>
                                </form>
                            )}
                        </Formik>
                        <div className="flex items-start ml-8 text-primary font-semibold">
                            <Link href="/">
                                Yardıma ihtiyacım var
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ForgotPasswordForm;
