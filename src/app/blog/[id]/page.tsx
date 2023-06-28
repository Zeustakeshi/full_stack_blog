import Avatar from "@/components/avatar/Avatar";
import { PostType } from "@/types/blog.type";
import axios from "axios";
import parse from "html-react-parser";
import Image from "next/image";

import PostActions from "@/components/post/actions/PostActions";
import "@/styles/editor.css";
import "highlight.js/styles/base16/dracula.css";
import { Roboto } from "next/font/google";
import "react-quill/dist/quill.snow.css";

const roboto = Roboto({
    subsets: ["vietnamese", "latin"],
    weight: ["400", "500", "700"],
});

export const generateMetadata = async ({
    params,
}: {
    params: { id: string };
}) => {
    const res = await axios({
        method: "GET",
        url: `http://localhost:4000/api/posts/details/${params.id}`,
    });

    const data: PostType = res.data;

    return {
        title: `${data.title} - mh-blog`,
        description: `Read the insightful blog post titled "${data.title}" on mh-blog. Gain valuable knowledge, explore different ideas, and engage in meaningful discussions. ${data.desc}`,
    };
};

const BlogPage = async ({ params }: { params: { id: string } }) => {
    const res = await axios({
        method: "GET",
        url: `http://localhost:4000/api/posts/details/${params.id}`,
    });
    const data: PostType = res.data;
    return (
        <div className={roboto.className}>
            <div className="mt-5 mb-10 flex justify-between items-start gap-5 max-h-[600px] ">
                <div className="flex-1">
                    <h1 className="text-4xl font-semibold my-5 ">
                        {data.title}
                    </h1>
                    <div className="my-4 flex justify-start items-center gap-2">
                        <Avatar
                            src={data.author.imgURL || "/user_avatar_1.png"}
                            size={50}
                            to="/"
                        ></Avatar>
                        <h4 className="text-sm font-medium text-slate-500">
                            {data.author.username}
                        </h4>
                    </div>
                    <div className="flex justify-start items-center gap-2 my-4">
                        {data.categories.map((category, index) => {
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

                    <p className="text-sm text-slate-500">{data.desc}</p>
                </div>
                <div className="flex-1 flex justify-center items-center w-[400px] h-[400px] relative rounded-lg shadow-lg overflow-hidden">
                    <Image
                        src={data.imgURL}
                        alt={`blog-image-${data.title}`}
                        fill
                        // className="w-full h-full object-cover"
                    ></Image>
                </div>
            </div>
            <div className="leading-loose text-lg entry-content">
                {parse(data.content)}
            </div>
            <PostActions postId={data._id} like={data.likes}></PostActions>
        </div>
    );
};

export default BlogPage;
