import { ActionProps } from "@/types/manage.type";
import axios from "axios";
import Image from "next/image";
import React from "react";
import { MdOutlinePublic } from "react-icons/md";
import { toast } from "react-toastify";

type Props = {} & ActionProps;

const ActionReslove = ({ postId }: Props) => {
    const handlePublic = async () => {
        const isOk = confirm("This post will be public!");
        if (!isOk) return;

        await toast.promise(
            async () => {
                await axios({
                    method: "PATCH",
                    url: `/api/posts/admin/${postId}/public`,
                });
            },
            {
                pending: "Please wait",
                success: "Public successful",
                error: "Sometime went wrong",
            }
        );
    };
    return (
        <div
            onClick={handlePublic}
            className="relative w-[50px] h-[50px] text-xl text-slate-500 cursor-pointer  flex justify-center items-center"
        >
            <MdOutlinePublic></MdOutlinePublic>
        </div>
    );
};

export default ActionReslove;
