import Popup from "ez-rc-popup/dist/esm/components/Popup";
import { Tooltip } from "ez-rc-tooltip";
import { FC, useState } from "react";
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

    const configMenuTooltip = (
        <>
            <p className="text-xs"><strong>Drag</strong> to move</p>
            <p className="text-xs"><strong>Click</strong> to open menu</p>
        </>
    )

    const addNewMenuTooltip = (
        <p className="text-xs"><strong>Click</strong> to add</p>
    )

    const menu = (
        <ConfigMenu onMenuClick={() => setConfigMenuVisible(false)} context={context} />
    )

    return (
        <div className="absolute top-0 right-full h-full w-5 flex items-center justify-end pr-[3px]">
            {
                (!invisible || addNewMenuVisible || configMenuVisible) &&
                <div className="flex flex-col items-center justify-end">
                    <Popup trigger="click" content={menu} placement="left" open={configMenuVisible} onOpenChange={setConfigMenuVisible} className="bg-transparent">
                        <Tooltip content={configMenuTooltip} clickToClose>
                            <span
                                className="w-4 h-5 flex items-center justify-center rounded-sm cursor-pointer dark:hover:bg-cinder-700 transition group"
                                {...dragHandleProps}
                            >
                                <DragIcon className="w-3.5 fill-gray-500 group-hover:fill-gray-300" />
                            </span>
                        </Tooltip>
                    </Popup>
                    <Popup trigger="click" content={<AddNewMenu onMenuClick={() => setAddNewMenuVisible(false)} context={context} />} placement="left" open={addNewMenuVisible} onOpenChange={setAddNewMenuVisible} className="bg-transparent">
                        <Tooltip content={addNewMenuTooltip} clickToClose>
                            <span className="w-4 h-5 flex items-center justify-center rounded-sm cursor-pointer dark:hover:bg-cinder-700 transition group">
                                <i className="fi fi-rr-plus text-gray-500 group-hover:text-gray-500 text-xs"></i>
                            </span>
                        </Tooltip>
                    </Popup>
                </div>
            }
        </div>
    );
}

export default ConfigAction;