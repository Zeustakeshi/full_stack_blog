import { ActionProps } from "@/types/manage.type";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { FaEdit } from "react-icons/fa";

type Props = {} & ActionProps;

const ActionEdit = ({ postId }: Props) => {
    const router = useRouter();
    const handleEdit = () => {
        router.push(`/blog/edit/${postId}`);
    };
    return (
        <div
            onClick={handleEdit}
            className="relative w-[50px] h-[50px] text-xl text-slate-500 cursor-pointer  flex justify-center items-center"
        >
            <FaEdit></FaEdit>
        </div>
    );
};

export default ActionEdit;
