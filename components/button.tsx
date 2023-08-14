'use client';

import React, { ButtonHTMLAttributes, forwardRef } from 'react';

import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import cn from 'classnames';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  disabled?: boolean;
  type?: 'submit' | 'reset' | 'button';
  loading?: boolean;
  active?: boolean;
  isSmall?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { className, children, active, loading = false, disabled = false, isSmall = false, ...rest } = props;

  const RootClasses = cn(
    'h-[45px] text-white font-semibold rounded-lg flex items-center justify-center',
    'bg-primary hover:bg-primary/[0.8] focus:ring focus:ring-primary focus:outline-none',
    { 'opacity-50 cursor-not-allowed': disabled },
      { 'h-[45px] w-[135px]': isSmall, 'w-full': !isSmall },

      className
  );

  return (
    <button
      aria-pressed={active}
      ref={ref}
      className={RootClasses}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <>
          <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 text-white mr-2" />
          <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
});

export default Button;
