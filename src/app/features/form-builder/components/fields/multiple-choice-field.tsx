import { nanoid } from "nanoid";
import Form from "rc-field-form";
import { FC, useRef } from "react";
import Textarea from "../../../../components/form/form-controls/textarea";
import FormItem from "../../../../components/form/form-item";
import { useAppSelector } from "../../../../hooks/redux-hook";
import { ActionContext, FormField } from "../../../../models/form";
import { useUpdateField } from "../../hooks/useUpdateField";
import { selectForm } from "../../slice";
import RequiredMark from "../required-mark";

type Props = {
    field: FormField;
    context: ActionContext;
}

const MultipleChoiceField: FC<Props> = ({ field, context }) => {

    const { values, updateDebounce } = useUpdateField(field, context);
    const form = useAppSelector(selectForm);

    const containerRef = useRef<HTMLDivElement>(null);

    const onValuesChange = (changed: any, formValues: any) => {
        updateDebounce({ options: formValues.options });
    }

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
                        placeholder="Multiple choice"
                        disabled={form?.status === 'Archived'}
                    />
                </div>
            }
            {
                values.multipleSelection &&
                <div className="wf-full">
                    <span className="text-xs text-slate-900/80 dark:text-gray-500">(Choose as many as you like)</span>
                </div>
            }
            <div
                ref={containerRef}
                className="w-full"
            >
                <Form
                    onValuesChange={onValuesChange}
                    className="flex flex-col items-start gap-2"
                    initialValues={{ options: [...values.options || []] }}
                >
                    <Form.List
                        name="options"
                    >
                        {(fields, { add, remove }) => {
                            return (
                                <>
                                    {fields.map((field, index) => (
                                        <div key={index} className="relative flex justify-center group/option-item">
                                            <FormItem {...field} name={[field.name, 'label']} hideError>
                                                <Textarea
                                                    placeholder="Unlabeled option"
                                                    container={containerRef}
                                                    autoSize
                                                    className="!py-1 !px-2 bg-slate-100 border border-slate-900/10"
                                                    disabled={form?.status === 'Archived'}
                                                />
                                            </FormItem>
                                            {
                                                fields.length > 1 && form?.status !== 'Archived' &&
                                                <button
                                                    aria-label="Remove"
                                                    onClick={() => remove(index)}
                                                    className="absolute w-6 h-6 -right-3 top-[50%] translate-y-[-50%] rounded-full border border-slate-900/10 bg-slate-100 dark:border-slate-600 dark:bg-slate-600/50 items-center justify-center hover:border-rose-700 dark:hover:bg-rose-700/30 dark:hover:border-rose-700 hover:bg-rose-700/30 transition hidden group-hover/option-item:flex"
                                                >
                                                    <i className="fi fi-rr-cross-small text-lg"></i>
                                                </button>
                                            }
                                        </div>
                                    ))}

                                    {
                                        form?.status !== 'Archived' &&
                                        <button
                                            aria-label="Add"
                                            onClick={() => add({ code: nanoid(), label: 'Unlabeled option' })}
                                            className="w-6 h-6 rounded-full border border-slate-900/10 bg-white hover:bg-slate-200 dark:border-slate-600 dark:bg-slate-600/50 dark:hover:bg-slate-600/80 items-center justify-center transition flex"
                                        >
                                            <i className="fi fi-rr-plus-small text-lg"></i>
                                        </button>
                                    }
                                </>
                            )
                        }}

                    </Form.List>
                </Form>
            </div>
        </div>
    );
}

export default MultipleChoiceField;