import { PostCategroryType } from "@/types/blog.type";
import { CgCloseO } from "react-icons/cg";
import ButtonAddCategory from "../button/ButtonAddCategory";

type CategoriesType = {
    categories: PostCategroryType[];
    setCategories: React.Dispatch<React.SetStateAction<PostCategroryType[]>>;
};

const Categories: React.FC<CategoriesType> = ({
    categories,
    setCategories,
}) => {
    const removeCategory = (id: number) => {
        setCategories((prev) => prev.filter((_, index) => index !== id));
    };
    return (
        <div className="row-span-2 col-span-1 border border-slate-300 dark:border-slate-800 p-5 flex justify-start items-start gap-3 flex-wrap">
            {categories.map((category, index) => {
                return (
                    <div
                        key={index}
                        className="group relative inline-block px-4 py-2 rounded-md bg-slate-200 dark:bg-slate-800"
                    >
                        {category}
                        <span
                            onClick={() => removeCategory(index)}
                            className="group-hover:flex hidden cursor-pointer rounded-full absolute -top-2 -right-2 bg-slate-300 dark:bg-slate-700 w-6 h-6 justify-center items-center text-xs transition-all"
                        >
                            <CgCloseO></CgCloseO>
                        </span>
                    </div>
                );
            })}
            {categories.length <= 8 && (
                <ButtonAddCategory
                    setCategories={setCategories}
                ></ButtonAddCategory>
            )}
        </div>
    );
};

export default Categories;
