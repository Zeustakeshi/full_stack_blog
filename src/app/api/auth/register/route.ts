import { NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";
import connect from "@/utils/db";
import userModel from "@/models/user.model";
import bcrypt from "bcrypt";
import userValidate from "@/middlewares/validation/user.validate";

export const POST = async (req: Request) => {
    const data = await req.json();
    const validateData = userValidate.register.validate(data);

    if (validateData.error) {
        const error = validateData.error as any;
        return new NextResponse(error, {
            status: StatusCodes.BAD_REQUEST,
        });
    }
    const { username, email, password } = validateData.value;
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    const newUser = new userModel({
        username,
        email,
        password: hashPassword,
    });

    try {
        await connect();
        await newUser.save();
        return new NextResponse(JSON.stringify(newUser), {
            status: StatusCodes.OK,
        });
    } catch (error) {
        return new NextResponse(JSON.stringify(error), {
            status: StatusCodes.BAD_REQUEST,
        });
    }
};
