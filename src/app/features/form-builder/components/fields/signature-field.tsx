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

const SignatureField: FC<Props> = ({ field, context }) => {

    const form = useAppSelector(selectForm);
    const { values, updateDebounce } = useUpdateField(field, context);

    return (
        <div className="flex flex-col gap-1.5 mb-2">
            {
                !(field.hideTitle === true) &&
                <div className="flex items-center">
                    <RequiredMark visible={field.required} />
                    <input
                        value={values.title}
                        className="flex-1 w-full text-slate-900 dark:text-gray-100 bg-transparent outline-none"
                        onChange={(e) => updateDebounce({ title: e.target.value })}
                        placeholder="Input text"
                        disabled={form?.status === 'Archived'}
                    />
                </div>
            }
            <div className="flex items-center justify-center">
                <div className="max-w-[400px] w-full aspect-video bg-white rounded">

                </div>
            </div>
        </div>
    );
}

export default SignatureField;