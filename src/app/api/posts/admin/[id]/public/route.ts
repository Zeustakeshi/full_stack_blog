import postModel from "@/models/post.model";
import connect from "@/utils/db";
import { StatusCodes } from "http-status-codes";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// http://localhost:4000/api/posts/admin/post_id/public

const secret = process.env.NEXT_PUBLIC_SECRET;

export const PATCH = async (
    req: NextRequest,
    { params }: { params: { id: string } }
) => {
    const token = await getToken({ req, secret });

    if (!token || !token.isAdmin) {
        return new NextResponse("Forbidden!", {
            status: StatusCodes.FORBIDDEN,
        });
    }
    try {
        await connect();
        await postModel.findByIdAndUpdate(params.id, { status: "public" });

        return new NextResponse("Public post sussessful", {
            status: StatusCodes.OK,
        });
    } catch (error: any) {
        return new NextResponse(error, {
            status: StatusCodes.INTERNAL_SERVER_ERROR,
        });
    }
};
