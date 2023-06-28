import mongoose, { Schema } from "mongoose";
const likeSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Users",
        },
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Posts",
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Likes || mongoose.model("Likes", likeSchema);
