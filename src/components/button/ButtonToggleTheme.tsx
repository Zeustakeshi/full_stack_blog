"use client";

import React, { useState } from "react";
import Button from "./Button";

type Props = {};

type themeType = "dark" | "light";

const ButtonToggleTheme = (props: Props) => {
    const [theme, setTheme] = useState<themeType>("light");
    const handleToggleTheme = () => {
        if (theme === "dark") {
            setTheme("light");
        } else {
            setTheme("dark");
        }
        document.body.classList.toggle("dark");
    };
    return (
        <Button
            onClick={handleToggleTheme}
            className={`!p-1 flex justify-center items-center relative gap-2 shadow-[rgb(204,219,232)_3px_3px_6px_0px_inset,rgba(255,255,255,0.5)_-3px_-3px_6px_1px_inset] dark:shadow-[rgb(20,30,30)_3px_3px_6px_0px_inset,rgba(20,30,30,0.5)_-3px_-3px_6px_1px_inset] rounded-full`}
        >
            <div className="w-[30px] h-[30px] flex justify-center items-center">
                🌞
            </div>
            <div
                className={`top-[50%]  -translate-y-[50%] ${
                    theme === "light" ? "left-1" : "right-1"
                } w-[30px] h-[30px] bg-blue-500 rounded-full shadow-xl absolute transition-all duration-1000`}
            ></div>
            <div className="w-[30px] h-[30px] flex justify-center items-center">
                🌙
            </div>
        </Button>
    );
};

export default ButtonToggleTheme;
