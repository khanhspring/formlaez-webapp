import Drawer from "rc-drawer";
import Switch from "rc-switch";
import { FC } from "react";
import { ActionContext, FormField } from "../../../../models/form";
import { useUpdateBasicInfo } from "../../hooks/useUpdateBasicInfo";

type Props = {
    field: FormField;
    context: ActionContext;
}

const SwitchField: FC<Props> = ({ field, context }) => {

    const { label, onLabelChange } = useUpdateBasicInfo(field, context);

    return (
        <div className="flex flex-col gap-1.5 mb-2">
            {
                !(field.hideTitle === true) &&
                <div className="flex items-center">
                    {
                        field.required &&
                        <span className="pr-1 pt-[7px] text-lg leading-3 text-red-500">*</span>
                    }
                    <input
                        value={label}
                        className="flex-1 w-full text-gray-100 bg-transparent outline-none"
                        onChange={onLabelChange}
                        placeholder="Switch"
                    />
                </div>
            }
            <Switch disabled />
        </div>
    );
}

export default SwitchField;