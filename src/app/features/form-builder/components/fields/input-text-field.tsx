import { FC } from "react";
import { ActionContext, FormField } from "../../../../models/form";
import { useUpdateBasicInfo } from "../../hooks/useUpdateBasicInfo";

type Props = {
    field: FormField;
    context: ActionContext;
}

const InputTextField: FC<Props> = ({ field, context }) => {

    const { label, placeholder, onLabelChange, onPlaceholderChange } = useUpdateBasicInfo(field, context);

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
                        placeholder="Input text"
                    />
                </div>
            }
            <input
                value={placeholder}
                className="px-4 py-2 rounded-md dark:bg-cinder-700 border-none w-full text-gray-500 bg-transparent outline-none"
                onChange={onPlaceholderChange}
            />
        </div>
    );
}

export default InputTextField;