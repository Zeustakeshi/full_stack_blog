import React from "react";

type Props = {
    children: React.ReactNode;
};

const PostManage: React.FC<Props> = ({ children }) => {
    return (
        <div className="my-8">
            <div className="grid grid-cols-6 bg-slate-200 dark:bg-slate-700 px-5 py-2 rounded-t-2xl font-semibold">
                <div className="col-span-1">Id</div>
                <div className="col-span-3">Posts</div>
                <div className="col-span-1">Status</div>
                <div className="col-span-1">Action</div>
            </div>
            <div className="rounded-b-2xl overflow-hidden">{children}</div>
        </div>
    );
};

export default PostManage;
