import moment from "moment";
import Image from "next/image";
import ManageActions from "./ManageActions";
import { ActionType } from "@/types/manage.type";
import { PostType } from "@/types/blog.type";

// type PostType = {
//     _id: string;
//     name: string;
//     imgURL: string;
//     updatedAt: string;
//     status: "pending" | "public" | "rejected";
// };

type PostManageItemType = {
    post: PostType;
    id: number;
    actions: ActionType[];
};

const PostManageItem: React.FC<PostManageItemType> = ({
    id,
    post,
    actions,
}) => {
    return (
        <div
            className="grid grid-cols-6  px-5 py-2 even:bg-slate-100 dark:even:bg-slate-700 dark:odd:bg-slate-800"
            key={post._id}
        >
            <div className="col-span-1 flex items-center w-full h-full">
                {id}
            </div>
            <div className="col-span-3 flex justify-start items-start gap-5">
                <div className="w-[60px] h-[60px] rounded-lg relative overflow-hidden">
                    <Image src={post.imgURL} alt="post-image" fill></Image>
                </div>
                <div className="flex flex-col justify-center items-start gap-1">
                    <span className="text-lg whitespace-nowrap overflow-hidden text-ellipsis max-w-[350px]">
                        {post.title}
                    </span>
                    <span className="text-xs text-slate-500">
                        {moment(post.updatedAt).format("DD-MM-YYYY")}
                    </span>
                </div>
            </div>
            <div
                className={`col-span-1 flex items-center font-semibold manage-post-status--${post.status}`}
            >
                {post.status.toString()}
            </div>
            <ManageActions
                postImageURL={post.imgURL}
                postId={post._id}
                postTitle={post.title}
                actions={actions}
            ></ManageActions>
        </div>
    );
};

export default PostManageItem;
