import Image from "next/image";
import React, { ChangeEvent } from "react";
import PreviewImage from "./ImagePreview";

type Props = {
    size?: {
        width?: number;
        height?: number;
    };
    className?: string;
    file: string | Blob | null;
    handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

const ImageUpload: React.FC<Props> = ({
    size,
    file,
    className = "",

    handleChange = () => {},
}) => {
    return (
        <label
            style={{
                width: size?.width || "100%",
                height: size?.height || "auto",
            }}
            className={`cursor-pointer  flex justify-center items-center bg-green-bright group relative border border-slate-300 dark:border-slate-800 w-full ${className}`}
        >
            <div className="w-full h-full flex justify-center items-center text-2xl text-secondary font-semibold rounded-[inherit] overflow-hidden">
                {file === "" || file === null ? (
                    <div className="w-[40%]">
                        <img
                            src={`/upload_image.png`}
                            alt="upload"
                            // className="w-[60%]"
                        />
                    </div>
                ) : (
                    <PreviewImage file={file} />
                )}
            </div>
            <input hidden type="file" onChange={handleChange} />
            {!file && (
                <div
                    style={
                        (typeof size?.height === "number" && {
                            width: size?.height / 5,
                            height: size.height / 5,
                            fontSize: size.height / 5,
                        }) ||
                        {}
                    }
                    className={` absolute w-[80px] h-[80px] text-6xl flex justify-center items-center bg-primary bg-opacity-50 transition-all rounded-full text-white invisible opacity-0 group-hover:visible group-hover:opacity-100`}
                >
                    +
                </div>
            )}
        </label>
    );
};

export default ImageUpload;
