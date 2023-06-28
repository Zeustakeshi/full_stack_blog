import likeModel from "@/models/like.model";
import connect from "@/utils/db";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

// https://localhost:4000/api/posts/details/postid_sdfadfadsf/liked?userId=adklfadskfjkasdlfj
export const GET = async (
    req: Request,
    { params }: { params: { id: string } }
) => {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    try {
        await connect();
        const liked = await likeModel.findOne({ postId: params.id, userId });
        return new NextResponse(JSON.stringify(!!liked), {
            status: StatusCodes.OK,
        });
    } catch (error: any) {
        return new NextResponse(error, {
            status: StatusCodes.BAD_REQUEST,
        });
    }
};
