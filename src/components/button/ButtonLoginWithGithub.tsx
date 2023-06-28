"use client";
import React, { useEffect, useState } from "react";
import Button from "./Button";
import {
    ClientSafeProvider,
    LiteralUnion,
    getProviders,
    signIn,
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers";

type Props = {};

const ButtonLoginWithGithub: React.FC<Props> = ({}) => {
    const [provider, setProvider] = useState<Record<
        LiteralUnion<BuiltInProviderType, string>,
        ClientSafeProvider
    > | null>();
    useEffect(() => {
        (async () => {
            const response = await getProviders();
            setProvider(response);
        })();
    }, []);
    return (
        <Button
            onClick={() => signIn(provider?.github.id)}
            className="bg-white  border-slate-300 border dark:bg-slate-700 dark:border-none rounded-lg min-w-[500px] font-medium py-3"
        >
            Continue with Github
        </Button>
    );
};

export default ButtonLoginWithGithub;
