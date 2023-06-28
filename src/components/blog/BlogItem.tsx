import { PostType } from "@/types/blog.type";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogItem: React.FC<PostType & { direction?: "right" | "left" }> = ({
    _id,
    title,
    desc,
    imgURL,
    categories,
    direction = "left",
}) => {
    return (
        <Link
            href={`/blog/${_id}`}
            className={`w-full h-full flex  ${
                direction === "left" ? "justify-start" : "justify-end"
            } items-start gap-5 my-5 transition-all  border-2 border-transparent p-4 rounded-lg  hover:border-blue-500`}
        >
            {direction === "left" && (
                <div className="relative w-[400px] h-[280px] rounded-lg overflow-hidden shadow-lg">
                    <Image src={imgURL} fill alt={title} />
                </div>
            )}
            <div className="flex flex-col justify-start items-start gap-4">
                <h4 className="text-3xl font-semibold text-ellipsis whitespace-nowrap overflow-hidden max-w-[900px]">
                    {title}
                </h4>
                <div className="flex justify-start items-center gap-2">
                    {categories.map((category, index) => {
                        return (
                            <div
                                key={index}
                                className="px-5 py-1 rounded-lg bg-slate-200 dark:bg-slate-700 text-sm"
                            >
                                {category}
                            </div>
                        );
                    })}
                </div>
                <p className="text-lg text-slate-400 text-ellipsis overflow-hidden max-w-[900px] max-h-[140px]">
                    {desc}
                </p>
            </div>
            {direction === "right" && (
                <div className="relative w-[400px] h-[280px] rounded-lg overflow-hidden shadow-lg">
                    <Image src={imgURL} fill alt={title} />
                </div>
            )}
        </Link>
    );
};

export default BlogItem;
