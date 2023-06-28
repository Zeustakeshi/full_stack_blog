import postModel from "@/models/post.model";
import connect from "@/utils/db";
import { StatusCodes } from "http-status-codes";
import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.NEXT_PUBLIC_SECRET;
export const DELETE = async (
    req: NextRequest,
    { params }: { params: { id: string } }
) => {
    const token = await getToken({ req, secret });
    if (!token) {
        return new NextResponse("unAuthorized!", {
            status: StatusCodes.UNAUTHORIZED,
        });
    }
    try {
        await connect();
        await postModel.findOneAndDelete({
            _id: params.id,
            author: token?._id,
        });
        return new NextResponse("delete successful!", {
            status: StatusCodes.OK,
        });
    } catch (error: any) {
        return new NextResponse(error, {
            status: StatusCodes.BAD_REQUEST,
        });
    }
};
