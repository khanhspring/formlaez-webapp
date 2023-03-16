import copy from 'copy-to-clipboard';
import Switch from "rc-switch";
import { FC, useCallback } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { toast } from "react-toastify";
import confirm from "../../../../components/common/confirm/confirm";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux-hook";
import { ActionContext } from "../../../../models/form";
import { useUpdateField } from '../../hooks/useUpdateField';
import { duplicateField, duplicateSection, removeField, removeSection, selectForm, setCurrentItem } from "../../slice";
import FieldUtil from "../../utils/field-util";

type Props = {
    context: ActionContext;
    onMenuClick: () => void;
    visible?: boolean;
}

const ConfigMenu: FC<Props> = ({ context, onMenuClick, visible }) => {

    const dispatch = useAppDispatch();
    const { values, update } = useUpdateField(context.field as any, context);
    const form = useAppSelector(selectForm);

    const variableName = context.type === 'Group' ? context.section?.variableName : context.field?.variableName;
    const onCopy = useCallback(() => {
        copy(variableName || '');
        onMenuClick?.();
        toast.success("Copied", { autoClose: 1000 });
    }, [onMenuClick, variableName])
    useHotkeys('ctrl+c, meta+c', onCopy, { preventDefault: true, enabled: visible });

    const onCopyPlaceholder = useCallback(() => {
        const isGroup = context.type === 'Group';
        const placeholder = (isGroup ? "#" : "$") + "{" + variableName + "}";
        copy(placeholder || '');
        onMenuClick?.();
        toast.success("Copied", { autoClose: 1000 });
    }, [context.type, onMenuClick, variableName])
    useHotkeys('ctrl+shift+c, meta+shift+c', onCopyPlaceholder, { preventDefault: true, enabled: visible });

    const onCopyParagraphPlaceholder = useCallback(() => {
        let placeholder = "@{" + variableName + "}";
        placeholder += "\nReplace this...\n";
        placeholder += "@{/}";
        copy(placeholder || '');
        onMenuClick?.();
        toast.success("Copied", { autoClose: 1000 });
    }, [onMenuClick, variableName])

    const handleDelete = () => {
        if (disabled) {
            return;
        }
        onMenuClick?.();
        if (context.type === 'Group' || context.type === 'SingleField') {
            dispatch(removeSection({ sectionIndex: context.sectionIndex }));
            return;
        }
        if (context.type === 'GroupField') {
            dispatch(removeField({ sectionIndex: context.sectionIndex, fieldIndex: context.fieldIndex }));
            return;
        }
    }

    const onDelete = () => {
        if (disabled) {
            return;
        }
        confirm({
            title: 'Confirm',
            content: 'Are you sure to delete this?',
            onOk: handleDelete
        });
    }
    useHotkeys('delete, backspace', onDelete, { preventDefault: true, enabled: visible });

    const changeRequire = () => {
        if (disabled) {
            return;
        }
        update({ required: !values.required });
    }

    const changeHideTitle = () => {
        if (disabled) {
            return;
        }
        update({ hideTitle: !values.hideTitle });
    }

    const onEditProperties = () => {
        onMenuClick?.();
        dispatch(setCurrentItem(context));
    }
    useHotkeys('ctrl+e, meta+e', onEditProperties, { preventDefault: true, enabled: visible });

    const onDuplicate = () => {
        if (disabled) {
            return;
        }
        onMenuClick?.();
        if (context.type === 'Group' || context.type === 'SingleField') {
            dispatch(duplicateSection({ sectionIndex: context.sectionIndex }));
            return;
        }
        if (context.type === 'GroupField') {
            dispatch(duplicateField({ sectionIndex: context.sectionIndex, fieldIndex: context.fieldIndex }));
            return;
        }
    }
    useHotkeys('ctrl+d, meta+d', onDuplicate, { preventDefault: true, enabled: visible });

    const changeMultipleSelection = () => {
        update({ multipleSelection: !values.multipleSelection });
    }
    const changeShowTime = () => {
        update({ showTime: !values.showTime });
    }

    const isFormControl = FieldUtil.isFormControl(context.field);

    if (!visible) {
        return <></>
    }

    const disabled = form?.status === 'Archived';

    return (
        <div className="w-[290px] bg-white dark:bg-cinder-700 rounded py-2 px-1 flex flex-col gap-0.5">
            {
                (isFormControl || context.type === 'Group') &&
                <div
                    className={
                        `px-2 py-1 flex justify-between items-center cursor-pointer bg-slate-50 hover:bg-slate-200 dark:bg-transparent dark:hover:bg-cinder-600`
                    }
                    onClick={onCopy}
                >
                    <div className="flex gap-2 text-slate-900 dark:text-white">
                        <i className="fi fi-rr-square-code"></i>
                        <span>Copy variable name</span>
                    </div>
                    <span className="text-xs text-slate-800 dark:text-gray-300">Ctrl+C</span>
                </div>
            }
            {
                (isFormControl || context.type === 'Group') &&
                <div
                    className={
                        `px-2 py-1 flex justify-between items-center cursor-pointer bg-slate-50 hover:bg-slate-200 dark:bg-transparent dark:hover:bg-cinder-600`
                    }
                    onClick={onCopyPlaceholder || context.type === 'Group'}
                >
                    <div className="flex gap-2 text-slate-900 dark:text-white">
                        <i className="fi fi-rr-confetti"></i>
                        <span>Copy {`${context.type === 'Group' ? 'table' : ''}`} placeholder</span>
                    </div>
                    <span className="text-xs text-slate-800 dark:text-gray-300">Ctrl+Shift+C</span>
                </div>
            }
            {
                (context.type === 'Group') &&
                <div
                    className={
                        `px-2 py-1 flex justify-between items-center cursor-pointer bg-slate-50 hover:bg-slate-200 dark:bg-transparent dark:hover:bg-cinder-600`
                    }
                    onClick={onCopyParagraphPlaceholder}
                >
                    <div className="flex gap-2 text-slate-900 dark:text-white">
                        <i className="fi fi-rr-confetti"></i>
                        <span>Copy paragraph placeholder</span>
                    </div>
                </div>
            }
            <div className="py-2">
                <div className="border-b border-slate-900/10 dark:border-b-cinder-600"></div>
            </div>
            {
                (isFormControl || context.type === 'Group') &&
                <div
                    className={
                        `px-2 py-1 flex justify-between items-center cursor-pointer bg-slate-50 hover:bg-slate-200 dark:bg-transparent dark:hover:bg-cinder-600`
                    }
                    onClick={onEditProperties}
                >
                    <div className="flex gap-2 text-slate-900 dark:text-white">
                        <i className="fi fi-rr-settings"></i>
                        <span>Edit properties</span>
                    </div>
                    <span className="text-xs text-slate-800 dark:text-gray-300">Ctrl+E</span>
                </div>
            }
            <div
                className={
                    `px-2 py-1 flex justify-between items-center cursor-pointer bg-slate-50 hover:bg-slate-200 dark:bg-transparent dark:hover:bg-cinder-600`
                    + ` ${disabled ? 'cursor-not-allowed' : ''}`
                }
                onClick={onDuplicate}
            >
                <div className="flex gap-2 text-slate-900 dark:text-white">
                    <i className="fi fi-rr-duplicate"></i>
                    <span>Duplicate</span>
                </div>
                <span className="text-xs text-slate-800 dark:text-gray-300">Ctrl+D</span>
            </div>
            <div
                className={
                    `px-2 py-1 flex justify-between items-center cursor-pointer bg-slate-50 hover:bg-slate-200 dark:bg-transparent dark:hover:bg-cinder-600`
                    + ` ${disabled ? 'cursor-not-allowed' : ''}`
                }
                onClick={onDelete}
            >
                <div className="flex gap-2 text-red-700">
                    <i className="fi fi-rr-trash"></i>
                    <span>Delete</span>
                </div>
                <span className="text-xs text-red-700">Del</span>
            </div>
            {
                isFormControl &&
                <>
                    <div className="py-2">
                        <div className="border-b border-slate-900/10 dark:border-b-cinder-600"></div>
                    </div>

                    <div
                        className={
                            `px-2 py-1 flex justify-between items-center cursor-pointer bg-slate-50 hover:bg-slate-200 dark:bg-transparent dark:hover:bg-cinder-600`
                            + ` ${disabled ? 'cursor-not-allowed' : ''}`
                        }
                        onClick={changeRequire}
                    >
                        <div className="flex gap-2 text-slate-900 dark:text-white">
                            <i className="fi fi-rr-bahai"></i>
                            <span>Required</span>
                        </div>
                        <div className="text-xs">
                            <Switch checked={values.required} disabled={disabled} />
                        </div>
                    </div>
                    <div
                        className={
                            `px-2 py-1 flex justify-between items-center cursor-pointer bg-slate-50 hover:bg-slate-200 dark:bg-transparent dark:hover:bg-cinder-600`
                            + ` ${disabled ? 'cursor-not-allowed' : ''}`
                        }
                        onClick={changeHideTitle}
                    >
                        <div className="flex gap-2 text-slate-900 dark:text-white">
                            <i className="fi fi-rr-letter-case"></i>
                            <span>Hide label</span>
                        </div>
                        <div className="text-xs">
                            <Switch checked={values.hideTitle} disabled={disabled} />
                        </div>
                    </div>
                </>
            }
            {
                context.field?.type === 'MultipleChoice' &&
                <>
                    <div
                        className={
                            `px-2 py-1 flex justify-between items-center cursor-pointer bg-slate-50 hover:bg-slate-200 dark:bg-transparent dark:hover:bg-cinder-600`
                            + ` ${disabled ? 'cursor-not-allowed' : ''}`
                        }
                        onClick={changeMultipleSelection}
                    >
                        <div className="flex gap-2 text-slate-900 dark:text-white">
                            <i className="fi fi-rr-list-check"></i>
                            <span>Multiple selection</span>
                        </div>
                        <div className="text-xs">
                            <Switch checked={values.multipleSelection} disabled={disabled} />
                        </div>
                    </div>
                </>
            }
            {
                context.field?.type === 'Datetime' &&
                <>
                    <div
                        className={
                            `px-2 py-1 flex justify-between items-center cursor-pointer bg-slate-50 hover:bg-slate-200 dark:bg-transparent dark:hover:bg-cinder-600`
                            + ` ${disabled ? 'cursor-not-allowed' : ''}`
                        }
                        onClick={changeShowTime}
                    >
                        <div className="flex gap-2 text-slate-900 dark:text-white">
                            <i className="fi fi-rr-clock"></i>
                            <span>Show time</span>
                        </div>
                        <div className="text-xs">
                            <Switch checked={values.showTime} disabled={disabled} />
                        </div>
                    </div>
                </>
            }
        </div>
    );
}

export default ConfigMenu;