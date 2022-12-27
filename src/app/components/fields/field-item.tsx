import { FC } from "react";
import DragIcon from "../icons/drag-icon";
import ImageField from "./image-field";
import InputNumberField from "./input-number-field";
import InputTextField from "./input-text-field";
import LineField from "./line-field";
import PdfField from "./pdf-field";
import TextField from "./text-field";
import VideoField from "./video-field";

type Props = {
    type: 'text' | 'input-text' | 'image' | 'video' | 'pdf' | 'line' | 'input-number';
    nested?: boolean;
}

const FieldItem: FC<Props> = ({ type, nested = false }) => {

    const renderField = () => {
        switch (type) {
            case 'input-text': return <InputTextField />;
            case 'text': return <TextField />;
            case 'image': return <ImageField />;
            case 'video': return <VideoField />;
            case 'pdf': return <PdfField />;
            case 'line': return <LineField />;
            case 'input-number': return <InputNumberField />;
        }
    }

    return (
        <div className={`w-full py-1.5 flex items-start gap-1 relative group/field-item`}>
            <div className="absolute top-0 right-full h-full w-10 flex items-start justify-end pt-2 pr-[2px]">
                <div className="flex flex-col gap-1 items-center invisible group-hover/field-item:visible justify-end">
                    <span className="w-4 h-6 flex items-center justify-center rounded cursor-pointer dark:hover:bg-cinder-700 transition group">
                        <DragIcon className="w-3.5 fill-gray-500 group-hover:fill-gray-300" />
                    </span>
                    <span className="w-4 h-6 flex items-center justify-center rounded cursor-pointer dark:hover:bg-cinder-700 transition group">
                        <i className="fi fi-rr-plus text-gray-500 group-hover:text-gray-300 text-xs"></i>
                    </span>
                </div>
            </div>
            <div className="w-full">
                {renderField()}
            </div>
        </div>
    );
}

export default FieldItem;