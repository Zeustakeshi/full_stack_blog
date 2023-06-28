"use client";
import Button from "@/components/button/Button";
import ImageUpload from "@/components/image/ImageUpload";
import TextEditor from "@/components/textEditor/TextEditor";
import useFIrebaseImage from "@/hooks/useFirebaseImgae";
import { PostCategroryType } from "@/types/blog.type";
import firebaseConfig from "@/utils/firebase.config";
import axios from "axios";
import { initializeApp } from "firebase/app";
import parse from "html-react-parser";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CgCloseO } from "react-icons/cg";
import React, {
    ChangeEvent,
    useEffect,
    useLayoutEffect,
    useState,
} from "react";
import { toast } from "react-toastify";

const EditBlog = ({ params }: { params: { id: string } }) => {
    const [categories, setCategories] = useState<PostCategroryType[]>([]);
    const [title, setTitle] = useState<string>("");
    const [desc, setDesc] = useState<string>("");
    const [file, setFile] = useState<string | Blob | null>("");
    const [content, setContent] = useState<string>("");

    const { data, status } = useSession();
    const router = useRouter();
    const { handleUploadImage } = useFIrebaseImage();

    useEffect(() => {
        (async () => {
            try {
                const res = await axios({
                    method: "GET",
                    url: `/api/posts/details/${params.id}`,
                });
                const { title, categories, desc, content, imgURL } = res.data;
                setTitle(title);
                setCategories(categories);
                setDesc(desc);
                setContent(content);
                setFile(imgURL);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [params.id]);

    useEffect(() => {
        if (!title.trim()) document.title = "Mh-blog";
        else document.title = title;
    }, [title]);

    useLayoutEffect(() => {
        if (status === "unauthenticated") {
            router.replace("/login");
        }
    }, [status, router]);

    const handleUpdate = () => {
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
                        url: "/api/posts/update",
                        data: {
                            postId: params.id,
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
                success: "Update successful!",
                error: "Something went wrong!",
            }
        );
    };

    const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.item(0)) setFile(e.target.files?.item(0));
    };

    return (
        <div>
            <h1 className="text-blue-600  font-semibold text-3xl">
                Update Post
            </h1>
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
                onClick={handleUpdate}
                className="px-5 py-3 rounded-md bg-blue-600 text-white font-semibold"
            >
                Create
            </Button>
        </div>
    );
};

type ContentEditorType = {
    content: string;
    setContent: React.Dispatch<React.SetStateAction<string>>;
};

const ContentEditor: React.FC<ContentEditorType> = ({
    content,
    setContent,
}) => {
    const [showReview, setShowReview] = useState<boolean>(false);
    // console.log(content);
    return (
        <div className="my-8">
            <div className=" flex justify-between items-start w-full h-full gap-5">
                <div className="flex-1">
                    <TextEditor
                        content={content}
                        setContent={setContent}
                    ></TextEditor>
                </div>
                {showReview && (
                    <div className="mt-[112px] flex-1 entry-content">
                        {parse(content || "")}
                    </div>
                )}
            </div>
            <div className="flex w-full justify-end items-center gap-5 my-5">
                <p>Show review: </p>
                <Button
                    onClick={() => setShowReview((prev) => !prev)}
                    className={`${
                        showReview
                            ? "bg-blue-600"
                            : "shadow-[rgb(204,219,232)_3px_3px_6px_0px_inset,rgba(255,255,255,0.5)_-3px_-3px_6px_1px_inset] dark:shadow-[rgb(20,30,30)_3px_3px_6px_0px_inset,rgba(20,30,30,0.5)_-3px_-3px_6px_1px_inset]"
                    } !p-1 flex justify-center items-center relative gap-2  rounded-full`}
                >
                    <div className="w-[30px] h-[30px] flex justify-center items-center"></div>
                    <div
                        className={`top-[50%]  -translate-y-[50%] ${
                            showReview
                                ? "right-1 bg-white"
                                : "left-1 bg-blue-500"
                        } w-[30px] h-[30px]  rounded-full shadow-xl absolute transition-all duration-1000`}
                    ></div>
                    <div className="w-[30px] h-[30px] flex justify-center items-center"></div>
                </Button>
            </div>
        </div>
    );
};

type CategoriesType = {
    categories: PostCategroryType[];
    setCategories: React.Dispatch<React.SetStateAction<PostCategroryType[]>>;
};

const Categories: React.FC<CategoriesType> = ({
    categories,
    setCategories,
}) => {
    const removeCategory = (id: number) => {
        setCategories((prev) => prev.filter((_, index) => index !== id));
    };
    return (
        <div className="row-span-2 col-span-1 border border-slate-300 dark:border-slate-800 p-5 flex justify-start items-start gap-3 flex-wrap">
            {categories.map((category, index) => {
                return (
                    <div
                        key={index}
                        className="group relative inline-block px-4 py-2 rounded-md bg-slate-200 dark:bg-slate-800"
                    >
                        {category}
                        <span
                            onClick={() => removeCategory(index)}
                            className="group-hover:flex hidden cursor-pointer rounded-full absolute -top-2 -right-2 bg-slate-300 dark:bg-slate-700 w-6 h-6 justify-center items-center text-xs transition-all"
                        >
                            <CgCloseO></CgCloseO>
                        </span>
                    </div>
                );
            })}
            {categories.length <= 8 && (
                <ButtonAddCategory
                    setCategories={setCategories}
                ></ButtonAddCategory>
            )}
        </div>
    );
};

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

export default EditBlog;
