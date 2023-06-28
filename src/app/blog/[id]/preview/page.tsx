"use client";
import Avatar from "@/components/avatar/Avatar";
import PostActions from "@/components/post/actions/PostActions";
import { PostType } from "@/types/blog.type";
import axios from "axios";
import { Roboto } from "next/font/google";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import "@/styles/editor.css";
import "highlight.js/styles/base16/dracula.css";
import "react-quill/dist/quill.snow.css";

const roboto = Roboto({
    subsets: ["vietnamese", "latin"],
    weight: ["400", "500", "700"],
});

type Props = {
    params: { id: string };
};

const Preview = ({ params }: Props) => {
    const [post, setPost] = useState<PostType>();

    useEffect(() => {
        (async () => {
            const res = await axios({
                method: "GET",
                url: `/api/posts/details/${params.id}`,
            });
            setPost(res.data);
        })();
    }, [params.id]);

    if (!post)
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

    return (
        <div className={roboto.className}>
            <div className="mt-5 mb-10 flex justify-between items-start gap-5 max-h-[600px] ">
                <div className="flex-1">
                    <h1 className="text-4xl font-semibold my-5 ">
                        {post.title}
                    </h1>
                    <div className="my-4 flex justify-start items-center gap-2">
                        <Avatar
                            src={post.author.imgURL || "/user_avatar_1.png"}
                            size={50}
                            to="/"
                        ></Avatar>
                        <h4 className="text-sm font-medium text-slate-500">
                            {post.author.username}
                        </h4>
                    </div>
                    <div className="flex justify-start items-center gap-2 my-4">
                        {post.categories.map((category, index) => {
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

                    <p className="text-sm text-slate-500">{post.desc}</p>
                </div>
                <div className="flex-1 flex justify-center items-center w-[400px] h-[400px] relative rounded-lg shadow-lg overflow-hidden">
                    <Image
                        src={post.imgURL}
                        alt={`blog-image-${post.title}`}
                        fill
                        // className="w-full h-full object-cover"
                    ></Image>
                </div>
            </div>
            <div className="leading-loose text-lg entry-content">
                {parse(post.content)}
            </div>
            <PostActions postId={post._id} like={post.likes}></PostActions>
        </div>
    );
};

export default Preview;
