import { useRef } from "react";
import ReactQuill from "react-quill";
import { useMemo } from "react";
import hljs from "highlight.js";

// styles
import "react-quill/dist/quill.snow.css";
import "highlight.js/styles/base16/dracula.css";
import "@/styles/editor.css";

type TextEditorType = {
    content: string;
    setContent: React.Dispatch<React.SetStateAction<string>>;
    className?: string;
};

const toolbarOptions = [
    // toggled buttons
    ["bold", "italic", "underline", "strike"],
    [
        { align: "" },
        { align: "center" },
        { align: "right" },
        { align: "justify" },
    ],
    ["blockquote", "code-block"],

    // custom button values
    // [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }],
    // [{ script: "sub" }, { script: "super" }], // superscript/subscript
    // [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    // [{ direction: "rtl" }], // text direction
    [{ header: [1, 2, 3, 4, false] }],
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    ["link", "image", "video"],
    ["clean"], // remove formatting button
];

const TextEditor: React.FC<TextEditorType> = ({
    content,
    setContent,
    className = "",
    ...props
}) => {
    const reactQuillRef = useRef<ReactQuill>(null);

    hljs.configure({
        languages: [
            "javascript",
            "typescript",
            "python",
            "c",
            "c++",
            "java",
            "HTML",
            "css",
            "rust",
            "SQL",
            "go",
        ],
    });
    const modules = useMemo(() => {
        return {
            toolbar: toolbarOptions,
            syntax: {
                highlight: (text: string) => hljs.highlightAuto(text).value,
            },
        };
    }, []);

    return (
        <ReactQuill
            ref={reactQuillRef}
            value={content}
            className={`entry-content ${className}`}
            modules={modules}
            onChange={setContent}
            {...props}
        />
    );
};
export default TextEditor;
