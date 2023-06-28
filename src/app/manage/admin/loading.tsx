import Image from "next/image";
import React from "react";

type Props = {};

const loading = (props: Props) => {
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
};

export default loading;
