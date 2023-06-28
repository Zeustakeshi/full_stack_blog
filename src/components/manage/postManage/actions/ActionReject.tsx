import { ActionProps } from "@/types/manage.type";
import axios from "axios";
import React from "react";
import { RiCloseCircleFill } from "react-icons/ri";
import { toast } from "react-toastify";
type Props = {} & ActionProps;

const ActionReject = ({ postId }: Props) => {
    const handleReject = async () => {
        const isOk = confirm("This post will be hidden!");
        if (!isOk) return;

        await toast.promise(
            async () => {
                await axios({
                    method: "PATCH",
                    url: `/api/posts/admin/${postId}/reject`,
                });
            },
            {
                pending: "Please wait",
                success: "Reject successful",
                error: "Sometime went wrong",
            }
        );
    };
    return (
        <div
            onClick={handleReject}
            className=" relative w-[50px] h-[50px] text-xl text-slate-500 cursor-pointer  flex justify-center items-center"
        >
            <RiCloseCircleFill></RiCloseCircleFill>
        </div>
    );
};

export default ActionReject;
