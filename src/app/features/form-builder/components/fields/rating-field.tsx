import { FC } from "react";
import { useAppSelector } from "../../../../hooks/redux-hook";
import { ActionContext, FormField } from "../../../../models/form";
import { useUpdateField } from "../../hooks/useUpdateField";
import { selectForm } from "../../slice";
import RequiredMark from "../required-mark";
import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarOutlineIcon } from "@heroicons/react/24/outline";

type Props = {
    field: FormField;
    context: ActionContext;
}

const RatingField: FC<Props> = ({ field, context }) => {

    const { values, updateDebounce } = useUpdateField(field, context);
    const formInfo = useAppSelector(selectForm);

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
                        placeholder="Rating"
                        disabled={formInfo?.status === 'Archived'}
                    />
                </div>
            }
            <div className="relative w-full flex items-center gap-2 text-3xl justify-center text-slate-900 dark:text-gray-200">
                <StarIcon className="w-10 h-10 cursor-pointer text-yellow-400"/>
                <StarIcon className="w-10 h-10 cursor-pointer text-yellow-400"/>
                <StarIcon className="w-10 h-10 cursor-pointer text-yellow-400"/>
                <StarIcon className="w-10 h-10 cursor-pointer text-yellow-400"/>
                <StarOutlineIcon className="w-10 h-10 cursor-pointer text-slate-900 dark:text-gray-400"/>
            </div>
        </div>
    );
}

export default RatingField;