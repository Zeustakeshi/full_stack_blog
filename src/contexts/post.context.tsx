"use client";
import { PostType } from "@/types/blog.type";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

type PostsProviderProps = {
    children: React.ReactNode;
};

type PostsContextType = {
    posts: PostType[];
    loading: Boolean;
};

const PostsContext = React.createContext<PostsContextType | null>(null);

const PostsProvider: React.FC<PostsProviderProps> = ({ children }) => {
    const [posts, setPosts] = useState<PostType[]>([]);
    const [loading, setLoading] = useState<Boolean>(false);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const res = await axios({
                    url: "/api/posts",
                    method: "GET",
                });
                setPosts(res.data);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        })();
    }, []);

    const values = { posts, loading };
    return (
        <PostsContext.Provider value={values}>{children}</PostsContext.Provider>
    );
};

const usePosts = () => {
    const context = useContext(PostsContext);
    if (typeof context === "undefined" || !context) {
        throw new Error("usePosts must be used within PostsProvider");
    }
    return context;
};

export { usePosts, PostsProvider };
