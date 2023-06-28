import useFIrebaseImage from "@/hooks/useFirebaseImgae";
import { ActionProps } from "@/types/manage.type";
import firebaseConfig from "@/utils/firebase.config";
import axios from "axios";
import { initializeApp } from "firebase/app";
import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
type Props = {} & ActionProps;

const ActionDelete: React.FC<Props> = ({ postId, postTitle, postImageURL }) => {
    const { handleDeteleImage } = useFIrebaseImage();
    const handleDelete = async () => {
        const isOk = confirm("Are you sure to delete this post?");
        if (!isOk) return;
        initializeApp(firebaseConfig);
        toast.promise(
            async () => {
                await axios({
                    method: "DELETE",
                    url: `/api/posts/${postId}`,
                });
                handleDeteleImage(
                    postImageURL,
                    `images/${postTitle.toLowerCase().trim()}`
                );
            },
            {
                pending: "Please wait ....",
                success: "Delete successful",
                error: "Can't delete this post",
            }
        );
    };
    return (
        <div
            onClick={handleDelete}
            className="relative w-[50px] h-[50px] text-xl text-slate-500 cursor-pointer  flex justify-center items-center"
        >
            <FaTrashAlt></FaTrashAlt>
        </div>
    );
};

export default ActionDelete;
