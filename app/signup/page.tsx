import Container from '@/components/ui/container'
import React from 'react'
import SignupForm from "@/components/auth/signup/SignupForm";
import SocialButtons from '@/components/ui/socialButtons'
import {BiLogoApple} from 'react-icons/bi'
import {FcGoogle} from 'react-icons/fc'
import Link from "next/link";
const Signup = () => {
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
          <Link href="/login">Hesabınız var mı?</Link>
          <p className="text-primary font-bold mx-1">Giriş Yap</p>
        </div>

      </Container>
  )
}

export default Signup
