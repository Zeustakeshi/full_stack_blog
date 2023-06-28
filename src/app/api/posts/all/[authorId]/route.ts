import postModel from "@/models/post.model";
import connect from "@/utils/db";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

export const GET = async (
    req: Request,
    { params }: { params: { authorId: string } }
) => {
    try {
        await connect();
        const posts = await postModel.find({
            author: params.authorId,
        });
        return new NextResponse(JSON.stringify(posts), {
            status: StatusCodes.OK,
        });
    } catch (error: any) {
        return new NextResponse(error, {
            status: StatusCodes.BAD_REQUEST,
        });
    }
};
