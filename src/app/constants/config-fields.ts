import { ConfigField, ConfigSection } from "../models/form";
import { nanoid } from "nanoid";

export const newId = () => {
    return nanoid(5).toLowerCase();
}

export const FormControlConfigFields: ConfigField[] = [
    {
        name: "Input text",
        description: "Add a input text to this form",
        default: () => ({
            code: nanoid(),
            type: "InputText",
            variableName: newId(),
            title: "Input text",
            placeholder: "Input text",
            required: true,
        })
    },
    {
        name: "Long text",
        description: "Add a input long text to this form",
        default: () => ({
            code: nanoid(),
            type: "LongText",
            variableName: newId(),
            title: "Long text",
            placeholder: "Long text",
            required: true,
        })
    },
    {
        name: "Email",
        description: "Add a input email to this form",
        default: () => ({
            code: nanoid(),
            type: "Email",
            variableName: newId(),
            title: "Email",
            placeholder: "email@example.com",
            required: true,
        })
    },
    {
        name: "Input number",
        description: "Add a input number to this form",
        default: () => ({
            code: nanoid(),
            type: "InputNumber",
            variableName: newId(),
            title: "Input number",
            placeholder: "Input number",
            required: true,
        })
    },
    {
        name: "Date time picker",
        description: "Add a date time picker to this form",
        default: () => ({
            code: nanoid(),
            type: "Datetime",
            variableName: newId(),
            title: "Date time picker",
            placeholder: "Date time picker",
            required: true,
        })
    },
    {
        name: "Dropdown",
        description: "Add a dropdown to this form",
        default: () => ({
            code: nanoid(),
            type: "Dropdown",
            variableName: newId(),
            title: "Dropdown",
            placeholder: "Dropdown",
            required: true,
            options: [
                {
                    code: nanoid(),
                    label: 'Unlabeled option'
                }
            ]
        })
    },
    {
        name: "Multiple choice",
        description: "Add a multiple choice to this form",
        default: () => ({
            code: nanoid(),
            type: "MultipleChoice",
            variableName: newId(),
            title: "Multiple choice",
            placeholder: "Multiple choice",
            required: true,
            options: [
                {
                    code: nanoid(),
                    label: 'Unlabeled option'
                }
            ]
        })
    },
    /* Not supported yet {
        name: "Picture choice",
        description: "Add a picture choice to this form",
        default: () => ({
            code: nanoid(),
            type: "PictureChoice",
            variableName: newId(),
            title: "Picture choice",
            placeholder: "Picture choice",
        })
    },*/
    {
        name: "Rating",
        description: "Add a rating to this form",
        default: () => ({
            code: nanoid(),
            type: "Rating",
            variableName: newId(),
            title: "Rating",
            placeholder: "Rating",
            required: true,
        })
    },
    {
        name: "Switch",
        description: "Add a switch to this form",
        default: () => ({
            code: nanoid(),
            type: "Switch",
            variableName: newId(),
            title: "Switch",
            placeholder: "Switch",
            required: false,
        })
    },
    {
        name: "Opinion scale",
        description: "Add a opinion scale to this form",
        default: () => ({
            code: nanoid(),
            type: "OpinionScale",
            variableName: newId(),
            title: "Opinion scale",
            placeholder: "Opinion scale",
            required: true,
        })
    },
    {
        name: "Signature",
        description: "Add a signature pad",
        default: () => ({
            code: nanoid(),
            type: "Signature",
            variableName: newId(),
            title: "Signature",
            required: true,
        })
    },
];

export const DecoratorConfigFields: ConfigField[] = [
    {
        name: "Text",
        description: "Just start writing with plan text",
        default: () => ({
            code: nanoid(),
            type: "Text",
            variableName: newId(),
        })
    },
    {
        name: "Video",
        description: "Embed from Youtube, Vimeo,...",
        default: () => ({
            code: nanoid(),
            type: "Video",
            variableName: newId(),
        })
    },
    {
        name: "Image",
        description: "Upload or embed with a link",
        default: () => ({
            code: nanoid(),
            type: "Image",
            variableName: newId(),
        })
    },
    {
        name: "Pdf",
        description: "Embed a PDF",
        default: () => ({
            code: nanoid(),
            type: "Pdf",
            variableName: newId(),
        })
    },
    {
        name: "QR code",
        description: "Add a QR code",
        default: () => ({
            code: nanoid(),
            type: "QRCode",
            variableName: newId(),
        })
    },
    {
        name: "Twitter Tweet",
        description: "Embed a Tweet",
        default: () => ({
            code: nanoid(),
            type: "TwitterTweet",
            variableName: newId(),
        })
    },
    {
        name: "Line",
        description: "Add a line",
        default: () => ({
            code: nanoid(),
            type: "Line",
            variableName: newId(),
        })
    },
];

export const ConfigSections: ConfigSection[] = [
    {
        name: "Group",
        description: "Add a repeatable group",
        default: () => ({
            code: nanoid(),
            variableName: newId(),
            title: 'Untitled group',
            type: "Group",
            repeatable: true,
            fields: []
        })
    }
]