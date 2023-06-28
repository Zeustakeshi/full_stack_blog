import { PostType } from "./blog.type";

export type ActionType = "view" | "edit" | "delete" | "resolve" | "reject";
export type ActionProps = {
    postId: string;
    postTitle: string;
    postImageURL: string;
};
