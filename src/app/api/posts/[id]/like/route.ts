import postValidate from "@/middlewares/validation/post.validate";
import likeModel from "@/models/like.model";
import postModel from "@/models/post.model";
import connect from "@/utils/db";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

export const PATCH = async (
    req: Request,
    { params }: { params: { id: string } }
) => {
    const postId = params.id;
    const data = await req.json();
    const validateData = postValidate.likePost.validate(data);
    const { userId } = validateData.value;
    try {
        await connect();
        const isLiked = await likeModel.findOne({ userId, postId });
        if (isLiked) {
            return new NextResponse("this post has been liked", {
                status: StatusCodes.CONFLICT,
            });
        } else {
            const newLike = new likeModel({
                userId,
                postId,
            });
            await newLike.save();
            await postModel.findOneAndUpdate(
                { _id: postId },
                {
                    $inc: { likes: 1 },
                }
            );
            return new NextResponse("Success", {
                status: StatusCodes.OK,
            });
        }
    } catch (error: any) {
        return new NextResponse(error, {
            status: StatusCodes.BAD_REQUEST,
        });
    }
};
