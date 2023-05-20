import { RcFile } from "rc-upload/lib/interface";
import { FormFieldType } from "./form";

export type AIFormResult = {
    fields: AIFormFieldResult[];
}

export type AIFormFieldResult = {
    code: string;
    title?: string;
    description?: string;

    variableName: string;
    type: FormFieldType;

    placeholder?: string;
    required?: boolean;

    content?: string;

    options?: AIFormFieldOption[];
}

export type AIFormFieldOption = {
    code: string;
    label: string;
}

export type AIFormRequest = {
    formId: number;
    message: string;
    apiKey?: PersonalAIApiKey;
    file?: RcFile;
}

export type PersonalAIApiKey = {
    model: string;
    apiKey: string;
}