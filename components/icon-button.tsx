import Image from "next/image";
import React, {ButtonHTMLAttributes, forwardRef, ReactNode} from 'react';
import cn from 'classnames';

import {AiOutlineLoading3Quarters} from 'react-icons/ai';
import {ICONS} from "@/constants/iconConstants";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    disabled?: boolean;
    type?: 'submit' | 'reset' | 'button';
    loading?: boolean;
    active?: boolean;
    icon?: ReactNode;
    iconSize?: number; // Yeni prop: ikon boyutu
    rightIcon?: boolean;
    rightString?: string;
}

const IconButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    const {
        className,
        children,
        active,
        loading = false,
        disabled = false,
        icon,
        iconSize = 24,
        rightIcon = true,
        rightString,

        ...rest
    } = props;

    const RootClasses = cn(
        'w-full py-4 mt-3 font-semibold rounded-lg flex items-center justify-center transition duration-300 ease-in-out',
        'bg-white hover:bg-primary-[0.8] focus:ring-2 focus:ring-primary focus:ring-opacity-50 focus:outline-none hover:shadow-lg',
        {'opacity-50 cursor-not-allowed': disabled},
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
            <div className="flex px-4 items-center justify-between w-full">
                <div className="flex items-center">
                    {(icon || loading) && ( // İkon veya yükleniyor durumu varsa div'i göster
                        <div
                            className="flex items-center justify-center mr-4"
                            style={{width: iconSize}}>
                            {icon && (
                                <div className="text-primary" style={{fontSize: iconSize}}>
                                    {icon}
                                </div>
                            )}
                            {loading && (
                                <AiOutlineLoading3Quarters className="h-5 w-5 text-primary"/>
                            )}
                        </div>
                    )}
                    <div className="flex-grow">
                        {loading ? (
                            <span>Loading...</span>
                        ) : (
                            <span>{children}</span>
                        )}
                    </div>
                </div>
                <div className="flex items-center">
                    {rightIcon && <Image src={ICONS.rightArrow} className="h-4 w-4" alt="sozlesmeler-icon"/>}
                    {rightString && <span className="ml-2">{rightString}</span>}
                </div>
            </div>
        </button>
    );
});

export default IconButton;
