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
import QrCodeField from "./qr-code-field";
import RatingField from "./rating-field";
import SignatureField from "./signature-field";
import SwitchField from "./switch-field";
import TextField from "./text-field";
import TwitterTweetField from "./twitter-tweet-field";
import VideoField from "./video-field";
import { useAppSelector } from "../../../../hooks/redux-hook";
import { selectSelectedItems } from "../../slice";
import UrlField from "./url-field";
import InputMarkdownField from "./input-markdown-field";
import StatusListField from "./status-list-field";

type Props = {
    type: FormFieldType;
    sectionIndex: number;
    index: number;
    section: FormSection;
    field: FormField;
}

const FieldItem: FC<Props> = ({ type, sectionIndex, index, section, field, ...dragHandleProps }) => {

    const [isHover, setIsHover] = useState(false);
    const selectedItems = useAppSelector(selectSelectedItems);

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
            case 'Text': return <TextField field={field} context={actionContext} />;
            case 'Image': return <ImageField field={field} context={actionContext} />;
            case 'Video': return <VideoField field={field} context={actionContext} />;
            case 'Pdf': return <PdfField field={field} context={actionContext} />;
            case 'Line': return <LineField />;
            case 'QRCode': return <QrCodeField field={field} context={actionContext} />;
            case 'TwitterTweet': return <TwitterTweetField field={field} context={actionContext} />;

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
            case 'MultipleChoice': return <MultipleChoiceField field={field} context={actionContext} />;
            case 'Signature': return <SignatureField field={field} context={actionContext} />;
            case 'InputUrl': return <UrlField field={field} context={actionContext} />;
            case 'InputMarkdown': return <InputMarkdownField field={field} context={actionContext} />;
            case 'StatusList': return <StatusListField field={field} context={actionContext} />;
        }
    }

    const isSelected = () => {
        return !!selectedItems?.some(item => item.sectionCode === section.code);
    }

    return (
        <div
            className="py-[1px] selectable"
            selection-data-code={section.code}
            selection-data-index={sectionIndex}
        >
            <div
                className={
                    "w-full py-1.5 flex items-start gap-1 relative px-1"
                    + ` ${isSelected() ? 'bg-slate-100 dark:bg-steel-gray-900/60' : ''}`
                }
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
        </div>
    );
}

export default FieldItem;