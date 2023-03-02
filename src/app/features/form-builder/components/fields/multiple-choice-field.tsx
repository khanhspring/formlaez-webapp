import { nanoid } from "nanoid";
import Form from "rc-field-form";
import { FC, useRef } from "react";
import Textarea from "../../../../components/form/form-controls/textarea";
import FormItem from "../../../../components/form/form-item";
import { ActionContext, FormField } from "../../../../models/form";
import { useUpdateField } from "../../hooks/useUpdateField";
import RequiredMark from "../required-mark";

type Props = {
    field: FormField;
    context: ActionContext;
}

const MultipleChoiceField: FC<Props> = ({ field, context }) => {

    const { values, updateDebounce } = useUpdateField(field, context);

    const containerRef = useRef<HTMLDivElement>(null);

    const onValuesChange = (changed: any, formValues: any) => {
        updateDebounce({ options: formValues.options });
    }

    return (
        <div className="flex flex-col gap-1.5 mb-2">
            {
                !(field.hideTitle === true) &&
                <div className="flex items-center">
                    <RequiredMark visible={field.required}/>
                    <input
                        value={values.title}
                        className="flex-1 w-full text-gray-100 bg-transparent outline-none"
                        onChange={(e) => updateDebounce({ title: e.target.value })}
                        placeholder="Multiple choice"
                    />
                </div>
            }
            {
                values.multipleSelection &&
                <div className="wf-full">
                    <span className="text-xs text-gray-500">(Choose as many as you like)</span>
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
                                                    className="!py-1 !px-2"
                                                />
                                            </FormItem>
                                            {
                                                fields.length > 1 &&
                                                <button
                                                    aria-label="Remove"
                                                    onClick={() => remove(index)}
                                                    className="absolute w-6 h-6 -right-3 top-[50%] translate-y-[-50%] rounded-full border border-cinder-600 bg-cinder-600/50 items-center justify-center hover:border-rose-700 hover:bg-rose-700/30 transition hidden group-hover/option-item:flex"
                                                >
                                                    <i className="fi fi-rr-cross-small"></i>
                                                </button>
                                            }
                                        </div>
                                    ))}

                                    <button
                                        aria-label="Add"
                                        onClick={() => add({ code: nanoid(), label: 'Unlabeled option' })}
                                        className="w-6 h-6 rounded-full border border-cinder-600 bg-cinder-600/50 items-center justify-center transition flex"
                                    >
                                        <i className="fi fi-rr-plus-small"></i>
                                    </button>
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