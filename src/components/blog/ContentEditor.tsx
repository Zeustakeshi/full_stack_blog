import { useState } from "react";
import Button from "../button/Button";
import TextEditor from "../textEditor/TextEditor";
import parse from "html-react-parser";

type ContentEditorType = {
    content: string;
    setContent: React.Dispatch<React.SetStateAction<string>>;
};

const ContentEditor: React.FC<ContentEditorType> = ({
    content,
    setContent,
}) => {
    const [showReview, setShowReview] = useState<boolean>(false);
    // console.log(content);
    return (
        <div className="my-8">
            <div className=" flex justify-between items-start w-full h-full gap-5">
                <div className="flex-1">
                    <TextEditor
                        content={content}
                        setContent={setContent}
                    ></TextEditor>
                </div>
                {showReview && (
                    <div className="mt-[112px] flex-1 entry-content">
                        {parse(content || "")}
                    </div>
                )}
            </div>
            <div className="flex w-full justify-end items-center gap-5 my-5">
                <p>Show review: </p>
                <Button
                    onClick={() => setShowReview((prev) => !prev)}
                    className={`${
                        showReview
                            ? "bg-blue-600"
                            : "shadow-[rgb(204,219,232)_3px_3px_6px_0px_inset,rgba(255,255,255,0.5)_-3px_-3px_6px_1px_inset] dark:shadow-[rgb(20,30,30)_3px_3px_6px_0px_inset,rgba(20,30,30,0.5)_-3px_-3px_6px_1px_inset]"
                    } !p-1 flex justify-center items-center relative gap-2  rounded-full`}
                >
                    <div className="w-[30px] h-[30px] flex justify-center items-center"></div>
                    <div
                        className={`top-[50%]  -translate-y-[50%] ${
                            showReview
                                ? "right-1 bg-white"
                                : "left-1 bg-blue-500"
                        } w-[30px] h-[30px]  rounded-full shadow-xl absolute transition-all duration-1000`}
                    ></div>
                    <div className="w-[30px] h-[30px] flex justify-center items-center"></div>
                </Button>
            </div>
        </div>
    );
};

export default ContentEditor;
