const FORM_SECTION_TYPES = ['Single', 'Group', 'Table'] as const;
export type FormSectionType = typeof FORM_SECTION_TYPES[number];

const FORM_FIELD_TYPES = ['Text', 'InputText', 'Image', 'Video', 'Pdf', 'Line', 'InputNumber', 'Datetime', 'LongText', 'Email', 'Rating', 'OpinionScale', 'Switch', 'Dropdown', 'PictureChoice', 'MultipleChoice'] as const;
export type FormFieldType = typeof FORM_FIELD_TYPES[number];

export type Meta = {
    state: 'Processing' | 'Success' | 'Error';
}

export type Form = {
    id: number;
    code: string;
    title: string;
    description?: string;
    pages: FormPage[];
}

export type FormPage = {
    id?: number;
    code: string;
    title: string;
    description?: string;
    sections?: FormSection[];
}

export type FormSection = {
    id?: number;
    code: string;
    variableName: string;
    title?: string;
    type: FormSectionType;
    description?: string;
    repeatable?: boolean;
    repeatButtonLabel?: string;
    fields?: FormField[];

    meta?: Meta;
}

export type FormField = {
    id?: number;
    code: string;
    variableName: string;
    type: FormFieldType;
    required?: boolean;
    title?: string;
    description?: string;
    placeholder?: string;

    hideTitle?: boolean;

    url?: string;
    caption?: string;

    // email
    acceptedDomains?: string;

    minLength?: number;
    maxLength?: number;

    min?: number;
    max?: number;

    readonly?: boolean;

    options?: FormFieldOption[];
}

export type FormFieldOption = {
    id?: number;
    code?: string;
    label?: string;
}

export type ConfigField = {
    name: string;
    description?: string;
    default: () => FormField;
}

export type ConfigSection = {
    name: string;
    description?: string;
    default: () => FormSection;
}

export type AddFormField = {
    field: FormField;
    fieldIndex?: number;
    sectionIndex?: number;
}

export type AddFormSection = {
    section: FormSection;
    sectionIndex?: number;
}

export type ReorderFormSection = {
    fromIndex: number;
    toIndex: number;
}

export type ReorderFormField = {
    sectionCode: string;
    fromIndex: number;
    toIndex: number;
}

export type ActionContext = {
    type: 'SingleField' | 'Group' | 'GroupField';
    fieldIndex?: number;
    sectionIndex?: number;
    field?: FormField;
    section?: FormSection;
}

export type RemoveFormSection = {
    sectionIndex?: number;
}

export type RemoveFormField = {
    sectionIndex?: number;
    fieldIndex?: number;
}

export type UpdateFormField = {
    field: FormField;
    sectionIndex?: number;
    fieldIndex?: number;
}

export type UpdateFormSection = {
    section: FormSection;
    sectionIndex?: number;
}

export type DuplicateSection = {
    sectionIndex?: number;
}

export type DuplicateFormField = {
    sectionIndex?: number;
    fieldIndex?: number;
}