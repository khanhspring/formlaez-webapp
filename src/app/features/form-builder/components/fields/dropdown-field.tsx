import { FC } from "react";
import { ActionContext, FormField } from "../../../../models/form";
import { useUpdateField } from "../../hooks/useUpdateField";

type Props = {
    field: FormField;
    context: ActionContext;
}

const DropdownField: FC<Props> = ({ field, context }) => {

    const { values, updateDebounce } = useUpdateField(field, context);

    return (
        <div className="flex flex-col gap-1.5 mb-2">
            {
                !(field.hideTitle === true) &&
                <div className="flex items-center">
                    {
                        field.required &&
                        <span className="text-rose-700 text-lg leading-3 pt-1.5 w-3.5 h-3.5 bg-cinder-700/70 rounded-full flex items-center justify-center mr-1">
                            *
                        </span>
                    }
                    <input
                        value={values.title}
                        className="flex-1 w-full text-gray-100 bg-transparent outline-none"
                        onChange={(e) => updateDebounce({title: e.target.value})}
                        placeholder="Dropdown"
                    />
                </div>
            }
            <div className="relative w-full">
                <input
                    value={values.placeholder}
                    className="px-4 py-2 pr-7 rounded-md dark:bg-cinder-700 border-none w-full text-gray-500 bg-transparent outline-none"
                    onChange={(e) => updateDebounce({placeholder: e.target.value})}
                />
                <i className="fi fi-sr-angle-small-down absolute top-0 right-0 h-full w-7 cursor-pointer text-gray-300"></i>
            </div>
        </div>
    );
}

export default DropdownField;