'use client'
import { Disclosure,Transition } from '@headlessui/react'
import Image from 'next/image'
import { useState } from 'react';
import {BsChevronDown} from 'react-icons/bs'
import Container from '../ui/container';
export default function Delivery() {
    const [showContent, setShowContent] = useState<boolean>(false);
return( 
    <Container className='my-0'>
    <Disclosure>
        {({open,close})=>(
    <>
        <Disclosure.Button className="py-2 bg-white w-full flex items-center justify-between" onClick={()=>setShowContent(true)}>
            <div className="flex items-center gap-4">
                <Image 
                src='./home.svg'
                alt='goomart'
                width={20}
                height={20}
                />
                <p className='font-bold text-xs'>Teslimat Adresinizi Belirleyin</p>
            </div>
            <div className="">
                <BsChevronDown  className='rotate-180-deg text-primary' size={15} />
            </div>
        </Disclosure.Button>
     
        <Disclosure.Panel className="text-gray-500 bg-red-500 w-full h-screen z-50 absolute left-0 top-0">
           <button onClick={()=>close()}>Vazgec</button>
        </Disclosure.Panel>
       

  </>
        )}

  </Disclosure>
  </Container>
)
}