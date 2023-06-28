"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

const Profile = () => {
    const { data, status } = useSession();
    if (status === "loading") {
        return (
            <div className="w-full h-full flex justify-center items-center">
                <Image
                    src="/loader.svg"
                    alt="loading ...."
                    width={80}
                    height={80}
                ></Image>
            </div>
        );
    }
    return (
        <div>
            <div className="flex justify-start items-start gap-5">
                <div className="relative min-w-[250px] w-[250px] min-h-[250px] h-[250px] shadow-lg rounded-lg overflow-hidden">
                    <Image
                        src={data?.user.imgURL || "/user_avatar_1.png"}
                        alt="avatar"
                        fill
                    ></Image>
                </div>
                <div>
                    <h1 className="text-3xl font-semibold mb-5">
                        {data?.user.name}
                    </h1>
                    <p className="text-sm text-slate-800 dark:text-slate-100">
                        {}
                    </p>
                </div>
            </div>
            <div>
                <div className="grid grid-cols-4 gap-4 cs-shadow-1 w-full p-5 rounded-md my-10 bg-white dark:bg-slate-800">
                    <InfoItem label="Total posts" amount={20}></InfoItem>
                    <InfoItem label="Total likes" amount={20}></InfoItem>
                    <InfoItem label="Follower" amount={20}></InfoItem>
                    <InfoItem label="Follow" amount={20}></InfoItem>
                </div>
            </div>
        </div>
    );
};

type InfoItemtype = {
    label: string;
    amount: number;
};
const InfoItem: React.FC<InfoItemtype> = ({ label, amount }) => {
    return (
        <h4 className="flex justify-start items-center gap-4 p-4 font-semibold">
            <span className="text-lg  text-blue-600">{label}:</span>
            <span>{amount}</span>
        </h4>
    );
};

export default Profile;
