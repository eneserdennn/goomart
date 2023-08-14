'use client'

import {Formik, FormikErrors} from "formik";
import React, {useState} from "react";

import {useChangePasswordMutation, useUpdateUserMutation} from "@/redux/features/auth/authApiSlice";
import {useGetProfileQuery} from "@/redux/features/auth/userProfileApiSlice";
import {selectCurrentToken} from "@/redux/features/auth/authSlice";
import Button from "@/components/button";
import Loading from "@/app/loading";
import {useSelector} from "react-redux";
import {Listbox} from "@headlessui/react";
import {BsEye, BsEyeSlash} from "react-icons/bs";
import {customError, customSuccess} from "@/components/CustomToast";
import {useRouter} from "next/navigation";
import Modal from "@/components/modal/Modal";

interface IFormValues {
    name: string;
    surname: string;
    email: string;
    phone: string;
    dialCode: string;
    oldPassword: string;
    newPassword: string;
    newPasswordConfirm: string;
    campaignConsent: boolean;
}

interface RootState {
    user: {
        name: string;
        surname: string;
        email: string;
        campaignConsent: boolean;
    }
}

const countries = [
    { name: 'Turkey', code: 'TR', dialCode: '+90', flag: '🇹🇷' },
    { name: 'United States', code: 'US', dialCode: '+1', flag: '🇺🇸' },
    // Diğer ülkeler...
];

const AccountSettings: React.FC = () => {
    const token = useSelector(selectCurrentToken);
    const router = useRouter();

    const [changePassword, { data, isLoading, error }] = useChangePasswordMutation();
    const [updateUser, { data: profileData, isLoading: profileLoading, error: profileError }] = useUpdateUserMutation();
    const {
        data: profile,
        isLoading: getProfileIsLoading,
        isError,
    } = useGetProfileQuery(token);

    const [selectedCountry, setSelectedCountry] = useState(countries[0]);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [dialCode, setDialCode] = useState('+90');
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [wrongOldPassword, setWrongOldPassword] = useState(false);

    const handleSubmit = async (values: IFormValues) => {
        const token = localStorage.getItem('token');
        if (token !== null) {
            if (values.newPassword !== '' && values.newPasswordConfirm !== '' && values.oldPassword !== '') {
                const {oldPassword, newPassword} = values;
                await changePassword({oldPassword, newPassword, token});
                if (error) {
                    setIsSuccess(false);
                    // @ts-ignore
                    if (error.data.message === "Wrong old password") {
                        setWrongOldPassword(true);
                    }
                    console.log(wrongOldPassword);
                }
                if (data?.statusCode === 200) {
                    setIsSuccess(true);
                    customSuccess('Değişiklikler başarıyla kaydedildi');
                    router.push('/profile');
                }
            } else {
                const {name, surname, email, campaignConsent} = values;
                await updateUser({name, surname, email, campaignConsent, token});
                if (error) {
                    setIsSuccess(false);
                    customError('Değişiklikler kaydedilirken bir hata oluştu')
                }
                if (data?.statusCode === 200) {
                    setIsSuccess(true);
                    customSuccess('Değişiklikler başarıyla kaydedildi');
                    router.push('/profile');
                }
            }
        }

    };

    const userNameInitials = `${profile?.name?.charAt(0)}${profile?.surname?.charAt(0)}`;


    let content;

    if (getProfileIsLoading) {
        content = <Loading/>;
    } else { // @ts-ignore
        if (error?.status === 401) {
                content = <div>wrongpass</div>;
            } else {
                content = (
                <>
                    <div className="flex flex-row items-center bg-[url('/settingsFrame.svg')] h-[103px] px-10">
                        <div className="flex items-center">
                            <div
                                className="rounded-full bg-white border h-[50px] w-[50px] flex items-center justify-center text-2xl font-bold text-primary">
                                {userNameInitials}
                            </div>
                            <div className="flex flex-col px-4 font-bold text-primary text-[15px]">
                                {profile?.name} {profile?.surname}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col p-6">
                        <Formik
                            initialValues={{
                                name: profile.name,
                                surname: profile.surname,
                                email: profile.email,
                                phone: profile.phone ? profile.phone : '',
                                dialCode: '+1',
                                oldPassword: '',
                                newPassword: '',
                                newPasswordConfirm: '',
                                campaignConsent: false,
                            }}
                            validate={values => {
                                const errors: FormikErrors<IFormValues> = {};
                                if (!values.name) {
                                    errors.name = 'Zorunlu alan';
                                }
                                if (!values.surname) {
                                    errors.surname = 'Zorunlu alan';
                                }
                                if (!values.email) {
                                    errors.email = 'Zorunlu alan';
                                }

                                // Check if the user entered something in the password field
                                const isPasswordEntered = values.newPassword.trim() !== '' || values.newPasswordConfirm.trim() !== '';

                                if (isPasswordEntered && !values.newPassword) {
                                    errors.newPassword = 'Zorunlu alan';
                                }
                                if (isPasswordEntered && !values.newPasswordConfirm) {
                                    errors.newPasswordConfirm = 'Zorunlu alan';
                                }
                                if (isPasswordEntered && values.newPassword !== values.newPasswordConfirm) {
                                    errors.newPasswordConfirm = 'Passwords must match';
                                }
                                if (isPasswordEntered && !values.oldPassword) {
                                    errors.oldPassword = 'Zorunlu alan';
                                }
                                return errors;
                            }}
                            onSubmit={handleSubmit}
                        >
                            {({
                                  values,
                                  errors,
                                  touched,
                                  handleChange,
                                  handleBlur,
                                  handleSubmit,
                                  isSubmitting,
                              }) => (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="flex flex-col px-4">
                                        <div className="flex mb-4 gap-2">
                                            <div className="w-1/2">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    placeholder="Ad"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.name}
                                                    className="px-4 py-3 border rounded-md outline-none focus:ring-2 focus:ring-primary w-full"
                                                />
                                                {errors.name && touched.name &&
                                                    <div className="text-red-500 mt-1 ml-1 text-sm">{errors.name}</div>}
                                            </div>

                                            <div className="w-1/2">
                                                <input
                                                    type="text"
                                                    name="surname"
                                                    placeholder="Soyad"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.surname}
                                                    className="px-4 py-3 border rounded-md outline-none focus:ring-2 focus:ring-primary w-full"
                                                />
                                                {errors.surname && touched.surname &&
                                                    <div className="text-red-500 mt-1 ml-1 text-sm">{errors.surname}</div>}
                                            </div>
                                        </div>
                                        <div className="flex flex-col mb-4">
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="E-posta"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.email}
                                                className="px-4 py-3 border rounded-md outline-none focus:ring-2 focus:ring-primary w-full"
                                            />
                                            {errors.email && touched.email &&
                                                <div className="text-red-500 mt-1 ml-1 text-sm">{errors.email}</div>}
                                        </div>
                                        <div className="relative flex w-full h-[51px] mb-6">
                                            <Listbox as="div" className="flex w-full" onChange={(selectedCountry) => {
                                                // @ts-ignore
                                                setSelectedCountry(selectedCountry);
                                                setDialCode(selectedCountry.dialCode);
                                                handleChange({
                                                    target: {
                                                        name: "dialCode",
                                                        value: selectedCountry.dialCode,
                                                    },
                                                });
                                            }}
                                            >
                                                <Listbox.Button className="flex bg-white items-center space-x-2 px-3 py-2 border rounded-l-md ">
                                                    <span>{selectedCountry.flag}</span> {/* Bayrak ikonunu buraya ekleyebilirsiniz */}
                                                    <span>{selectedCountry.dialCode}</span> {/* Bayrak ikonunu buraya ekleyebilirsiniz */}
                                                </Listbox.Button>
                                                {/*<div className="border-l-2" />*/}
                                                <input
                                                    type="text"
                                                    placeholder="Telefon numarası"
                                                    name="phone"
                                                    value={values.phone}
                                                    onChange={handleChange}
                                                    className="px-4 py-3 w-full outline-none focus:ring-2 focus:ring-primary border rounded-r-md"
                                                />


                                                <Listbox.Options className="absolute z-10 w-full mt-2 border rounded-md shadow-lg bg-white">
                                                    {countries.map((country) => (
                                                        <Listbox.Option key={country.code} value={country}>
                                                            {({ active }) => (
                                                                <div
                                                                    className={`flex items-center space-x-2 px-3 py-2 cursor-pointer ${
                                                                        active ? 'bg-gray-200' : ''
                                                                    }`}
                                                                >
                                                                    <span>{country.flag}</span>
                                                                    <span>{country.dialCode}</span>

                                                                </div>
                                                            )}
                                                        </Listbox.Option>
                                                    ))}
                                                </Listbox.Options>
                                            </Listbox>
                                        </div>

                                        <span
                                            className="text-deepgray text-[15px] font-semibold py-3 cursor-pointer hover:underline"
                                        >Sifre Degistir</span>

                                        <div className="flex items-center mb-4">
                                        <input
                                            type="Password"
                                            name="oldPassword"
                                            placeholder="Eski Şifre"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.oldPassword}
                                            className={`w-full px-4 py-3 border rounded-md outline-none focus:ring-2 focus:ring-primary ${errors.oldPassword && touched.oldPassword ? 'border-rose-400 border-2' : ''}`}
                                        />
                                        {errors.oldPassword && touched.oldPassword &&
                                            <div className="text-red-500 mt-1 ml-1 text-sm">{errors.oldPassword}</div>}
                                        </div>

                                        <div className="relative items-center w-full h-[51px] mb-4">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="newPassword"
                                            placeholder="Yeni Şifre"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.newPassword}
                                            className={`w-full px-4 py-3 mb-4 border rounded-md outline-none focus:ring-2 focus:ring-primary ${errors.newPassword && touched.newPassword ? 'border-rose-400 border-2' : ''}`}

                                        />
                                            <div
                                                className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? <BsEyeSlash size={20} /> : <BsEye size={20} />}
                                            </div>

                                            {errors.newPassword && touched.newPassword &&
                                            <div className="text-red-500 mt-1 ml-1 text-sm">{errors.newPassword}</div>}
                                        </div>

                                        <div className="relative items-center w-full h-[51px] mb-4">
                                        <input
                                            type={showPasswordConfirm ? "text" : "password"}
                                            name="newPasswordConfirm"
                                            placeholder="Yeni Şifre Tekrar"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.newPasswordConfirm}
                                            className={`w-full px-4 py-3 mb-4 border rounded-md outline-none focus:ring-2 focus:ring-primary ${errors.newPasswordConfirm && touched.newPasswordConfirm ? 'border-rose-400 border-2' : ''}`}
                                        />
                                            <div
                                                className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
                                                onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                                            >
                                                {showPasswordConfirm ? <BsEyeSlash size={20} /> : <BsEye size={20} />}
                                            </div>

                                        {errors.newPasswordConfirm && touched.newPasswordConfirm &&
                                            <div className="text-red-500 mt-1 ml-1 text-sm">{errors.newPasswordConfirm}</div>}
                                        </div>

                                        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300">
                                            <div className="flex justify-center py-2 px-[15px]">
                                                <Button
                                                    className="h-[55px] bg-primary hover:bg-green-800 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-300"
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                >
                                                     Kaydet
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                    {isLoading && <Loading/>}
                                    {wrongOldPassword &&
                                        <Modal
                                            show={wrongOldPassword}
                                            onClose={() => setWrongOldPassword(false)}
                                            onConfirm={() => setWrongOldPassword(false)}
                                            message={'Eski sifreniz hatali, lütfen tekrar deneyin.'}
                                            hasCancelButton={false}
                                            buttonText={'Tamam'}/>
                                    }
                                </form>
                            )}
                        </Formik>
                    </div>
                </>
            )
            }
    }

    return content;
}

export default AccountSettings;
