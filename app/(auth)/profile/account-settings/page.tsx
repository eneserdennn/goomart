'use client'
import {Formik, FormikErrors} from "formik";
import Button from "@/components/button";
import {useChangePasswordMutation, useUpdateUserMutation} from "@/redux/api/authSlice";
import { useSelector } from "react-redux";
import React, {useState} from "react";
import Loading from "@/app/loading";

interface IFormValues {
    name: string;
    surname: string;
    email: string;
    oldPassword: string;
    newPassword: string;
    newPasswordConfirm: string;
    campaignConsent: boolean;
}

interface RootState {
    user:{
        name: string;
        surname: string;
        email: string;
        campaignConsent: boolean;
    }
}

const AccountSettings: React.FC = () => {
    const [changePassword, { data, isLoading, error }] = useChangePasswordMutation();
    const [updateUser, { data: profileData, isLoading: profileLoading, error: profileError }] = useUpdateUserMutation();
    const [isSuccess, setIsSuccess] = useState(false);
    const { name, surname, email } = useSelector((state: RootState) => state.user);

    const handleSubmit = async (values: IFormValues) => {
        const token = localStorage.getItem('token');

        // Add a check to ensure that the token is not null before making the API call
        if (token !== null) {
            if (values.newPassword !== '' && values.newPasswordConfirm !== '' && values.oldPassword !== '') {
                const { oldPassword, newPassword } = values;
                await changePassword({ oldPassword, newPassword, token });
                if (error) {
                    setIsSuccess(false);
                }
                if (data?.statusCode === 200) {
                    setIsSuccess(true);
                }
            } else {
                const { name, surname, email, campaignConsent } = values;
                await updateUser({ name, surname, email, campaignConsent, token });
                if (error) {
                    setIsSuccess(false);
                }
                if (data?.statusCode === 200) {
                    setIsSuccess(true);
                }
            }
        }
    };


    return (
        <div className="flex flex-col p-6">
            <Formik
                initialValues={{
                    name: name,
                    surname: surname,
                    email: email,
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

                            <input
                                type="Password"
                                name="oldPassword"
                                placeholder="Eski Şifre"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.oldPassword}
                                className="px-4 py-3 mb-4 border rounded-md outline-none focus:ring-2 focus:ring-primary"
                            />
                            {errors.oldPassword && touched.oldPassword &&
                                <div className="text-red-500 mt-1 ml-1 text-sm">{errors.oldPassword}</div>}


                            <input
                                type="password"
                                name="newPassword"
                                placeholder="Yeni Şifre"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.newPassword}
                                className="px-4 py-3 mb-4 border rounded-md outline-none focus:ring-2 focus:ring-primary"
                            />
                            {errors.newPassword && touched.newPassword &&
                                <div className="text-red-500 mt-1 ml-1 text-sm">{errors.newPassword}</div>}

                            <input
                                type="password"
                                name="newPasswordConfirm"
                                placeholder="Yeni Şifre Tekrar"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.newPasswordConfirm}
                                className="px-4 py-3 mb-4 border rounded-md outline-none focus:ring-2 focus:ring-primary"
                            />
                            {errors.newPasswordConfirm && touched.newPasswordConfirm &&
                                <div className="text-red-500 mt-1 ml-1 text-sm">{errors.newPasswordConfirm}</div>}

                            <Button type="submit" disabled={isSubmitting}
                                    className="rounded-md hover:bg-green-900 hover:text-white">
                                Kaydet
                            </Button>
                        </div>
                        {isLoading && <Loading/>}
                        {isSuccess && <div className="text-primary m-4">Şifreniz başarıyla değiştirildi.</div>}
                        {error && <div className="text-red-500 m-4">Şifreniz değiştirilirken bir hata oluştu, lütfen
                            şifrenizi kontrol edin.</div>}
                    </form>
                )}
            </Formik>
        </div>
    );
};

export default AccountSettings;
