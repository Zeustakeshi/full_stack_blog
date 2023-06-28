"use client";
import { ActionProps } from "@/types/manage.type";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { IoIosEye } from "react-icons/io";

type Props = {} & ActionProps;

const ActionView: React.FC<Props> = ({ postId }) => {
    const router = useRouter();
    const handleClick = () => {
        router.push(`/blog/${postId}/preview`);
    };
    return (
        <div
            onClick={handleClick}
            className="relative w-[50px] h-[50px] text-2xl text-slate-500 cursor-pointer  flex justify-center items-center"
        >
            <IoIosEye></IoIosEye>
        </div>
    );
};

export default ActionView;
