"use client";
import React, { ButtonHTMLAttributes } from "react";

type Props = {
    to?: string;
    children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<Props> = ({ to, className, children, ...props }) => {
    const buttonProps = to ? { href: to, ...props } : props;
    const defaultClassName = `px-4 py-2 hover:bg-opacity-80 transition-all`;

    return (
        <button
            {...buttonProps}
            className={` ${defaultClassName} ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;
