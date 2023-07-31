'use client'

import * as Yup from 'yup';

import { logIn, logOut } from '@/app/redux/features/auth-slice';

import { AppDispatch } from '@/app/redux/store';
import Button from '@/components/button';
import { Formik } from 'formik';
import Link from 'next/link';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

const LoginForm = () => {
  const [username, setUsername] = useState("")

  const dispatch = useDispatch<AppDispatch>();

  const onClickLogin = () => {
    
  }
  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmit = async (values) => {
    console.log(values);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Lütfen geçerli bir e-posta girin').required('E-posta adresi zorunlu'),
          password: Yup.string().required('Şifre alanı boş bırakılamaz').min(3, 'Şifre en az 3 karakterden oluşmalıdır.'),
        })}
      >
        {({ values, handleChange, handleSubmit, errors, touched }) => (
          <>
            <form className="w-full" noValidate onSubmit={handleSubmit}>
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
              <div className="flex items-start justify-center flex-col">
                <input
                  name="password"
                  className={`shadow w-full appearance-none border rounded p-4 my-2 font-semibold text-deepgray placeholder:font-semibold ${
                    errors.password && touched.password ? 'invalid:border-pink-500' : null
                  }`}
                  onChange={handleChange}
                  value={values.password}
                  id="password"
                  type="password"
                  placeholder="Şifre"
                />
                {errors.password && touched.password && (
                  <p className="text-red-500 text-xs font-200">{errors.password}</p>
                )}
              </div>
              <div className="font-bold text-sm my-4">
                <Link href="/forgot-password">Şifremi unuttum?</Link>
              </div>
              <Button style={{ fontSize: '1.1rem' }}>Giriş Yap</Button>
            </form>
          </>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
