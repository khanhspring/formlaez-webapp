import { FC } from "react";
import DragIcon from "../icons/drag-icon";
import FieldItem from "./field-item";

type Props = {
}

const FieldGroup: FC<Props> = () => {

    return (
        <div className="flex flex-col relative rounded border border-gray-700 group/field-group mt-2 mb-2">
            <div className="absolute top-0 right-full h-full w-10 flex items-start justify-end pr-[2px]">
                <div className="flex flex-col gap-1 items-center invisible group-hover/field-group:visible justify-end">
                    <span className="w-4 h-6 flex items-center justify-center rounded cursor-pointer dark:hover:bg-cinder-700 transition group">
                        <DragIcon className="w-3.5 fill-gray-500 group-hover:fill-gray-300" />
                    </span>
                    <span className="w-4 h-6 flex items-center justify-center rounded cursor-pointer dark:hover:bg-cinder-700 transition group">
                        <i className="fi fi-rr-plus text-gray-500 group-hover:text-gray-300 text-xs"></i>
                    </span>
                </div>
            </div>
            <div className="bg-cinder-700 px-3 py-2 rounded-t">
                <span className="font-sm">
                    Group field
                </span>
            </div>
            <div className="flex flex-col px-5 py-2">
                <FieldItem type="input-text" nested />
                <FieldItem type="input-text" nested />
                <FieldItem type="input-text" nested />
                <FieldItem type="input-text" nested />
            </div>
        </div>
    );
}

export default FieldGroup;