import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
    return (
        <footer className="w-full bg-slate-50 dark:bg-slate-800 shadow-sm">
            <div className="app-container flex justify-between items-center py-5">
                <p>©2023 MHB. All rights reserved.</p>
                <div className="flex justify-end items-center gap-4">
                    <Link
                        href=""
                        className="bg-white dark:bg-slate-700 p-2 rounded-full"
                    >
                        <Image
                            width={25}
                            height={25}
                            src="/facebook.png"
                            alt="facebook-icon"
                        ></Image>
                    </Link>
                    <Link
                        href="https://github.com/Zeustakeshi"
                        className="bg-white dark:bg-slate-700 p-2 rounded-full"
                    >
                        <Image
                            width={25}
                            height={25}
                            src="/github.png"
                            alt="github-icon"
                        ></Image>
                    </Link>
                    <Link
                        href=""
                        className="bg-white dark:bg-slate-700 p-2 rounded-full"
                    >
                        <Image
                            width={25}
                            height={25}
                            src="/linkedin.png"
                            alt="linkedin-icon"
                        ></Image>
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
