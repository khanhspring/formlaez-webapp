import { FC } from "react";
import { ActionContext, FormField } from "../../../../models/form";
import { useUpdateField } from "../../hooks/useUpdateField";
import RequiredMark from "../required-mark";

type Props = {
    field: FormField;
    context: ActionContext;
}

const LongTextField: FC<Props> = ({ field, context }) => {

    const {values, updateDebounce} = useUpdateField(field, context);

    return (
        <div className="flex flex-col gap-1.5 mb-2">
            {
                !(field.hideTitle === true) &&
                <div className="flex items-center">
                    <RequiredMark visible={field.required}/>
                    <input
                        value={values.title}
                        className="flex-1 w-full text-gray-100 bg-transparent outline-none"
                        onChange={(e) => updateDebounce({title: e.target.value})}
                        placeholder="Long text"
                    />
                </div>
            }
            <textarea
                value={values.placeholder}
                className="px-4 py-2 rounded-md dark:bg-cinder-700 border-none w-full text-gray-500 bg-transparent outline-none resize-none"
                onChange={(e) => updateDebounce({placeholder: e.target.value})}
            />
        </div>
    );
}

export default LongTextField;