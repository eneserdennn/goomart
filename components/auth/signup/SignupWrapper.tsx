import Container from '@/components/ui/container'
import React from 'react'
import SignupForm from './SignupForm'
import SocialButtons from '@/components/ui/socialButtons'
import {BiLogoApple} from 'react-icons/bi'
import {FcGoogle} from 'react-icons/fc'
const SignupWrapper = () => {
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
        <SocialButtons showText text='veya hesabinizla baglanin' buttons={buttons}/>

    </Container>
  )
}

export default SignupWrapper