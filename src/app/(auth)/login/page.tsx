"use client";
import Button from "@/components/button/Button";
import ButtonLoginWithGithub from "@/components/button/ButtonLoginWithGithub";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, {
    ForwardedRef,
    InputHTMLAttributes,
    forwardRef,
    useEffect,
} from "react";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";

type Props = {};
type LoginFileds = {
    email: string;
    password: string;
};

const Login: React.FC<Props> = ({}) => {
    const router = useRouter();
    const { status } = useSession();

    useEffect(() => {
        document.title = "Login";
    }, []);

    useEffect(() => {
        if (status === "authenticated") router.replace("/");
    }, [status]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFileds>();

    const onSubmit: SubmitHandler<LoginFileds> = async (data) => {
        signIn("credentials", data);
    };

    return (
        <div className="flex justify-center items-center w-full h-[800px]">
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-none flex flex-col justify-center items-center gap-y-5 py-8 px-8 rounded-md shadow-xl white  backdrop:blur-md">
                <h1 className="text-3xl font-bold text-blue-500">Login</h1>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full h-full flex flex-col justify-center items-center gap-4"
                >
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
                    <Button className="w-full px-5 py-3 rounded-lg bg-blue-600 text-white font-semibold">
                        Login
                    </Button>
                </form>
                {/* <ButtonLoginWithGoogle></ButtonLoginWithGoogle> */}
                <ButtonLoginWithGithub></ButtonLoginWithGithub>
                <p className="flex justify-center items-center gap-1 text-sm">
                    <span className="">Don't have an account yet? </span>
                    <Link
                        className="text-md text-blue-600 font-semibold underline"
                        href="/register"
                    >
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

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

type InputFieldType = {
    error?: FieldError;
} & InputHTMLAttributes<HTMLInputElement>;

const InputField: React.FC<InputFieldType> = forwardRef(
    ({ error, ...props }, ref: ForwardedRef<HTMLInputElement>) => {
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
    }
);

export default Login;
