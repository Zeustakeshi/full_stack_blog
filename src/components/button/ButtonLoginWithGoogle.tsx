import React from "react";
import Button from "./Button";

type Props = {};

const ButtonLoginWithGoogle = (props: Props) => {
    return (
        <Button className="bg-white  border-slate-300 border dark:bg-slate-700 dark:border-none rounded-lg min-w-[500px] font-medium py-3">
            Continue with Google
        </Button>
    );
};

export default ButtonLoginWithGoogle;
