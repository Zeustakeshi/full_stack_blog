import postValidate from "@/middlewares/validation/post.validate";
import postModel from "@/models/post.model";
import connect from "@/utils/db";
import { StatusCodes } from "http-status-codes";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.NEXT_PUBLIC_SECRET;

export const POST = async (req: NextRequest) => {
    const data = await req.json();
    const token = await getToken({ req, secret });
    const validateData = postValidate.updatePost.validate(data);

    if (validateData.error) {
        const error = validateData.error as any;
        return new NextResponse(error, {
            status: StatusCodes.BAD_REQUEST,
        });
    }

    try {
        await connect();
        const post = await postModel.findById(validateData.value.postId);
        if (post.author !== token?._id) {
            return new NextResponse("UnAuthorized!", {
                status: StatusCodes.UNAUTHORIZED,
            });
        }

        delete validateData.value.postId;

        await postModel.findByIdAndUpdate(validateData.value.postId, {
            ...validateData.value,
            status: "pedding",
        });
    } catch (error: any) {
        return new NextResponse(error, {
            status: StatusCodes.BAD_REQUEST,
        });
    }
};
