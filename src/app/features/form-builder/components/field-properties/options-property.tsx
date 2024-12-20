import { nanoid } from "nanoid";
import Form from "rc-field-form";
import { FC } from "react";
import SimpleBar from "simplebar-react";
import Textarea from "../../../../components/form/form-controls/textarea";
import FormItem from "../../../../components/form/form-item";
import FormItemLabel from "../../../../components/form/form-item-label";
import { ActionContext, FormField, FormFieldType } from "../../../../models/form";
import { useUpdateField } from "../../hooks/useUpdateField";

type Props = {
    field: FormField;
    context: ActionContext;
    disabled?: boolean;
}

const SupportedTypes: FormFieldType[] = ["Dropdown"]

const OptionsProperty: FC<Props> = ({ field, context, disabled }) => {

    const { values, updateDebounce } = useUpdateField(field, context);

    if (!SupportedTypes.includes(field.type)) {
        return <></>
    }

    const onValuesChange = (changed: any, formValues: any) => {
        updateDebounce({ options: formValues.options });
    }

    return (
        <div className="w-full">
            <FormItemLabel content={`Options (${values.options?.length})`} />
            <div>
                <Form
                    onValuesChange={onValuesChange}
                    className="w-full mt-2"
                    initialValues={{ options: [...values.options || []] }}
                >
                    <Form.List
                        name="options"
                    >
                        {(fields, { add, remove }) => {
                            return (
                                <>
                                    <SimpleBar
                                        style={{ maxHeight: '300px' }}
                                        autoHide={false}
                                        className="border border-slate-600 p-3"
                                    >
                                        <div className="w-full flex flex-col items-start gap-2 pr-5">
                                            {fields.map((field, index) => (
                                                <div key={index} className="w-full relative flex items-center gap-2 group/option-item">
                                                    <span className="text-xs w-5 h-5 flex items-center justify-center rounded-full border border-slate-600 bg-slate-600/50">
                                                        {index + 1}
                                                    </span>
                                                    <FormItem {...field} name={[field.name, 'label']} hideError>
                                                        <Textarea
                                                            placeholder="Unlabeled option"
                                                            autoHeight
                                                            className="!py-1 !px-2 w-full"
                                                            disabled={disabled}
                                                        />
                                                    </FormItem>
                                                    {
                                                        fields.length > 1 && !disabled &&
                                                        <button
                                                            aria-label="Remove"
                                                            onClick={() => remove(index)}
                                                            className="absolute w-6 h-6 -right-3 top-[50%] translate-y-[-50%] rounded-full border border-slate-600 bg-slate-600/50 items-center justify-center hover:border-rose-700 hover:bg-rose-700/30 transition hidden group-hover/option-item:flex"
                                                        >
                                                            <i className="fi fi-rr-cross-small"></i>
                                                        </button>
                                                    }
                                                </div>
                                            ))}
                                        </div>
                                    </SimpleBar>

                                    {
                                        !disabled &&
                                        <button
                                            aria-label="Add"
                                            onClick={() => add({ code: nanoid(), label: 'Unlabeled option' })}
                                            className="w-6 h-6 rounded-full border border-slate-600 bg-slate-600/50 items-center justify-center transition flex mt-2"
                                        >
                                            <i className="fi fi-rr-plus-small"></i>
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

export default OptionsProperty;