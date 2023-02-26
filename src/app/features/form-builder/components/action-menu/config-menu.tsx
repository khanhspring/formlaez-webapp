import copy from 'copy-to-clipboard';
import Switch from "rc-switch";
import { FC, useCallback } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { toast } from "react-toastify";
import confirm from "../../../../components/common/confirm/confirm";
import { useAppDispatch } from "../../../../hooks/redux-hook";
import { ActionContext } from "../../../../models/form";
import { useUpdateField } from '../../hooks/useUpdateField';
import { duplicateField, duplicateSection, removeField, removeSection, setCurrentItem } from "../../slice";
import FieldUtil from "../../utils/field-util";

type Props = {
    context: ActionContext;
    onMenuClick: () => void;
    visible?: boolean;
}

const ConfigMenu: FC<Props> = ({ context, onMenuClick, visible }) => {

    const dispatch = useAppDispatch();
    const { values, update } = useUpdateField(context.field as any, context);

    const variableName = context.type === 'Group' ? context.section?.variableName : context.field?.variableName;
    const onCopy = useCallback(() => {
        copy(variableName || '');
        onMenuClick?.();
        toast.success("Copied", { autoClose: 1000 });
    }, [onMenuClick, variableName])
    useHotkeys('ctrl+c, meta+c', onCopy, { preventDefault: true, enabled: visible });

    const handleDelete = () => {
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
        confirm({
            title: 'Confirm',
            content: 'Are you sure to delete this?',
            onOk: handleDelete
        });
    }
    useHotkeys('delete, backspace', onDelete, { preventDefault: true, enabled: visible });

    const changeRequire = () => {
        update({ required: !values.required });
    }

    const changeHideTitle = () => {
        update({ hideTitle: !values.hideTitle });
    }

    const onEditProperties = () => {
        onMenuClick?.();
        dispatch(setCurrentItem(context));
    }
    useHotkeys('ctrl+e, meta+e', onEditProperties, { preventDefault: true, enabled: visible });

    const onDuplicate = () => {
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

    return (
        <div className="w-[250px] bg-cinder-700 rounded py-2 px-1 flex flex-col gap-0.5">
            {
                (isFormControl || context.type === 'Group') &&
                <div
                    className="px-2 py-1 flex justify-between items-center cursor-pointer hover:bg-cinder-600"
                    onClick={onCopy}
                >
                    <div className="flex gap-2">
                        <i className="fi fi-rr-square-code"></i>
                        <span>Copy code</span>
                    </div>
                    <span className="text-xs text-gray-300">Ctrl+C</span>
                </div>
            }
            {
                (isFormControl || context.type === 'Group') &&
                <div
                    className="px-2 py-1 flex justify-between items-center cursor-pointer hover:bg-cinder-600"
                    onClick={onEditProperties}
                >
                    <div className="flex gap-2">
                        <i className="fi fi-rr-settings"></i>
                        <span>Edit properties</span>
                    </div>
                    <span className="text-xs text-gray-300">Ctrl+E</span>
                </div>
            }
            <div
                className="px-2 py-1 flex justify-between items-center cursor-pointer hover:bg-cinder-600"
                onClick={onDuplicate}
            >
                <div className="flex gap-2">
                    <i className="fi fi-rr-duplicate"></i>
                    <span>Duplicate</span>
                </div>
                <span className="text-xs text-gray-300">Ctrl+D</span>
            </div>
            <div
                className="px-2 py-1 flex justify-between items-center cursor-pointer hover:bg-cinder-600"
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
                        <div className="border-b border-b-cinder-600"></div>
                    </div>

                    <div
                        className="px-2 py-1 flex justify-between items-center cursor-pointer hover:bg-cinder-600"
                        onClick={changeRequire}
                    >
                        <div className="flex gap-2">
                            <i className="fi fi-rr-bahai"></i>
                            <span>Required</span>
                        </div>
                        <div className="text-xs">
                            <Switch checked={values.required} />
                        </div>
                    </div>
                    <div
                        className="px-2 py-1 flex justify-between items-center cursor-pointer hover:bg-cinder-600"
                        onClick={changeHideTitle}
                    >
                        <div className="flex gap-2">
                            <i className="fi fi-rr-letter-case"></i>
                            <span>Hide label</span>
                        </div>
                        <div className="text-xs">
                            <Switch checked={values.hideTitle} />
                        </div>
                    </div>
                </>
            }
            {
                context.field?.type === 'MultipleChoice' &&
                <>
                    <div
                        className="px-2 py-1 flex justify-between items-center cursor-pointer hover:bg-cinder-600"
                        onClick={changeMultipleSelection}
                    >
                        <div className="flex gap-2">
                            <i className="fi fi-rr-list-check"></i>
                            <span>Multiple selection</span>
                        </div>
                        <div className="text-xs">
                            <Switch checked={values.multipleSelection} />
                        </div>
                    </div>
                </>
            }
            {
                context.field?.type === 'Datetime' &&
                <>
                    <div
                        className="px-2 py-1 flex justify-between items-center cursor-pointer hover:bg-cinder-600"
                        onClick={changeShowTime}
                    >
                        <div className="flex gap-2">
                            <i className="fi fi-rr-clock"></i>
                            <span>Show time</span>
                        </div>
                        <div className="text-xs">
                            <Switch checked={values.showTime} />
                        </div>
                    </div>
                </>
            }
        </div>
    );
}

export default ConfigMenu;