'use client'

// import {FaAngleDown, FaTimes} from 'react-icons/fa'
import React, { useState } from 'react'

// import { Disclosure } from '@headlessui/react'
// import {GiHamburgerMenu} from 'react-icons/gi'
// import Image from 'next/image';
// import dynamic from 'next/dynamic';

// @ts-ignore
const SideBar = ({data}) => {
  const [toggleSideBar,setToggleSideBar]=useState<boolean>(false);
  const handleTogglingSideBar=()=>{
    setToggleSideBar(prev=> !prev);
  }

  return (
    <>
    {/*<GiHamburgerMenu color="white" size={30} onClick={handleTogglingSideBar} />*/}
    {/* <div className={`bg-white fixed left-0 top-0 bottom-0 w-full md:w-1/6 h-screen z-50 transition-transform duration-300 ${*/}
    {/*    toggleSideBar ? 'translate-x-0' : '-translate-x-full'*/}
    {/*  }` }>*/}
    {/*    <div className="flex items-center justify-between p-4 border-b bg-primary shadow-xl" >*/}
    {/*        <div className={'opacity-0 pointer-events-none'}>*/}
    {/*             <GiHamburgerMenu  size={30} />*/}
    {/*        </div>*/}
    {/*        <Image*/}
    {/*         src='/goomart.svg'*/}
    {/*         alt='goomart'*/}
    {/*         width={80}*/}
    {/*         height={100}*/}
    {/*        />*/}
    {/*        <FaTimes size={20} className='text-deepgray' onClick={handleTogglingSideBar}/>*/}
    {/*    </div>*/}
    {/*      <div className="mt-4 px-4">*/}
    {/*            {data.map((d)=>{*/}
    {/*            return(*/}
    {/*              <Disclosure as='div' id={d.name} key={d.name} className={'w-full'} >*/}
    {/*                <Disclosure.Button className="p-2  flex items-center justify-between w-full border-b font-bold text-sm">*/}
    {/*                  {d.name}*/}
    {/*                  {d.subMenu && <FaAngleDown size={20}/>}*/}
    {/*                </Disclosure.Button>*/}

    {/*                {d.subMenu && (*/}
    {/*                 <Disclosure.Panel className='grid gap-4 grid-cols-3 my-4'>*/}
    {/*                    {d.subMenu.map((a)=>{*/}
    {/*                      return(*/}
    {/*                        <div key={a.name} id={a.name} className="flex flex-col items-center">*/}
    {/*                           <Image*/}
    {/*                        src={a.itemImg}*/}
    {/*                        alt={a.name}*/}
    {/*                        width={64}*/}
    {/*                        height={64}*/}
    {/*                        />*/}
    {/*                        <p className='text-nunito text-xs my-2'>{a.name}</p>*/}

    {/*                        </div>*/}
    {/*                      )*/}
    {/*                    })}*/}
    {/*                  </Disclosure.Panel>)*/}
    {/*                }*/}
    {/*              </Disclosure>*/}
    {/*            )*/}
    {/*          })}*/}

    {/*      </div>*/}

    {/* </div>*/}
    {/* {toggleSideBar && ( <div onClick={()=>setToggleSideBar(false)} className="fixed top-0 left-0 bg-black/[.54] w-full min-h-screen z-40">*/}
    {/* </div>)}*/}
     </>
  )
}

export default SideBar
