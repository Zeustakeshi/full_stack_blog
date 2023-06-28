import { PostCategroryType } from "@/types/blog.type";
import Image from "next/image";
import { useState } from "react";

type ButtonAddCategoryType = {
    setCategories: React.Dispatch<React.SetStateAction<PostCategroryType[]>>;
};

const ButtonAddCategory: React.FC<ButtonAddCategoryType> = ({
    setCategories,
}) => {
    const [showInput, setShowInput] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const handleAddCategory = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!inputValue.trim()) return;
        setCategories((prev) => [...prev, inputValue]);
        setShowInput(false);
        setInputValue("");
    };

    if (showInput)
        return (
            <form onSubmit={handleAddCategory} className="w-[150px] h-[50px]">
                <input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onBlur={() => setShowInput(false)}
                    className="px-4 py-2 rounded-md border dark:border-slate-700 dark:bg-slate-800 dark:outline-none outline-blue-600 border-slate-200 w-full h-full"
                    autoFocus
                    type="text"
                    placeholder="#"
                />
            </form>
        );

    return (
        <div
            onClick={() => setShowInput(true)}
            className="w-[40px] h-[40px] rounded-lg cursor-pointer bg-slate-200 dark:bg-slate-700 relative flex justify-center items-center px-0 py-0 "
        >
            <Image src="/push.svg" alt="plus" width={25} height={25}></Image>
        </div>
    );
};

export default ButtonAddCategory;
