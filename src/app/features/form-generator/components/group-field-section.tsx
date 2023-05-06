import RcForm from "rc-field-form";
import Tooltip from "rc-tooltip";
import { FC } from "react";
import confirm from "../../../components/common/confirm/confirm";
import { FormSection } from "../../../models/form";
import FieldItem from "./field-item";

type Props = {
    section: FormSection;
    sectionIndex: number;
}

const GroupFieldSection: FC<Props> = ({ section }) => {
    if (!section.fields || section.fields.length === 0) {
        return <></>
    }

    const onRemove = (remove: (index: number) => void, index: number) => {
        confirm({
            title: 'Confirm',
            content: 'Are you sure you want to delete this?',
            onOk: () => remove(index)
        })
    }

    return (
        <RcForm.List
            name={section.code}
            initialValue={[{}]}
        >
            {(fields, { add, remove }) => {
                return (
                    <>
                        <div className="flex flex-col gap-3">
                            {fields.map((field, index) => (
                                <div
                                    key={index}
                                    className="border border-slate-900/10 dark:border-gray-700 rounded"
                                >
                                    <div className="bg-slate-200 dark:bg-steel-gray-900 px-3 min-h-[40px] text-base flex justify-between items-center rounded-tl rounded-tr">
                                        <div className="flex gap-2 items-center">
                                            <span>{section.title || 'Untitled group'}</span>
                                            <span className="inline-block h-5 min-w-[20px] leading-5 rounded-[10px] bg-slate-300 dark:bg-slate-900 text-center">{index + 1}</span>
                                        </div>
                                        {
                                            fields.length > 1 &&
                                            <Tooltip overlay="Delete">
                                                <span
                                                    onClick={() => onRemove(remove, index)}
                                                    className="flex items-center justify-center h-6 min-w-[24px] rounded-[10px] hover:bg-slate-300 dark:hover:bg-slate-900 hover:text-red-700 text-center cursor-pointer"
                                                >
                                                    <i className="fi fi-rr-trash"></i>
                                                </span>
                                            </Tooltip>
                                        }
                                    </div>
                                    <div className="p-3 px-4">
                                        {
                                            section.fields?.map((item, index) => (
                                                <FieldItem
                                                    field={item}
                                                    fieldIndex={index}
                                                    key={index}
                                                    name={[field.name, item.code]}
                                                />
                                            ))
                                        }
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-3 flex pb-5 justify-center">
                            <button
                                onClick={() => add({})}
                                className="px-2.5 py-1.5 min-w-[100px] rounded-2xl text-base transition bg-blue-700 hover:bg-blue-600 text-white flex items-center justify-center gap-2"
                                type="button"
                            >
                                <span>Add</span>
                                <i className="fi fi-rr-plus"></i>
                            </button>
                        </div>
                    </>
                )
            }}
        </RcForm.List>
    );
}

export default GroupFieldSection;