'use client'
import React, { ButtonHTMLAttributes, forwardRef, } from 'react'
import cn from "classnames";
import {AiOutlineLoading3Quarters} from 'react-icons/ai'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
   className?:string;
   disabled?:boolean;
   type?:"submit" | "reset" | "button"
   loading?:boolean;
   active?:boolean;
}



const Button = forwardRef <HTMLButtonElement, ButtonProps>((props, ref) => {
    const {
      className,
      children,
      active,
      loading = false,
      disabled = false,
      ...rest
    } = props;
    const RootClasses= cn(
        'bg-primary w-full py-2 text-white font-bold text-sm rounded flex items-center justify-center hover:bg-primary/[0.8]',className
    )
    return (
      <button
        aria-pressed={active}
        ref={ref}
        className={RootClasses}
        disabled={disabled}
        {...rest}
      >
        {children}
        {loading && (
          <svg
            className="animate-spin ltr:-mr-1 rtl:-ml-1 ltr:ml-3 rtl:mr-3 h-5 w-5 text-white mx-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
      </button>
    );
  });

export default Button;