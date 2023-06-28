import postModel from "@/models/post.model";
import connect from "@/utils/db";
import { StatusCodes } from "http-status-codes";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.NEXT_PUBLIC_SECRET;

export const GET = async (req: NextRequest) => {
    const token = await getToken({ req, secret });

    if (!token || !token.isAdmin) {
        return new NextResponse("Forbidden!", {
            status: StatusCodes.FORBIDDEN,
        });
    }

    try {
        await connect();
        const posts = await postModel
            .find({
                $or: [{ status: "pending" }, { status: "public" }],
            })
            .sort({ createdAt: 1 });

        return new NextResponse(JSON.stringify(posts), {
            status: StatusCodes.OK,
        });
    } catch (error: any) {
        return new NextResponse(error, {
            status: StatusCodes.INTERNAL_SERVER_ERROR,
        });
    }
};
