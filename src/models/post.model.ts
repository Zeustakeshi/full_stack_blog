import mongoose, { Schema } from "mongoose";
import { PostCategroryType } from "../types/blog.type";
const postSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        },
        imgURL: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        categories: {
            type: Array<PostCategroryType>,
            default: [],
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Users",
        },
        likes: {
            type: Number,
            default: 0,
        },
        status: {
            type: String,
            default: "pending",
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Posts || mongoose.model("Posts", postSchema);
