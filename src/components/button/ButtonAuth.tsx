"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Button from "./Button";

type Props = {};

const ButtonAuth: React.FC<Props> = ({}) => {
    const router = useRouter();

    const handleLogin = () => {
        router.replace("/login");
    };

    return (
        <Button
            onClick={handleLogin}
            className="px-4 py-2 font-medium bg-blue-600 text-white rounded-lg"
        >
            Login
        </Button>
    );
};

export default ButtonAuth;
