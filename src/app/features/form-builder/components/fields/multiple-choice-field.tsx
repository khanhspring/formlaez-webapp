import { nanoid } from "nanoid";
import Form from "rc-field-form";
import { FC, useRef } from "react";
import Textarea from "../../../../components/form/form-controls/textarea";
import FormItem from "../../../../components/form/form-item";
import { ActionContext, FormField } from "../../../../models/form";
import { useUpdateBasicInfo } from "../../hooks/useUpdateBasicInfo";

type Props = {
    field: FormField;
    context: ActionContext;
}

const MultipleChoiceField: FC<Props> = ({ field, context }) => {

    const { label, onLabelChange, onOptionsChange } = useUpdateBasicInfo(field, context);
    const containerRef = useRef<HTMLDivElement>(null);

    const onValuesChange = (changed: any, values: any) => {
        onOptionsChange?.(values.options);
    }

    return (
        <div className="flex flex-col gap-1.5 mb-2">
            {
                !(field.hideTitle === true) &&
                <div className="flex items-center">
                    {
                        field.required &&
                        <span className="pr-1 pt-[7px] text-lg leading-3 text-red-500">*</span>
                    }
                    <input
                        value={label}
                        className="flex-1 w-full text-gray-100 bg-transparent outline-none"
                        onChange={onLabelChange}
                        placeholder="Multiple choice"
                    />
                </div>
            }
            <div
                ref={containerRef}
                className="w-full"
            >
                <Form
                    onValuesChange={onValuesChange}
                    className="flex flex-col items-start gap-2"
                    initialValues={{options: [...field.options || []]}}
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
                                        onClick={() => add({code: nanoid(), label: 'Unlabeled option'})}
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