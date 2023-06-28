import { UserType } from "@/types/user.type";
import mongoose, { Model, Schema } from "mongoose";

interface IUser extends UserType {
    password: string;
}

const userSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: true,
        },
        imgURL: {
            type: String,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Users || mongoose.model("Users", userSchema);
