import Link from "next/link";
import React from "react";

type Props = {};

const Logo = (props: Props) => {
    return (
        <Link className="text-2xl text-sky-500 font-semibold" href="/">
            MH-Blog
        </Link>
    );
};

export default Logo;
