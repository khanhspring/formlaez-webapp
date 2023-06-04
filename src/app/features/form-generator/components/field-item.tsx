import { NamePath, Rule } from "rc-field-form/lib/interface";
import { FC, useMemo } from "react";
import DatetimePicker from "../../../components/form/form-controls/datetime-picker";
import Dropdown from "../../../components/form/form-controls/dropdown";
import Input from "../../../components/form/form-controls/input";
import InputNumber from "../../../components/form/form-controls/input-number";
import MultipleChoice from "../../../components/form/form-controls/multiple-choice";
import OpinionScale from "../../../components/form/form-controls/opinion-scale";
import Rating from "../../../components/form/form-controls/rating";
import SignaturePad from "../../../components/form/form-controls/signature-pad";
import Switch from "../../../components/form/form-controls/switch";
import Textarea from "../../../components/form/form-controls/textarea";
import FormItem from "../../../components/form/form-item";
import { FormField } from "../../../models/form";
import FieldUtil from "../../form-builder/utils/field-util";
import BreakLine from "./content-blocks/break-line";
import HtmlBlock from "./content-blocks/html-block";
import ImageBlock from "./content-blocks/image-block";
import PdfBlock from "./content-blocks/pdf-block";
import QRCodeBlock from "./content-blocks/qr-code-block";
import TwitterTweetBlock from "./content-blocks/twitter-tweet-block";
import VideoBlock from "./content-blocks/video-block";
import MarkdownEditor from "../../../components/form/form-controls/markdown-editor";
import StatusChoice from "../../../components/form/form-controls/status-choice";
import { GlobeEuropeAfricaIcon } from "@heroicons/react/24/solid";

type Props = {
    field: FormField;
    fieldIndex: number;
    name: NamePath;
}

const FieldItem: FC<Props> = ({ field, name }) => {

    const buildRules = useMemo(() => {
        const rules: Rule[] = [];
        if (field.required) {
            rules.push({ required: true, message: 'This field is required' })
        }
        if (field.type === 'Email') {
            rules.push({ type: 'email', message: 'Email is invalid' });
            if (field.acceptedDomains) {
                const acceptedDomains = field.acceptedDomains.split(",");
                const domainsRegex = acceptedDomains.map(item => item.trim())
                    .map(item => item.replace(".", "\\."))
                    .join("|");

                rules.push({ pattern: new RegExp(`^(.+)(${domainsRegex})$`), message: `Accepted domains: ${field.acceptedDomains}` });
            }
        }
        if (field.minLength) {
            rules.push({ min: field.minLength, message: `The minimum number of characters is ${field.minLength}` })
        }
        if (field.maxLength) {
            rules.push({ max: field.maxLength, message: `The maximum number of characters is ${field.minLength}` })
        }
        if (field.type === 'InputNumber') {
            rules.push({ type: 'number', message: `The value must be a number` })
        }
        if (field.type === 'InputNumber' && field.min) {
            rules.push({ type: 'number', min: field.min, message: `The value must be equals or greater than ${field.min}` })
        }
        if (field.type === 'InputNumber' && field.max) {
            rules.push({ type: 'number', max: field.max, message: `The value must be equals or less than ${field.max}` })
        }
        if (field.type === 'InputUrl') {
            rules.push({ type: 'url', message: 'URL is invalid' });
        }

        return rules;
    }, [field.acceptedDomains, field.max, field.maxLength, field.min, field.minLength, field.required, field.type])

    const renderField = () => {
        const options = field.options?.map(item => ({ ...item, value: item.code, label: item.label }));

        switch (field.type) {
            case "InputText":
                return <Input placeholder={field.placeholder} />
            case "LongText":
                return <Textarea placeholder={field.placeholder} className="w-full" autoHeight rows={2} />
            case "Email":
                return <Input placeholder={field.placeholder} suffix={<i className="fi fi-rr-envelope text-md"></i>} />
            case "InputNumber":
                return <InputNumber placeholder={field.placeholder} />
            case "Datetime":
                return <DatetimePicker placeholder={field.placeholder} showTime={field.showTime} />
            case "Dropdown":
                return <Dropdown placeholder={field.placeholder} options={options} />
            case "Switch":
                return <Switch />
            case "OpinionScale":
                return <OpinionScale />
            case "Rating":
                return <Rating />
            case "MultipleChoice":
                return <MultipleChoice options={options} multipleSelection={field.multipleSelection} />
            case "Signature":
                return <SignaturePad />
            case "InputMarkdown":
                return <MarkdownEditor placeholder={field.placeholder} className="w-full" autoHeight rows={7} />
            case "StatusList":
                return <StatusChoice options={options} multipleSelection={field.multipleSelection} />
            case "InputUrl":
                return <Input placeholder={field.placeholder} suffix={<GlobeEuropeAfricaIcon className="w-5 h-5"/>} />

            // content blocks
            case "Line":
                return <BreakLine />
            case "Video":
                return <VideoBlock url={field.url} />
            case "Image":
                return <ImageBlock url={field.url} />
            case "Pdf":
                return <PdfBlock url={field.url} />
            case "Text":
                return <HtmlBlock content={field.content || ''} />
            case "QRCode":
                return <QRCodeBlock content={field.content} />
            case "TwitterTweet":
                return <TwitterTweetBlock url={field.url} />
        }
    }

    const isFormControl = FieldUtil.isFormControl(field);

    return (
        <>
            {
                isFormControl &&
                <FormItem
                    name={name}
                    title={field.title}
                    rules={buildRules}
                    hideTitle={field.hideTitle}
                >
                    {renderField()}
                </FormItem>
            }
            {
                !isFormControl &&
                <>
                    {renderField()}
                </>
            }
        </>
    );
}

export default FieldItem;