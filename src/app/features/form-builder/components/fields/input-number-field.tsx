import { FC } from "react";
import { ActionContext, FormField } from "../../../../models/form";
import { useUpdateField } from "../../hooks/useUpdateField";

type Props = {
    field: FormField;
    context: ActionContext;
}

const InputNumberField: FC<Props> = ({ field, context }) => {

    const {values, updateDebounce} = useUpdateField(field, context);

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
                        value={values.title}
                        className="flex-1 w-full text-gray-100 bg-transparent outline-none"
                        onChange={(e) => updateDebounce({title: e.target.value})}
                        placeholder="Input number"
                    />
                </div>
            }
            <div className="relative w-full">
                <input
                    value={values.placeholder}
                    className="px-4 py-2 pr-7 rounded-md dark:bg-cinder-700 border-none w-full text-gray-500 bg-transparent outline-none"
                    onChange={(e) => updateDebounce({placeholder: e.target.value})}
                />
                <i className="fi fi-rr-hastag absolute top-0 right-0 h-full w-7 cursor-pointer text-gray-300 text-sm"></i>
            </div>
        </div>
    );
}

export default InputNumberField;