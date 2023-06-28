"use client";
import MenuManage from "@/components/manage/MenuManage";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useLayoutEffect } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const { status } = useSession();
    const router = useRouter();
    useLayoutEffect(() => {
        if (status === "unauthenticated") {
            router.replace("/login");
        }
    }, [status, router]);
    return (
        <div className="grid grid-cols-8 gap-5">
            <MenuManage></MenuManage>
            <div className="col-span-6">{children}</div>
        </div>
    );
};

export default Layout;
