'use client'
import Container from '@/components/ui/container'
import React, {useEffect} from 'react'
import SignupForm from "@/components/auth/signup/SignupForm";
import SocialButtons from '@/components/ui/socialButtons'
import {BiLogoApple} from 'react-icons/bi'
import {FcGoogle} from 'react-icons/fc'
import Link from "next/link";
import { useRouter } from 'next/navigation'
const Signup = () => {

    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token){
            router.push('/')
        }
    }, [])


  const buttons=[
    {
      buttonClassName:'text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 ',
      buttonText:'Apple',
      ButtonElement:<BiLogoApple/>
    },
    {
      buttonClassName:'bg-white border ring-deepgray focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center',
      buttonText:'Google',
      ButtonElement:<FcGoogle/>
    }
  ]
  return (
      <Container>
        <SignupForm/>
        <div className="text-center font-semibold mb-3">
          <SocialButtons showText text='veya hesabınızla bağlanın' buttons={buttons}/>
        </div>
        <div className="text-center font-semibold mt-6 flex flex-row justify-center">
          <p>Hesabınız var mı?</p>
          <Link href="/login" className="text-primary font-bold mx-1">Giriş Yap</Link>
        </div>

      </Container>
  )
}

export default Signup
