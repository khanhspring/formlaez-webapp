import { FC } from "react";
import { ActionContext, FormField } from "../../../../models/form";
import { useUpdateField } from "../../hooks/useUpdateField";

type Props = {
    field: FormField;
    context: ActionContext;
}

const InputTextField: FC<Props> = ({ field, context }) => {

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
                        onChange={(e) => updateDebounce({ title: e.target.value })}
                        placeholder="Input text"
                    />
                </div>
            }
            <input
                value={values.placeholder}
                className="px-4 py-2 rounded-md dark:bg-cinder-700 border-none w-full text-gray-500 bg-transparent outline-none"
                onChange={(e) => updateDebounce({ placeholder: e.target.value })}
            />
        </div>
    );
}

export default InputTextField;