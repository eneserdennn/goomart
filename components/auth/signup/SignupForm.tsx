'use client'
import { Formik } from 'formik'
import * as Yup from "yup";
import Link from 'next/link'
import React from 'react'

import Button from '@/components/button'
import Grid from '../../ui/grid';

const SignupForm = () => {
    const initialValues={
    name:'',
    sirname:'',
    email:'',
    password:'',
    confirmPassword:'',
    acceptedTerms:false,
  }
  const handleSubmit= async(values:object)=>{
    console.log(values)
  }
  return (
    <div className='w-full flex flex-col items-center'>
    <Formik onSubmit={handleSubmit} initialValues={initialValues} validationSchema={Yup.object().shape({
      name:Yup.string().min(2,'isim alanı minimum 2 karakter olmalıdır').max(255).required('İsim alanı boş bırakılamaz.'),
      sirname:Yup.string().min(2,'Soyad alanı minimum 2 karakter olmalıdır').max(255).required('İsim alanı boş bırakılamaz.'),
      email:Yup.string().email('please enter valid mail').required('mail is required'),
      password:Yup.string().required('şifre alanı boş bırakılamaz').min(3, 'Şifre en az 3 karakterden oluşmalıdır.'),
      confirmPassword:Yup.string()
      .oneOf([Yup.ref('password'),], 'Şifreler uyuşmuyor.')
      .required('Şifre doğrulama alanı boş bırakılamaz.'),
      acceptedTerms: Yup.boolean().notRequired()
  
    })}>
        {({values,handleChange, handleSubmit,errors,touched})=>(
          <>
          <form className='w-full' noValidate onSubmit={handleSubmit}>

          <Grid cols={2} gap={4}>
          <div>
            <input name='name'className={`shadow w-full appearance-none border rounded p-2 my-2 font-bold text-deepgray placeholder:font-semibold  ${errors.name && touched.name ? 'border-pink-500':null}` }  onChange={handleChange} value={values.name} id='name' placeholder='Ad' type='text'/>
                {errors && errors.name && (
                  <p className='text-red-500 text-xs font-200'>{errors.name}</p>
                 )}
          </div>
          <div>
          <input name='sirname' className={`shadow w-full appearance-none border rounded p-2 my-2 font-bold text-deepgray placeholder:font-semibold  ${errors.sirname && touched.sirname ? 'border-pink-500':null}` }  onChange={handleChange} value={values.sirname} id='sirname' placeholder='Soyadı' type='text'/>
            {errors && errors.name && (
              <p className='text-red-500 text-xs font-200'>{errors.sirname}</p>
              )}
          </div>
          </Grid>
          <Grid cols={1} gap={2}>
          <div>
            <input name='email'className={`shadow w-full appearance-none border rounded p-2 my-2 font-bold text-deepgray placeholder:font-semibold  ${errors.email && touched.email ? 'border-pink-500':null}` }  onChange={handleChange} value={values.email} id='email' placeholder='Email' type='text'/>
                {errors && errors.email && (
                  <p className='text-red-500 text-xs font-200'>{errors.email}</p>
                 )}
          </div>
          <div>
          <input name='password' className={`shadow w-full appearance-none border rounded p-2 my-2 font-bold text-deepgray placeholder:font-semibold  ${errors.confirmPassword || errors.password && touched.password ? 'focus:outline-red-500 border-red-500' :'focus:outline-none'}` }  autoComplete='off' onChange={handleChange} value={values.password} id='password' placeholder='Password' type='password'/>
            {errors && errors.password && (
              <p className='text-red-500 text-xs font-200'>{errors.password}</p>
              )}
          </div>
          <div>
          <input name='confirmPassword' className={`shadow w-full appearance-none border rounded p-2 my-2 font-bold text-deepgray placeholder:font-semibold  ${errors.confirmPassword || errors.password && touched.password ? 'focus:outline-red-500 border-red-500' :'focus:outline-none'}` }  autoComplete='off' onChange={handleChange} value={values.confirmPassword} id='confırmPassword' placeholder='Confirm Password' type='password'/>
            {errors && errors.confirmPassword && (
              <p className='text-red-500 text-xs font-200'>{errors.confirmPassword}</p>
              )}
          </div>
          </Grid>
          <div className="flex items-center my-4">
              <input name='acceptedTerms' type="checkbox" className='appearance-none mr-2 p-2 w-4 h-4 border border-deepgray rounded-sm bg-white checked:bg-primary relative peer checked:border-0 '/>
              <svg
    className="
      absolute 
      w-4 h-4 mt-1
      hidden peer-checked:block
      pointer-events-none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span className='font-bold text-xs'>Bana özel kampanya, tanıtım ve fırsatlardan haberdar olmak istiyorum.</span>
          </div>
          <span className='font-bold text-xs'>Üye olmakla <Link href='/' className='font-bold text-xs text-primary'>Kullanım Koşullarını</Link> ve hükümlerini kabul etmektesiniz.</span>
          <Button className='my-4'>Üye Ol</Button>
          </form>
          </>
        )}

    </Formik>
  </div>
  )
}

export default SignupForm