import Posts from "@/models/post.model";
import connect from "@/utils/db";
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        await connect();
        const posts = await Posts.find({ status: "public" });
        return new NextResponse(JSON.stringify(posts), {
            status: StatusCodes.OK,
        });
    } catch (error) {
        return new NextResponse(JSON.stringify(error), {
            status: StatusCodes.INTERNAL_SERVER_ERROR,
        });
    }
};
