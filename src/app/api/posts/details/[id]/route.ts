import likeModel from "@/models/like.model";
import postModel from "@/models/post.model";
import connect from "@/utils/db";
import { StatusCodes } from "http-status-codes";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
    req: NextRequest,
    { params }: { params: { id: string } }
) => {
    try {
        await connect();
        const postDetail = await postModel
            .findOne({ _id: params.id })
            .populate("author", "username _id imgURL");

        return new NextResponse(JSON.stringify(postDetail), {
            status: StatusCodes.OK,
        });
    } catch (error: any) {
        return new NextResponse(error, {
            status: StatusCodes.BAD_REQUEST,
        });
    }
};
