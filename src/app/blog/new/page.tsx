"use client";
import Categories from "@/components/blog/Categories";
import ContentEditor from "@/components/blog/ContentEditor";
import Button from "@/components/button/Button";
import ImageUpload from "@/components/image/ImageUpload";
import useFIrebaseImage from "@/hooks/useFirebaseImgae";
import { PostCategroryType } from "@/types/blog.type";
import firebaseConfig from "@/utils/firebase.config";
import axios from "axios";
import { initializeApp } from "firebase/app";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useLayoutEffect, useState } from "react";
import { toast } from "react-toastify";

const NewBlog = () => {
    const [categories, setCategories] = useState<PostCategroryType[]>([]);
    const [title, setTitle] = useState<string>("");
    const [desc, setDesc] = useState<string>("");
    const [file, setFile] = useState<string | Blob | null>("");
    const [content, setContent] = useState<string>("");

    const { data, status } = useSession();
    const router = useRouter();
    const { handleUploadImage } = useFIrebaseImage();

    useEffect(() => {
        if (!title.trim()) document.title = "Mh-blog";
        else document.title = title;
    }, [title]);

    useLayoutEffect(() => {
        if (status === "unauthenticated") {
            router.replace("/login");
        }
    }, [status, router]);
    const handleCreate = () => {
        initializeApp(firebaseConfig);
        if (title.trim().length < 5) {
            toast.error("Invalid title");
            return null;
        }
        if (desc.trim().length <= 10) {
            toast.error("Invalid description");
            return null;
        }
        if (content.trim().length <= 200) {
            toast.error("Invalid content!");
            return null;
        }

        toast.promise(
            async () => {
                try {
                    const imgURL = await handleUploadImage(
                        file as Blob,
                        `images/${title.toLowerCase().trim()}`
                    );

                    const res = await axios({
                        method: "POST",
                        url: "/api/posts/new",
                        data: {
                            author: data?.user._id,
                            title,
                            imgURL,
                            desc,
                            categories,
                            content,
                        },
                    });
                    if (res.data) router.push("/manage/posts");
                } catch (error) {
                    console.log(error);
                }
            },
            {
                pending: "Please wait!",
                success: "Create successful!",
                error: "Somethint went wrong!",
            }
        );
    };

    const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.item(0)) setFile(e.target.files?.item(0));
    };

    return (
        <div>
            <h1 className="text-blue-600  font-semibold text-3xl">New Post</h1>
            <div className="my-8 grid grid-cols-2 grid-rows-8 gap-8">
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="h-auto row-span-1 col-span-2 w-full border border-slate-300 outline-blue-600 px-5 py-4 rounded-md dark:bg-slate-800 dark:border-none dark:outline-none"
                    type="text"
                    placeholder="Title"
                />
                <textarea
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    maxLength={300}
                    className="resize-none  row-span-3  col-span-2 min-h-[200px] w-full border border-slate-300 outline-blue-600 px-5 py-4 rounded-md dark:bg-slate-800 dark:border-none dark:outline-none"
                    placeholder="Description [0-300]"
                ></textarea>
                <ImageUpload
                    className="row-span-2 col-span-1"
                    file={file}
                    handleChange={handleChangeImage}
                    size={{ height: 400 }}
                ></ImageUpload>

                <Categories
                    categories={categories}
                    setCategories={setCategories}
                ></Categories>
            </div>
            <ContentEditor
                content={content}
                setContent={setContent}
            ></ContentEditor>
            <Button
                onClick={handleCreate}
                className="px-5 py-3 rounded-md bg-blue-600 text-white font-semibold"
            >
                Create
            </Button>
        </div>
    );
};

export default NewBlog;
