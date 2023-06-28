import ActionDelete from "./ActionDelete";
import ActionEdit from "./ActionEdit";
import ActionReject from "./ActionReject";
import ActionReslove from "./ActionReslove";
import ActionView from "./ActionView";

const Actions = {
    view: ActionView,
    edit: ActionEdit,
    delete: ActionDelete,
    resolve: ActionReslove,
    reject: ActionReject,
};

export default Actions;
