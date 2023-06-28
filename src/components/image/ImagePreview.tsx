import React, { useState, useEffect } from "react";

type Props = {
    file: string | Blob;
};

const PreviewImage: React.FC<Props> = ({ file }) => {
    const [preview, setPreview] = useState<string | ArrayBuffer | Blob>(
        "/upload_image.png"
    );

    useEffect(() => {
        if (typeof file === "object") {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = () => {
                if (reader.result) {
                    setPreview(reader.result);
                }
            };
        } else {
            setPreview(file);
        }
    }, [file]);

    return (
        <>
            {preview && (
                <img
                    className="object-cover rounded-[inherit]"
                    style={{ width: "100%", height: "auto" }}
                    src={preview.toString()}
                    alt="preview"
                    onError={() => {
                        setPreview("/image_upload.png");
                    }}
                />
            )}
        </>
    );
};

export default PreviewImage;
