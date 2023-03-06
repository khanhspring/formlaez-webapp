import Popup from "ez-rc-popup/dist/esm/components/Popup";
import Tooltip from "rc-tooltip";
import { FC, useState, useRef } from "react";
import DragIcon from "../../../components/icons/drag-icon";
import { ActionContext } from "../../../models/form";
import AddNewMenu from "./action-menu/add-new-menu";
import ConfigMenu from "./action-menu/config-menu";

type Props = {
    invisible?: boolean;
    context: ActionContext;
}

const ConfigAction: FC<Props> = ({ invisible = false, context, ...dragHandleProps }) => {

    const [addNewMenuVisible, setAddNewMenuVisible] = useState(false);
    const [configMenuVisible, setConfigMenuVisible] = useState(false);

    const dragMenuRef = useRef<HTMLSpanElement>(null);
    const addMenuRef = useRef<HTMLSpanElement>(null);

    const configMenuTooltip = (
        <>
            <p className="text-xs whitespace-nowrap"><strong>Drag</strong> to move</p>
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
                                    className="w-4 h-5 flex items-center justify-center rounded-sm cursor-pointer dark:hover:bg-cinder-700 transition group"
                                    ref={dragMenuRef}
                                    {...dragHandleProps}
                                >
                                    <DragIcon className="w-3.5 fill-gray-500 group-hover:fill-gray-300" />
                                </span>
                            </Tooltip>
                        </span>
                    </Popup>
                    <Popup trigger="click" content={addMenu} placement="left" open={addNewMenuVisible} onOpenChange={setAddNewMenuVisible} className="bg-transparent">
                        <span>
                            <Tooltip overlay={addNewMenuTooltip} mouseLeaveDelay={0} mouseEnterDelay={0.4}>
                                <span
                                    ref={addMenuRef}
                                    className="w-4 h-5 flex items-center justify-center rounded-sm cursor-pointer dark:hover:bg-cinder-700 transition group"
                                >
                                    <i className="fi fi-rr-plus text-gray-500 group-hover:text-gray-500 text-xs"></i>
                                </span>
                            </Tooltip>
                        </span>
                    </Popup>
                </div>
            }
        </div>
    );
}

export default ConfigAction;