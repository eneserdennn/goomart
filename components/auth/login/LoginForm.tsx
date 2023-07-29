'use client'
import { Formik } from 'formik'
import * as Yup from "yup";
import Link from 'next/link'
import React from 'react'
import Button from '@/components/button'

export default function LoginForm (){
  const initialValues={
    email:'',
    password:''
  }
  const handleSubmit= async(values:object)=>{
    console.log(values)
  }
  return (
    <div className='w-full flex flex-col items-center'>
      <Formik onSubmit={handleSubmit} initialValues={initialValues} validationSchema={Yup.object().shape({
        email:Yup.string().email('please enter valid mail').required('mail is required'),
        password:Yup.string().required('şifre alanı boş bırakılamaz').min(3, 'Şifre en az 3 karakterden oluşmalıdır.')
        
      })}>
          {({values,handleChange, handleSubmit,errors,touched})=>(
            <>
            <form className='w-full' noValidate onSubmit={handleSubmit}>

            <div className="flex  items-start justify-center flex-col">
            <input name='email'className={`shadow w-full appearance-none border rounded p-2 my-2 font-bold text-deepgray placeholder:font-semibold  ${errors.email && touched.email ? 'invalid:border-pink-500':null}` }  onChange={handleChange} value={values.email} id='email' placeholder='ornek@mail.com' type='email'/>
              {errors && errors.email && (
                <p className='text-red-500 text-xs font-200'>{errors.email}</p>
              )}
            </div>
            <div className="flex  items-start justify-center flex-col">
              <input name='password' className={`shadow w-full appearance-none border rounded p-2 my-2 font-bold text-deepgray placeholder:font-semibold  ${errors.password && touched.password? '': null}` } onChange={handleChange} value={values.password} id='password' type='password' placeholder='******'/>
              {errors && errors.password && (
                <p className='text-red-500 text-xs font-200'>{errors.password}</p>
              )}
            </div>
            <div className='font-bold text-sm my-4'>
            <Link href='/asd'>Şifremi unuttum?</Link>
            </div>
            <Button>Giriş Yap</Button>
            </form>
            </>
          )}

      </Formik>
    </div>
  )
}
