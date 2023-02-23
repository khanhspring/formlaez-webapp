import { FC } from "react";
import { useAppDispatch } from "../../../../hooks/redux-hook";
import { ActionContext } from "../../../../models/form";
import { removeField, removeSection, setCurrentItem } from "../../slice";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from "react-toastify";
import * as _ from 'lodash';
import confirm from "../../../../components/common/confirm/confirm";
import Switch from "rc-switch";
import { useUpdateBasicInfo } from "../../hooks/useUpdateBasicInfo";
import FieldUtil from "../../utils/field-util";

type Props = {
    context: ActionContext;
    onMenuClick: () => void;
}

const ConfigMenu: FC<Props> = ({ context, onMenuClick }) => {

    const dispatch = useAppDispatch();
    const { required, hideTitle, onRequiredChange, onHideTitleChange } = useUpdateBasicInfo(context?.field, context);

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

    const onCopy = () => {
        onMenuClick?.();
        toast.success("Copied", { autoClose: 1000 });
    }

    const changeRequire = () => {
        onRequiredChange?.(!required);
    }

    const changeHideTitle = () => {
        onHideTitleChange?.(!hideTitle);
    }

    const onEditProperties = () => {
        onMenuClick?.();
        dispatch(setCurrentItem(context));
    }

    const variableName = context.type === 'Group' ? context.section?.variableName : context.field?.variableName;
    const isFormControl = FieldUtil.isFormControl(context.field);

    return (
        <div className="w-[250px] bg-cinder-700 rounded py-2 px-1 flex flex-col gap-0.5">
            {
                (isFormControl || context.type === 'Group') &&
                <CopyToClipboard text={variableName || ''} onCopy={onCopy}>
                    <div className="px-2 py-1 flex justify-between items-center cursor-pointer hover:bg-cinder-600">
                        <div className="flex gap-2">
                            <i className="fi fi-rr-square-code"></i>
                            <span>Copy code</span>
                        </div>
                        <span className="text-xs text-gray-300">Ctrl+C</span>
                    </div>
                </CopyToClipboard>
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
            <div className="px-2 py-1 flex justify-between items-center cursor-pointer hover:bg-cinder-600">
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
                            <Switch checked={required} />
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
                            <Switch checked={hideTitle} />
                        </div>
                    </div>
                </>
            }
        </div>
    );
}

export default ConfigMenu;