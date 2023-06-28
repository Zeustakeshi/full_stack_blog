"use client";
import PostManage from "@/components/manage/postManage/PostManage";
import PostManageItem from "@/components/manage/postManage/PostManageItem";
import SearchPost from "@/components/searchs/SearchPost";
import { PostType } from "@/types/blog.type";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useState } from "react";

// type PostType = {
//     _id: string;
//     name: string;
//     imgURL: string;
//     updatedAt: string;
//     status: "pending" | "public" | "rejected";
// };

// const postData: PostType[] = [
//     {
//         _id: "1",
//         name: "new post",
//         imgURL: "https://avatars.githubusercontent.com/u/95726917?v=4",
//         updatedAt: "2023-06-21T14:19:15.241Z",
//         status: "pending",
//     },
//     {
//         _id: "2",
//         name: "new post",
//         imgURL: "https://avatars.githubusercontent.com/u/95726917?v=4",
//         updatedAt: "2023-06-21T14:19:15.241Z",
//         status: "rejected",
//     },
//     {
//         _id: "3",
//         name: "new post",
//         imgURL: "https://avatars.githubusercontent.com/u/95726917?v=4",
//         updatedAt: "2023-06-21T14:19:15.241Z",
//         status: "pending",
//     },
//     {
//         _id: "4",
//         name: "new post",
//         imgURL: "https://avatars.githubusercontent.com/u/95726917?v=4",
//         updatedAt: "2023-06-21T14:19:15.241Z",
//         status: "pending",
//     },
//     {
//         _id: "5",
//         name: "new post",
//         imgURL: "https://avatars.githubusercontent.com/u/95726917?v=4",
//         updatedAt: "2023-06-21T14:19:15.241Z",
//         status: "pending",
//     },
//     {
//         _id: "6",
//         name: "new post",
//         imgURL: "https://avatars.githubusercontent.com/u/95726917?v=4",
//         updatedAt: "2023-06-21T14:19:15.241Z",
//         status: "public",
//     },
//     {
//         _id: "7",
//         name: "new post",
//         imgURL: "https://avatars.githubusercontent.com/u/95726917?v=4",
//         updatedAt: "2023-06-21T14:19:15.241Z",
//         status: "rejected",
//     },
//     {
//         _id: "8",
//         name: "new post",
//         imgURL: "https://avatars.githubusercontent.com/u/95726917?v=4",
//         updatedAt: "2023-06-21T14:19:15.241Z",
//         status: "public",
//     },
//     {
//         _id: "9",
//         name: "new post",
//         imgURL: "https://avatars.githubusercontent.com/u/95726917?v=4",
//         updatedAt: "2023-06-21T14:19:15.241Z",
//         status: "pending",
//     },
//     {
//         _id: "10",
//         name: "new post",
//         imgURL: "https://avatars.githubusercontent.com/u/95726917?v=4",
//         updatedAt: "2023-06-21T14:19:15.241Z",
//         status: "pending",
//     },
// ];

const DashboardAdmin = () => {
    const [posts, setPosts] = useState<PostType[]>([]);
    const { data } = useSession();
    const router = useRouter();

    useLayoutEffect(() => {
        if (!data?.user.isAdmin) router.replace("/");
        (async () => {
            try {
                const res = await axios({
                    method: "GET",
                    url: "/api/posts/admin",
                });
                setPosts(res.data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [data?.user.isAdmin, router]);

    if (!data) {
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
    }

    return (
        <div>
            <div className="flex flex-col w-full  items-end">
                <SearchPost
                    onSearch={(val) => {
                        console.log(val);
                    }}
                ></SearchPost>
                <div className="my-2 w-full">
                    <PostManage>
                        {posts.map((post, index) => {
                            return (
                                <PostManageItem
                                    key={post._id}
                                    post={post}
                                    id={index + 1}
                                    actions={["view", "resolve", "reject"]}
                                ></PostManageItem>
                            );
                        })}
                    </PostManage>
                </div>
            </div>
        </div>
    );
};

export default DashboardAdmin;
