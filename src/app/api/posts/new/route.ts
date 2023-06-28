import postValidate from "@/middlewares/validation/post.validate";
import postModel from "@/models/post.model";
import connect from "@/utils/db";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    const data = await req.json();
    const validateData = postValidate.createPost.validate(data);
    if (validateData.error) {
        const error = validateData.error as any;
        return new NextResponse(error, {
            status: StatusCodes.BAD_REQUEST,
        });
    }

    const newPost = new postModel(validateData.value);

    try {
        await connect();
        const data = await newPost.save();
        return new NextResponse(JSON.stringify(data), {
            status: StatusCodes.OK,
        });
    } catch (error: any) {
        return new NextResponse(error, {
            status: StatusCodes.BAD_REQUEST,
        });
    }
};
