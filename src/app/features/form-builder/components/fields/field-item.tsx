import { FC, useState } from "react";
import { ActionContext, FormField, FormFieldType, FormSection } from "../../../../models/form";
import ConfigAction from "../config-action";
import DatetimePickerField from "./datetime-picker-field";
import DropdownField from "./dropdown-field";
import EmailField from "./email-field";
import ImageField from "./image-field";
import InputNumberField from "./input-number-field";
import InputTextField from "./input-text-field";
import LineField from "./line-field";
import LongTextField from "./long-text-field";
import MultipleChoiceField from "./multiple-choice-field";
import OpinionScaleField from "./opinion-scale-field";
import PdfField from "./pdf-field";
import PictureChoiceField from "./picture-choice-field";
import RatingField from "./rating-field";
import SwitchField from "./switch-field";
import TextField from "./text-field";
import VideoField from "./video-field";

type Props = {
    type: FormFieldType;
    sectionIndex: number;
    index: number;
    section: FormSection;
    field: FormField;
}

const FieldItem: FC<Props> = ({ type, sectionIndex, index, section, field, ...dragHandleProps }) => {

    const [isHover, setIsHover] = useState(false);

    const actionType = (section.type === 'Group' || section.type === 'Table') ? 'GroupField' : 'SingleField';
    const actionContext: ActionContext = {
        type: actionType,
        sectionIndex: sectionIndex,
        fieldIndex: index,
        field: field,
        section: section
    }

    const renderField = () => {
        switch (type) {
            case 'Text': return <TextField field={field} context={actionContext}/>;
            case 'Image': return <ImageField field={field} context={actionContext} />;
            case 'Video': return <VideoField field={field} context={actionContext} />;
            case 'Pdf': return <PdfField field={field} context={actionContext} />;
            case 'Line': return <LineField />;

            // form controls
            case 'InputText': return <InputTextField field={field} context={actionContext} />;
            case 'InputNumber': return <InputNumberField field={field} context={actionContext} />;
            case 'Datetime': return <DatetimePickerField field={field} context={actionContext} />;
            case 'LongText': return <LongTextField field={field} context={actionContext} />;
            case 'Email': return <EmailField field={field} context={actionContext} />;
            case 'Rating': return <RatingField field={field} context={actionContext} />;
            case 'OpinionScale': return <OpinionScaleField field={field} context={actionContext} />;
            case 'Switch': return <SwitchField field={field} context={actionContext} />;
            case 'Dropdown': return <DropdownField field={field} context={actionContext} />;
            case 'PictureChoice': return <PictureChoiceField field={field} context={actionContext} />;
            case 'MultipleChoice': return <MultipleChoiceField field={field} context={actionContext} />;
        }
    }

    return (
        <div
            className="w-full py-1.5 flex items-start gap-1 relative"
            onMouseOver={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <ConfigAction
                {...dragHandleProps}
                invisible={!isHover}
                context={actionContext}
            />
            <div className="w-full">
                {renderField()}
            </div>
        </div>
    );
}

export default FieldItem;