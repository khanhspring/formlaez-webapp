import { ArrowsPointingOutIcon } from "@heroicons/react/24/solid";
import { FC, useState } from "react";
import Modal from "../../../../components/common/modal";
import { useAppSelector } from "../../../../hooks/redux-hook";
import { ActionContext, FormField } from "../../../../models/form";
import { useUpdateField } from "../../hooks/useUpdateField";
import { selectForm } from "../../slice";
import RequiredMark from "../required-mark";

type Props = {
    field: FormField;
    context: ActionContext;
}

const InputMarkdownField: FC<Props> = ({ field, context }) => {

    const { values: { title }, updateDebounce: updateTitle } = useUpdateField(field, context);
    const { values: { placeholder }, updateDebounce: updatePlaceholder } = useUpdateField(field, context);
    const form = useAppSelector(selectForm);

    return (
        <>
            <div className="flex flex-col gap-1.5 mb-2">
                {
                    !(field.hideTitle === true) &&
                    <div className="flex items-center">
                        <RequiredMark visible={field.required} />
                        <input
                            value={title}
                            className="flex-1 w-full text-slate-900 dark:text-gray-100 bg-transparent outline-none"
                            onChange={(e) => updateTitle({ title: e.target.value })}
                            placeholder="Long text"
                            disabled={form?.status === 'Archived'}
                        />
                    </div>
                }
                <div className="flex flex-col w-full rounded-md border border-slate-900/10 dark:border-steel-gray-800 p-2">
                    <div className="flex items-center justify-between pb-2">
                        <div className="flex gap-1 items-center text-sm">
                            <span className="inline-block px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-steel-gray-800">Write</span>
                            <span className="inline-block px-1.5 py-0.5 rounded">Preview</span>
                        </div>
                        <div className="flex items-center justify-center">
                            <ArrowsPointingOutIcon className="w-5 h-5"/>
                        </div>
                    </div>
                    <textarea
                        value={placeholder}
                        className="px-4 py-2 rounded-md bg-white border border-slate-900/10 dark:border-steel-gray-800 dark:bg-steel-gray-900 w-full text-gray-400 outline-none resize-none"
                        onChange={(e) => updatePlaceholder({ placeholder: e.target.value })}
                        disabled={form?.status === 'Archived'}
                        rows={7}
                    />
                </div>
            </div>
        </>
    );
}

export default InputMarkdownField;