"use client";
import Button from "@/components/button/Button";
import ButtonLoginWithGithub from "@/components/button/ButtonLoginWithGithub";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, {
    ForwardedRef,
    InputHTMLAttributes,
    forwardRef,
    useEffect,
} from "react";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

type Props = {};
type RegisterType = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
};

const Register = (props: Props) => {
    const router = useRouter();
    const { status } = useSession();

    useEffect(() => {
        document.title = "Register";
    }, []);

    useEffect(() => {
        if (status === "authenticated") router.replace("/");
    }, [status, router]);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<RegisterType>();

    const onSubmit: SubmitHandler<RegisterType> = async (data) => {
        await toast.promise(
            async () => {
                const res = await axios({
                    method: "POST",
                    url: "/api/auth/register",
                    data: {
                        username: data.username,
                        email: data.email,
                        password: data.password,
                    },
                });
                router.replace("/login");
            },
            {
                error: "something went wrong!",
                pending: "Please wait!",
                success: "okay!",
            }
        );
    };

    return (
        <div className="flex justify-center items-center w-full h-[800px]">
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-none flex flex-col justify-center items-center gap-y-5 py-8 px-8 rounded-md shadow-xl white  backdrop:blur-md">
                <h1 className="text-3xl font-bold text-blue-500">Register</h1>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full h-full flex flex-col justify-center items-center gap-4"
                >
                    <InputField
                        error={errors.username}
                        placeholder="username"
                        {...register("username", {
                            required: true,
                            minLength: {
                                value: 5,
                                message: "username must be 5 - 20 characters",
                            },
                            maxLength: {
                                value: 20,
                                message: "username must be 5 - 20 characters",
                            },
                        })}
                    ></InputField>
                    <InputField
                        error={errors.email}
                        type="email"
                        placeholder="email"
                        {...register("email", {
                            required: true,
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "invalid email address",
                            },
                        })}
                    ></InputField>
                    <InputField
                        error={errors.password}
                        type="password"
                        placeholder="password"
                        {...register("password", {
                            required: true,
                            minLength: {
                                value: 8,
                                message: "be at least 8 characters long.",
                            },
                        })}
                    ></InputField>
                    <InputField
                        error={errors.confirmPassword}
                        type="password"
                        placeholder="Confirm password"
                        {...register("confirmPassword", {
                            required: true,
                            validate: (value: string) => {
                                if (watch("password") !== value) {
                                    return "Your passwords do no match";
                                }
                            },
                        })}
                    ></InputField>

                    <Button className="w-full px-5 py-3 rounded-lg bg-blue-600 text-white font-semibold">
                        Register
                    </Button>
                </form>
                {/* <ButtonLoginWithGoogle></ButtonLoginWithGoogle> */}
                <ButtonLoginWithGithub></ButtonLoginWithGithub>
                <p className="flex justify-center items-center gap-1 text-sm">
                    <span className="">Are you currently a member?</span>
                    <Link
                        className="text-md text-blue-600 font-semibold underline"
                        href="/login"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

type InputFieldType = {
    error?: FieldError;
} & InputHTMLAttributes<HTMLInputElement>;

const InputField: React.FC<InputFieldType> = forwardRef(function InputField(
    { error, ...props },
    ref: ForwardedRef<HTMLInputElement>
) {
    return (
        <div className="w-full">
            <input
                ref={ref}
                className="border border-slate-300 dark:border-none dark:bg-slate-700 outline-blue-600 w-full px-5 py-3 rounded-md"
                {...props}
            />
            <ErrorMessage error={error}></ErrorMessage>
        </div>
    );
});

type ErrorMessageType = {
    error?: FieldError;
};
const ErrorMessage: React.FC<ErrorMessageType> = ({ error }) => {
    if (!error?.message && !error?.type) return <></>;
    return (
        <div className=" mt-2 text-xs text-rose-600 dark:text-rose-500 font-medium w-full">
            {error.message || error.type}
        </div>
    );
};

export default Register;
