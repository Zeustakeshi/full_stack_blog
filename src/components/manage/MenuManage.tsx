"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

type ItemType = {
    id?: number;
    to?: string;
    label: string;
};

type Props = {};

const items: ItemType[] = [
    {
        id: 1,
        label: "Profile",
        to: "/profile/me",
    },
    {
        id: 2,
        label: "Posts",
        to: "/posts",
    },
    {
        id: 3,
        label: "Settting",
        to: "/setting",
    },
];

const MenuManage: React.FC<Props> = ({}) => {
    const router = useRouter();
    const { data } = useSession();
    const handeClickItem = (data: ItemType) => {
        router.push(`/manage${data.to}`);
    };

    return (
        <div className="sticky top-[120px] h-[500px] left-0 col-span-2 bg-white dark:bg-slate-800 shadow-lg px-3 py-8  rounded-md">
            {data?.user.isAdmin && (
                <MenuItem
                    onClick={handeClickItem}
                    data={{
                        label: "Dasboard",
                        to: "/admin",
                    }}
                ></MenuItem>
            )}
            {items.map((item, index) => {
                return (
                    <MenuItem
                        onClick={handeClickItem}
                        key={item.id || index}
                        data={item}
                    ></MenuItem>
                );
            })}
            <MenuItem
                data={{
                    label: "Logout",
                }}
                onClick={() => signOut()}
            ></MenuItem>
        </div>
    );
};

type MenuItemType = {
    data: ItemType;
    onClick: (item: ItemType) => void;
};

const MenuItem: React.FC<MenuItemType> = ({ data, onClick }) => {
    const pathname = usePathname();
    return (
        <div
            onClick={() => onClick(data)}
            className={`block p-4 hover:bg-slate-100 my-1 ${
                pathname === `/manage${data.to}`
                    ? "bg-slate-100 dark:bg-slate-700"
                    : ""
            } dark:hover:bg-slate-700 font-medium rounded-md cursor-pointer`}
        >
            {data.label}
        </div>
    );
};

export default MenuManage;
