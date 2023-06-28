import { ActionProps, ActionType } from "@/types/manage.type";
import React from "react";
import Actions from "./actions";

type Props = {
    actions: ActionType[];
} & ActionProps;

const ManageActions: React.FC<Props> = ({
    postId,
    postTitle,
    postImageURL,
    actions,
}) => {
    return (
        <div className="col-span-1 flex justify-start items-center gap-5 text-slate-300">
            {actions.map((action, index) => {
                const ActionComponent = Actions[action];
                return (
                    <ActionComponent
                        postImageURL={postImageURL}
                        postId={postId}
                        postTitle={postTitle}
                        key={index}
                    />
                );
            })}
        </div>
    );
};

export default ManageActions;
