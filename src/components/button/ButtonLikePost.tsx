"use client";
import { AiOutlineLike, AiTwotoneLike } from "react-icons/ai";
import Button from "./Button";
import { HTMLAttributes, useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type ButtonLikePostType = {
    postId: string;
    setLike: React.Dispatch<React.SetStateAction<number>>;
} & HTMLAttributes<HTMLButtonElement>;
const ButtonLikePost: React.FC<ButtonLikePostType> = ({
    postId,
    setLike,
    ...props
}) => {
    const [liked, setLiked] = useState<boolean>(false);
    const { status, data } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status !== "authenticated") return;
        (async () => {
            const res = await axios({
                method: "GET",
                url: `/api/posts/details/${postId}/liked?userId=${data?.user._id}`,
            });

            setLiked(res.data);
        })();
    }, [status, data?.user._id, postId]);

    const handler = async (action: "like" | "unlike") => {
        try {
            await axios({
                method: "PATCH",
                url: `/api/posts/${postId}/${action}`,
                data: {
                    userId: data?.user._id,
                },
            });
            if (action === "like") {
                setLiked(true);
                setLike((prev) => prev + 1);
            } else {
                setLiked(false);
                setLike((prev) => prev - 1);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const onLikePost = async () => {
        if (status === "unauthenticated") router.push("/login");
        if (liked) handler("unlike");
        else handler("like");
    };

    return (
        <Button onClick={onLikePost} {...props}>
            {!liked && <AiOutlineLike></AiOutlineLike>}
            {liked && <AiTwotoneLike></AiTwotoneLike>}
        </Button>
    );
};

export default ButtonLikePost;
