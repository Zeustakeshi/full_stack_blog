export type PostCategroryType = "code" | "animal" | "learn" | "other" | string;
export type PostType = {
    _id: string;
    imgURL: string;
    title: string;
    desc: string;
    content: string;
    likes: number;
    author: {
        _id: string;
        username: string;
        imgURL: string;
    };
    categories: PostCategroryType[];
    status: "pending" | "public" | "rejected";
    updatedAt: string;
    createdAt: string;
};
