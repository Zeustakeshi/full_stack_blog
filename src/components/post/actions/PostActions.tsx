"use client";
import ButtonLikePost from "@/components/button/ButtonLikePost";
import React, { useState } from "react";
type Props = {
    postId: string;
    className?: string;
    like: number;
};

const PostActions: React.FC<Props> = ({ postId, className, like }) => {
    const [likeCount, setLikeCount] = useState<number>(like);
    return (
        <div className={` flex justify-end items-center  ${className}`}>
            <div className="bg-white dark:bg-slate-800 shadow-sm px-4 py-2 border border-slate-200 dark:border-none flex justify-center items-center rounded-md text-lg">
                <span className="">{likeCount}</span>
                <ButtonLikePost
                    className="!px-3 !py-2"
                    postId={postId}
                    setLike={setLikeCount}
                ></ButtonLikePost>
            </div>
        </div>
    );
};

export default PostActions;
