"use client";
import useDebounce from "@/hooks/useDebounce";
import React, { useEffect, useState } from "react";

type Props = {
    onSearch: (searchValue: string) => void;
};

const SearchPost: React.FC<Props> = ({ onSearch }) => {
    const [value, setValue] = useState<string>("");

    const debounceValue = useDebounce(value, 800);

    useEffect(() => {
        if (!debounceValue.trim()) return;
        onSearch(debounceValue);
    }, [debounceValue]);

    return (
        <div className="">
            <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="px-5 py-3 rounded outline-blue-600 border border-slate-200 dark:bg-slate-800"
                type="text"
                placeholder="Search post ...."
            />
        </div>
    );
};

export default SearchPost;
