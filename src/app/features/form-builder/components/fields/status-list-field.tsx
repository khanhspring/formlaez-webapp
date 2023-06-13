import _ from "lodash";
import { nanoid } from "nanoid";
import Dropdown from "rc-dropdown";
import Form from "rc-field-form";
import { FC, useEffect, useRef, useState } from "react";
import { CirclePicker } from 'react-color';
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

const StatusListField: FC<Props> = ({ field, context }) => {

    const { values: { title }, updateDebounce: updateTitle } = useUpdateField(field, context);
    const { values: { multipleSelection } } = useUpdateField(field, context);
    const { values: { options }, updateDebounce: updateOptions } = useUpdateField(field, context);
    const form = useAppSelector(selectForm);
    const [colors, setColors] = useState<{ [key: string]: string }>({});

    const containerRef = useRef<HTMLDivElement>(null);

    const onValuesChange = (changed: any, formValues: any) => {
        const options = [...formValues.options] || [];
        if (options.length > 0) {
            options.forEach(o => {
                o.label = o.label || 'Unlabeled status';
                o.bgColor = colors[o.code];
            })
        }
        updateOptions({ options: options });
    }

    useEffect(() => {
        if (options) {
            const colors: { [key: string]: string } = {};
            options.forEach(o => {
                colors[o.code || ''] = o.bgColor || '#697689';
            });
            setColors(colors);
        }
    }, [options]);

    const onColorChange = (optionCode: string, color: string) => {
        if (!options) {
            return;
        }
        const colorsTmp = { ...colors };
        colorsTmp[optionCode] = color;
        setColors(colorsTmp);

        const optionsTmp = _.cloneDeep(options) || [];
        if (optionsTmp.length > 0) {
            optionsTmp.forEach(o => {
                if (o.code === optionCode) {
                    o.bgColor = colorsTmp[optionCode] || '#697689';
                }
            });
            updateOptions({ options: optionsTmp });
        }
    }

    return (
        <div className="flex flex-col gap-1.5 mb-2">
            {
                !(field.hideTitle === true) &&
                <div className="flex items-center">
                    <RequiredMark visible={field.required} />
                    <input
                        value={title}
                        className="flex-1 w-full text-slate-900 dark:text-gray-100 bg-transparent outline-none"
                        onChange={(e) => updateTitle({ title: e.target.value })}
                        placeholder="List of status"
                        disabled={form?.status === 'Archived'}
                    />
                </div>
            }
            {
                multipleSelection &&
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
                    initialValues={{ options: [...options || []] }}
                >
                    <Form.List
                        name="options"
                    >
                        {(fields, { add, remove }) => {
                            return (
                                <>
                                    {fields.map((field, index) => {
                                        return (
                                            <div key={index} className="relative flex justify-center group/option-item">
                                                <FormItem {...field} name={[field.name, 'label']} hideError>
                                                    <Textarea
                                                        placeholder="Unlabeled status"
                                                        container={containerRef}
                                                        autoSize
                                                        className="!py-1 !px-2 border-none text-white"
                                                        disabled={form?.status === 'Archived'}
                                                        style={options?.[index].bgColor ? { backgroundColor: options?.[index].bgColor } : { backgroundColor: '#697689' }}
                                                    />
                                                </FormItem>
                                                <div className="absolute left-full -ml-3 top-[50%] translate-y-[-50%] items-center justify-center gap-1 hidden group-hover/option-item:flex">
                                                    {
                                                        form?.status !== 'Archived' &&
                                                        <Dropdown overlay={<div className="bg-white dark:bg-steel-gray-900 p-3 rounded shadow">
                                                            <CirclePicker color={colors[options?.[index].code || '']} onChangeComplete={(v) => onColorChange(options?.[index].code || '', v.hex)} />
                                                        </div>}
                                                            trigger={['click']}
                                                        >
                                                            <div
                                                                className="w-6 h-6 rounded-full cursor-pointer border border-white"
                                                                style={options?.[index].bgColor ? { backgroundColor: options?.[index].bgColor } : { backgroundColor: '#697689' }}
                                                            >
                                                            </div>
                                                        </Dropdown>
                                                    }
                                                    {
                                                        fields.length > 1 && form?.status !== 'Archived' &&
                                                        <button
                                                            aria-label="Remove"
                                                            onClick={() => remove(index)}
                                                            className="flex items-center justify-center w-6 h-6 rounded-full border border-slate-900/10 bg-slate-100 dark:border-slate-600 dark:bg-slate-600/50 hover:border-rose-700 dark:hover:bg-rose-700/30 dark:hover:border-rose-700 hover:bg-rose-700/30 transition"
                                                        >
                                                            <i className="fi fi-rr-cross-small text-lg"></i>
                                                        </button>
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })}

                                    {
                                        form?.status !== 'Archived' &&
                                        <button
                                            aria-label="Add"
                                            onClick={() => add({ code: nanoid(), label: 'Unlabeled status' })}
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

export default StatusListField;