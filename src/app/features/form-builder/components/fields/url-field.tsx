import { FC } from "react";
import { useAppSelector } from "../../../../hooks/redux-hook";
import { ActionContext, FormField } from "../../../../models/form";
import { useUpdateField } from "../../hooks/useUpdateField";
import { selectForm } from "../../slice";
import RequiredMark from "../required-mark";
import { GlobeAltIcon, GlobeEuropeAfricaIcon } from "@heroicons/react/24/solid";

type Props = {
    field: FormField;
    context: ActionContext;
}

const UrlField: FC<Props> = ({ field, context }) => {

    const { values: {title}, updateDebounce: updateTitle } = useUpdateField(field, context);
    const { values: {placeholder}, updateDebounce: updatePlaceholder } = useUpdateField(field, context);
    const form = useAppSelector(selectForm);

    return (
        <div className="flex flex-col gap-1.5 mb-2">
            {
                !(field.hideTitle === true) &&
                <div className="flex items-center">
                    <RequiredMark visible={field.required}/>
                    <input
                        value={title}
                        className="flex-1 w-full text-slate-900 dark:text-gray-100 bg-transparent outline-none"
                        onChange={(e) => updateTitle({title: e.target.value})}
                        placeholder="URL"
                        disabled={form?.status === 'Archived'}
                    />
                </div>
            }
            <div className="relative w-full">
                <input
                    value={placeholder}
                    className="px-4 py-2 pr-7 rounded-md bg-white border border-slate-900/10 dark:border-steel-gray-800 dark:bg-steel-gray-900 w-full text-gray-400 outline-none"
                    onChange={(e) => updatePlaceholder({placeholder: e.target.value})}
                    disabled={form?.status === 'Archived'}
                />
                <GlobeEuropeAfricaIcon className="w-5 h-5 absolute top-2.5 right-2 cursor-pointer text-slate-600 dark:text-gray-300"/>
            </div>
        </div>
    );
}

export default UrlField;