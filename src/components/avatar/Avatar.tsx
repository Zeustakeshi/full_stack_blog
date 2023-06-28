"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
    src: string;
    to?: string;
    size: 200 | 250 | 300 | 350 | 400 | 450 | 500 | number;
    onClick?: () => void;
};

const Avatar: React.FC<Props> = ({ src, to, size, onClick }) => {
    const router = useRouter();
    const handleClick = () => {
        if (to) router.push(to);
        else onClick?.();
    };
    return (
        <div
            className="relative overflow-hidden inline-block rounded-full shadow-sm border border-slate-100 cursor-pointer"
            onClick={handleClick}
        >
            <Image width={size} height={size} src={src} alt="avatar"></Image>
        </div>
    );
};

export default Avatar;
