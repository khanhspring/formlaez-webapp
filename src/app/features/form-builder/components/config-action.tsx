import Popup from "ez-rc-popup/dist/esm/components/Popup";
import Tooltip from "rc-tooltip";
import { FC, useState, useRef } from "react";
import DragIcon from "../../../components/icons/drag-icon";
import { useAppSelector } from "../../../hooks/redux-hook";
import { ActionContext } from "../../../models/form";
import { selectForm } from "../slice";
import AddNewMenu from "./action-menu/add-new-menu";
import ConfigMenu from "./action-menu/config-menu";

type Props = {
    invisible?: boolean;
    context: ActionContext;
}

const ConfigAction: FC<Props> = ({ invisible = false, context, ...dragHandleProps }) => {

    const form = useAppSelector(selectForm);

    const [addNewMenuVisible, setAddNewMenuVisible] = useState(false);
    const [configMenuVisible, setConfigMenuVisible] = useState(false);

    const dragMenuRef = useRef<HTMLSpanElement>(null);
    const addMenuRef = useRef<HTMLSpanElement>(null);

    const configMenuTooltip = (
        <>
            {
                form?.status !== 'Archived' &&
                <p className="text-xs whitespace-nowrap"><strong>Drag</strong> to move</p>
            }
            <p className="text-xs whitespace-nowrap"><strong>Click</strong> to open menu</p>
        </>
    )

    const addNewMenuTooltip = (
        <p className="text-xs whitespace-nowrap"><strong>Click</strong> to add</p>
    )

    const menu = (
        <ConfigMenu onMenuClick={() => setConfigMenuVisible(false)} context={context} visible={configMenuVisible} />
    )

    const addMenu = (
        <AddNewMenu onMenuClick={() => setAddNewMenuVisible(false)} context={context} visible={addNewMenuVisible} />
    )

    return (
        <div className="absolute top-0 right-full h-full w-5 flex items-center justify-end pr-[3px]">
            {
                (!invisible || addNewMenuVisible || configMenuVisible) &&
                <div className="flex flex-col items-center justify-end">
                    <Popup trigger="click" content={menu} placement="left" open={configMenuVisible} onOpenChange={setConfigMenuVisible} className="bg-transparent">
                        <span>
                            <Tooltip overlay={configMenuTooltip} mouseLeaveDelay={0} mouseEnterDelay={0.4}>
                                <span
                                    className="w-5 h-6 flex items-center justify-center rounded-sm cursor-pointer hover:bg-slate-300 dark:hover:bg-cinder-700 transition group"
                                    ref={dragMenuRef}
                                    {...dragHandleProps}
                                >
                                    <DragIcon className="w-4 fill-slate-900 dark:fill-gray-300" />
                                </span>
                            </Tooltip>
                        </span>
                    </Popup>
                    {
                        form?.status !== 'Archived' &&
                        <Popup trigger="click" content={addMenu} placement="left" open={addNewMenuVisible} onOpenChange={setAddNewMenuVisible} className="bg-transparent">
                            <span>
                                <Tooltip overlay={addNewMenuTooltip} mouseLeaveDelay={0} mouseEnterDelay={0.4}>
                                    <span
                                        ref={addMenuRef}
                                        className="w-5 h-6 flex items-center justify-center rounded-sm cursor-pointer hover:bg-slate-300 dark:hover:bg-cinder-700 transition group"
                                    >
                                        <i className="fi fi-rr-plus text-slate-900 dark:text-gray-300 text-sm"></i>
                                    </span>
                                </Tooltip>
                            </span>
                        </Popup>
                    }
                </div>
            }
        </div>
    );
}

export default ConfigAction;