"use client";
import Button from "@/components/button/Button";
import PostManage from "@/components/manage/postManage/PostManage";
import PostManageItem from "@/components/manage/postManage/PostManageItem";
import { PostType } from "@/types/blog.type";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Posts = () => {
    const [posts, setPosts] = useState<PostType[]>([]);
    const router = useRouter();
    const { data } = useSession();

    useEffect(() => {
        (async () => {
            try {
                const res = await axios({
                    method: "GET",
                    url: `/api/posts/all/${data?.user._id}`,
                });
                setPosts(res.data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    return (
        <div>
            <div className="flex w-full justify-end">
                <Button
                    onClick={() => router.push("/blog/new")}
                    className="px-5 py-3 rounded-md bg-blue-600 font-semibold text-white"
                >
                    Create New
                </Button>
            </div>
            <div className="my-2">
                <PostManage>
                    {posts.map((post, index) => {
                        return (
                            <PostManageItem
                                post={post}
                                id={index + 1}
                                actions={["view", "edit", "delete"]}
                            ></PostManageItem>
                        );
                    })}
                </PostManage>
            </div>
        </div>
    );
};

export default Posts;
