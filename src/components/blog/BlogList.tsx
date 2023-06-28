"use client";
import { usePosts } from "@/contexts/post.context";
import React from "react";
import BlogItem from "./BlogItem";
import Image from "next/image";

type Props = {
    type: "type-1" | "type-2";
};

const BlogList: React.FC<Props> = ({ type }) => {
    const { posts } = usePosts();
    if (!posts.length)
        return (
            <div className="flex w-full h-full justify-center items-center">
                <Image
                    src="/loader.svg"
                    alt="loading...."
                    width={50}
                    height={50}
                />
            </div>
        );
    return (
        <div>
            {posts.map((item, index) => {
                return (
                    <BlogItem
                        key={item._id}
                        {...item}
                        direction={
                            type === "type-2" && index % 2 ? "right" : "left"
                        }
                    ></BlogItem>
                );
            })}
        </div>
    );
};

export default BlogList;
