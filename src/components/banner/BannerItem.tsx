"use client";
import { BannerItemType } from "@/types/banner.type";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const BannerItem: React.FC<BannerItemType> = ({ _id, imgURL, title, desc }) => {
    const router = useRouter();
    return (
        <div
            onClick={() => router.push(`/blog/${_id}`)}
            className="relative w-full mx-auto h-[600px] bg-white rounded-md overflow-hidden shadow-md"
        >
            <Image
                src={imgURL}
                fill
                alt="banner-image"
                placeholder="blur"
                blurDataURL={imgURL}
            ></Image>
            <div className="absolute w-full h-full bg-black bg-opacity-50"></div>
            <div className="left-5 bottom-10 absolute text-white text-lg flex flex-col justify-center items-start gap-4">
                <h4 className="text-xl font-semibold">{title}</h4>
                <p className="text-sm text-slate-50">{desc}</p>
            </div>
        </div>
    );
};

export default BannerItem;
