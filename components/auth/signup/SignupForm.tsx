'use client'

import * as Yup from 'yup';

import {BsEye, BsEyeSlash} from 'react-icons/bs';
import {MdCheckBox, MdCheckBoxOutlineBlank} from 'react-icons/md';
import React, {useState} from 'react';

import Button from '@/components/button';
import {Formik, FormikHelpers} from 'formik';
import {useRegisterMutation} from "@/redux/features/auth/authApiSlice";

interface ISignUpFormValues {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    subscribe: boolean;
}

const SignUpForm: React.FC = () => {
    const [register, {isLoading, error}] = useRegisterMutation();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errMessage, setErrMessage] = useState<string>('');


    const initialValues: ISignUpFormValues = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        subscribe: false, // New field for checkbox
    };

    const handleSubmit = async (values: ISignUpFormValues, setSubmitting: FormikHelpers<ISignUpFormValues>) => {
        console.log(values);
        const newUser = {
            email: values.email,
            password: values.password,
            name: values.firstName,
            surname: values.lastName,
            campaignConsent: values.subscribe
        }
        try {
            const result = await register(newUser).unwrap();
            console.log(result.message)

        } catch (err) {
            console.error(err)
            // @ts-ignore
            setErrMessage(err.data.message)
        }
    };

    return (
        <div className="w-full flex flex-col items-center">
            <Formik
                onSubmit={handleSubmit}
                initialValues={initialValues}
                validationSchema={Yup.object().shape({
                    firstName: Yup.string().required('Ad alanı zorunlu').max(50, 'Ad alanı çok uzun'),
                    lastName: Yup.string().required('Soyad alanı zorunlu').max(50, 'Soyad alanı çok uzun'),
                    email: Yup.string().email('Lütfen geçerli bir e-posta girin').required('E-posta adresi zorunlu'),
                    password: Yup.string().required('Şifre alanı boş bırakılamaz').min(8, 'Şifre en az 8 karakterden oluşmalıdır.'),
                    confirmPassword: Yup.string()
                        .oneOf([Yup.ref('password')], 'Şifreler eşleşmiyor')
                        .required('Şifre tekrarı zorunlu'),
                    subscribe: Yup.boolean().notRequired(),
                })}
            >
                {({values, handleChange, handleSubmit, errors, touched}) => (
                    <>
                        <form className="w-full" noValidate onSubmit={handleSubmit}>
                            <div className="flex items-start justify-center">
                                <div className="flex w-full flex-col mr-4">
                                    <input
                                        name="firstName"
                                        className={`shadow w-full appearance-none border rounded p-4 my-2 font-semibold text-deepgray placeholder:font-semibold ${
                                            errors.firstName && touched.firstName ? 'focus:border-red-500' : null
                                        }`}
                                        onChange={handleChange}
                                        value={values.firstName}
                                        id="firstName"
                                        placeholder="Ad"
                                        type="text"
                                    />
                                    {errors.firstName && touched.firstName && (
                                        <p className="text-red-500 text-xs font-200">{errors.firstName}</p>
                                    )}
                                </div>
                                <div className="flex w-full flex-col">
                                    <input
                                        name="lastName"
                                        className={`shadow w-full appearance-none border rounded p-4 my-2 font-semibold text-deepgray placeholder:font-semibold ${
                                            errors.lastName && touched.lastName ? 'invalid:border-pink-500' : null
                                        }`}
                                        onChange={handleChange}
                                        value={values.lastName}
                                        id="lastName"
                                        placeholder="Soyad"
                                        type="text"
                                    />
                                    {errors.lastName && touched.lastName && (
                                        <p className="text-red-500 text-xs font-200">{errors.lastName}</p>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-start justify-center flex-col">
                                <input
                                    name="email"
                                    className={`shadow w-full appearance-none border rounded p-4 my-2 font-semibold text-deepgray placeholder:font-semibold ${
                                        errors.email && touched.email ? 'invalid:border-pink-500' : null
                                    }`}
                                    onChange={handleChange}
                                    value={values.email}
                                    id="email"
                                    placeholder="E-posta adresi"
                                    type="email"
                                />
                                {errors.email && touched.email && (
                                    <p className="text-red-500 text-xs font-200">{errors.email}</p>
                                )}
                            </div>
                            <div className="flex items-start justify-center flex-col relative">
                                <input
                                    name="password"
                                    className={`shadow w-full appearance-none border rounded p-4 my-2 font-semibold text-deepgray placeholder:font-semibold ${
                                        errors.password && touched.password ? 'invalid:border-pink-500' : null
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
                                {errors.password && touched.password && (
                                    <p className="text-red-500 text-xs font-200">{errors.password}</p>
                                )}
                            </div>

                            <div className="flex items-start justify-center flex-col relative">
                                <input
                                    name="confirmPassword"
                                    className={`shadow w-full appearance-none border rounded p-4 my-2 font-semibold text-deepgray placeholder:font-semibold ${
                                        errors.confirmPassword && touched.confirmPassword ? 'invalid:border-pink-500' : null
                                    }`}
                                    onChange={handleChange}
                                    value={values.confirmPassword}
                                    id="confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    placeholder="Şifreyi Onayla"
                                />
                                <div
                                    className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <BsEyeSlash size={20}/> : <BsEye size={20}/>}
                                </div>
                                {errors.confirmPassword && touched.confirmPassword && (
                                    <p className="text-red-500 text-xs font-200">{errors.confirmPassword}</p>
                                )}
                            </div>
                            <div className="flex items-start">
                                {/* Checkbox for subscription */}
                                <label className="flex items-center mt-2">
                                    {/* Conditionally render the icons based on the 'subscribe' value */}
                                    {values.subscribe ? (
                                        <MdCheckBox className="text-primary h-8 w-8"/>
                                    ) : (
                                        <MdCheckBoxOutlineBlank className="text-gray-400 h-8 w-8"/>
                                    )}
                                    <input
                                        type="checkbox"
                                        className="form-checkbox sr-only" // Add sr-only to hide the default checkbox
                                        name="subscribe"
                                        onChange={handleChange}
                                        checked={values.subscribe}
                                    />
                                    <span className="m-4 text-sm font-nunito">
                                        Bana özel kampanya, tanıtım ve fırsatlardan haberdar olmak istiyorum.
                                      </span>
                                </label>

                                {errors.subscribe && touched.subscribe && (
                                    <p className="text-red-500 text-xs font-200">{errors.subscribe}</p>
                                )}
                            </div>
                            <span className="text-sm mb-2">
                                Üye olmakla,
                                <span className="text-primary mx-1">
                                Kullanım Koşulları
                            </span>
                                hükümlerini kabul etmektesiniz.
                            </span>
                            <Button className="my-6" style={{fontSize: '1.1rem'}}>Kayıt Ol</Button>
                            <span className="text-red-600">{errMessage && errMessage}</span>
                        </form>
                    </>
                )}
            </Formik>
        </div>
    );
};

export default SignUpForm;
