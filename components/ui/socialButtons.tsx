'use client'
import React, { ReactNode } from 'react'
import { IconType } from 'react-icons';

type Buttons={

text:string,
buttons:
    {buttonClassName:string;
        buttonText:string;
        ButtonElement:ReactNode;
    }[]
    ,
    showText:boolean;
}
type IconProps ={
  icon:React.ReactNode;
}
const IconRenderer: React.FC<IconProps> = ({icon }) => {
  return (
      <>
      {icon}
      </>
  );
};

const SocialButtons:React.FC <Buttons> = ({text,buttons,showText}) =>{
  return (
    <>
   {showText && (
     <div className="relative w-full my-4">
     <p className='text-center font-bold text-sm relative before:absolute before:block before:content-[""] before:bg-primary before:w-10 before:h-px before:left-0  before:top-1/2 before:z-10 after:absolute after:block after:content-[""] after:bg-primary after:w-10 after:h-px after:right-0  after:top-1/2 after:z-10'>{text}</p>
 </div>
   )}
    <div className="w-full flex items-center justify-between ">
        {buttons.map((button,index)=>(
            <button key={index} type='button' className={button.buttonClassName}>
  {button.buttonText}
            <IconRenderer icon={button.ButtonElement}/>
            </button>
        ))}
    </div>
    </>
  )
}

export default SocialButtons