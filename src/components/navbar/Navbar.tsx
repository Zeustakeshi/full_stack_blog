"use client";
import React from "react";
import Logo from "../logo/Logo";
import Link from "next/link";
import ButtonAuth from "../button/ButtonAuth";
import ButtonToggleTheme from "../button/ButtonToggleTheme";
import { useSession } from "next-auth/react";
import Avatar from "../avatar/Avatar";
import { usePathname, useRouter } from "next/navigation";

const links = [
    {
        id: 1,
        title: "Home",
        to: "/",
    },
    {
        id: 2,
        title: "Blogs",
        to: "/blog",
    },
    {
        id: 3,
        title: "Contact",
        to: "/contact",
    },
];

type Props = {};

const Navbar = (props: Props) => {
    const { status, data } = useSession();
    const router = useRouter();
    const pathname = usePathname();
    return (
        <header className="w-full shadow-sm sticky top-0 z-40 bg-white dark:bg-slate-800 bg-opacity-90 backdrop-blur ">
            <nav className="app-container flex justify-between items-center sm:px-16 px-6 py-4 ">
                <Logo></Logo>
                <div className="flex justify-end items-center gap-1">
                    <ButtonToggleTheme></ButtonToggleTheme>
                    {links.map((item) => {
                        return (
                            <Link
                                className={`px-5 py-3 font-semibold hover:text-blue-600 ${
                                    pathname === item.to ? "text-blue-600" : ""
                                } transition-all`}
                                key={item.id}
                                href={item.to}
                            >
                                {item.title}
                            </Link>
                        );
                    })}
                    {status === "authenticated" ? (
                        <Avatar
                            onClick={() => router.push("/manage/profile/me")}
                            src={
                                data.user.imgURL ||
                                data.user.image ||
                                "/user_avatar_1.png"
                            }
                            size={40}
                        ></Avatar>
                    ) : (
                        <ButtonAuth></ButtonAuth>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
