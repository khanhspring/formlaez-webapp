import { FC } from "react";
import { useAppSelector } from "../../../../hooks/redux-hook";
import { ActionContext, FormField } from "../../../../models/form";
import { useUpdateField } from "../../hooks/useUpdateField";
import { selectForm } from "../../slice";
import RequiredMark from "../required-mark";

type Props = {
    field: FormField;
    context: ActionContext;
}

const EmailField: FC<Props> = ({ field, context }) => {

    const { values, updateDebounce } = useUpdateField(field, context);
    const form = useAppSelector(selectForm);

    return (
        <div className="flex flex-col gap-1.5 mb-2">
            {
                !(field.hideTitle === true) &&
                <div className="flex items-center">
                    <RequiredMark visible={field.required}/>
                    <input
                        value={values.title}
                        className="flex-1 w-full text-slate-900 dark:text-gray-100 bg-transparent outline-none"
                        onChange={(e) => updateDebounce({title: e.target.value})}
                        placeholder="Email"
                        disabled={form?.status === 'Archived'}
                    />
                </div>
            }
            <div className="relative w-full">
                <input
                    value={values.placeholder}
                    className="px-4 py-2 pr-7 rounded-md bg-slate-100 border border-slate-900/10 dark:border-transparent dark:bg-cinder-700 w-full text-gray-500 outline-none"
                    onChange={(e) => updateDebounce({placeholder: e.target.value})}
                    disabled={form?.status === 'Archived'}
                />
                <i className="fi fi-rr-envelope absolute top-0 right-0 h-full w-7 cursor-pointer text-slate-600 dark:text-gray-300 text-sm"></i>
            </div>
        </div>
    );
}

export default EmailField;