import { FC } from "react";
import { ActionContext, FormField } from "../../../../models/form";
import { useUpdateField } from "../../hooks/useUpdateField";
import RequiredMark from "../required-mark";

type Props = {
    field: FormField;
    context: ActionContext;
}

const OpinionScaleField: FC<Props> = ({ field, context }) => {

    const {values, updateDebounce} = useUpdateField(field, context);

    return (
        <div className="flex flex-col gap-1.5 mb-3">
            {
                !(field.hideTitle === true) &&
                <div className="flex items-center">
                    <RequiredMark visible={field.required}/>
                    <input
                        value={values.title}
                        className="flex-1 w-full text-slate-900 dark:text-gray-100 bg-transparent outline-none"
                        onChange={(e) => updateDebounce({title: e.target.value})}
                        placeholder="Opinion scale"
                    />
                </div>
            }
            <div className="relative w-full flex items-center gap-2 text-lg justify-between h-10">
                <span className="cursor-pointer flex-1 h-full border border-slate-900/10 text-slate-800 dark:text-gray-200 dark:border-gray-500 rounded flex items-center justify-center">0</span>
                <span className="cursor-pointer flex-1 h-full border border-slate-900/10 text-slate-800 dark:text-gray-200 dark:border-gray-500 rounded flex items-center justify-center">1</span>
                <span className="cursor-pointer flex-1 h-full border border-slate-900/10 text-slate-800 dark:text-gray-200 dark:border-gray-500 rounded flex items-center justify-center">2</span>
                <span className="cursor-pointer flex-1 h-full border border-slate-900/10 text-slate-800 dark:text-gray-200 dark:border-gray-500 rounded flex items-center justify-center">3</span>
                <span className="cursor-pointer flex-1 h-full border border-slate-900/10 text-slate-800 dark:text-gray-200 dark:border-gray-500 rounded flex items-center justify-center">4</span>
                <span className="cursor-pointer flex-1 h-full border border-slate-900/10 text-slate-800 dark:text-gray-200 dark:border-gray-500 rounded flex items-center justify-center">5</span>
                <span className="cursor-pointer flex-1 h-full border border-slate-900/10 text-slate-800 dark:text-gray-200 dark:border-gray-500 rounded flex items-center justify-center">6</span>
                <span className="cursor-pointer flex-1 h-full border border-slate-900/10 text-slate-800 dark:text-gray-200 dark:border-gray-500 rounded flex items-center justify-center">7</span>
                <span className="cursor-pointer flex-1 h-full border border-slate-900/10 text-slate-800 dark:text-gray-200 dark:border-gray-500 rounded flex items-center justify-center">8</span>
                <span className="cursor-pointer flex-1 h-full border border-slate-900/10 text-slate-800 dark:text-gray-200 dark:border-gray-500 rounded flex items-center justify-center">9</span>
                <span className="cursor-pointer flex-1 h-full border border-slate-900/10 text-slate-800 dark:text-gray-200 dark:border-gray-500 rounded flex items-center justify-center">10</span>
            </div>
        </div>
    );
}

export default OpinionScaleField;