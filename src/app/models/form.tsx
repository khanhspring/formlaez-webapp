import { Pageable } from "./common";
import { FormEnding } from "./form-ending";
import { Team } from "./team";
import { Workspace } from "./workspace";

const FORM_SECTION_TYPES = ['Single', 'Group', 'Table'] as const;
export type FormSectionType = typeof FORM_SECTION_TYPES[number];

const FORM_FIELD_TYPES = ['Text', 'InputText', 'Image', 'Video', 'Pdf', 'Line', 'QRCode', 'TwitterTweet', 'InputNumber', 'Datetime', 'LongText', 'Email', 'Rating', 'OpinionScale', 'Switch', 'Dropdown', 'PictureChoice', 'MultipleChoice', 'Signature'] as const;
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
    coverType?: 'Color' | 'Image' | 'None',
    coverColor?: string,
    coverImageUrl?: string
    scope: 'Private' | 'Team',
    status: 'Draft' | 'Published' | 'Archived',
    sharingScope: 'Private' | 'Public' | 'Authenticated',
    acceptResponses: boolean,
    allowPrinting: boolean,
    allowResponseEditing: boolean,
    createdDate?: Date,
    lastModifiedDate?: Date,
    ending?: FormEnding;
    team?: Team;
    workspace: Workspace;
}

export type FormPage = {
    id: number;
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
    title?: string;
    description?: string;

    variableName: string;
    type: FormFieldType;

    placeholder?: string;
    required?: boolean;

    content?: string;

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
    multipleSelection?: boolean;

    showTime?: boolean;
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

export type AddFormSections = {
    sections: FormSection[];
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

export type SelectionItem = {
    sectionIndex: number;
    sectionCode: string;
}

export type RemoveFormSection = {
    sectionIndex?: number;
}

export type RemoveFormSections = {
    codes: string[]
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

export type PartialUpdateFormField = {
    sectionIndex?: number;
    fieldIndex?: number;
    values: { [key: string]: any };
}

export type UpdateFormSection = {
    section: FormSection;
    sectionIndex?: number;
}

export type PartialUpdateFormSection = {
    sectionIndex?: number;
    values: { [key: string]: any };
}

export type DuplicateSection = {
    sectionIndex?: number;
}

export type DuplicateFormField = {
    sectionIndex?: number;
    fieldIndex?: number;
}

export type UpdateFormInfo = {
    id: number;
    title: string;
    description?: string;
    coverType?: 'Color' | 'Image' | 'None',
    coverColor?: string,
    coverImageUrl?: string
}


// API models

export type CreateFormRequest = {
    title: string;
    description?: string;
    scope: 'Private' | 'Team';
    teamId?: number;
    workspaceId: number;
    coverType: 'Color' | 'Image' | 'None',
    coverColor?: string,
    coverImageUrl?: string
}

export type UpdateFormRequest = {
    id: number;
    title: string;
    description?: string;
    coverType?: 'Color' | 'Image' | 'None',
    coverColor?: string,
    coverImageUrl?: string
}

export type UpdateFormSettingsRequest = {
    id: number;
    acceptResponses: boolean;
    allowPrinting: boolean;
    allowResponseEditing: boolean;
    sharingScope: 'Private' | 'Public' | 'Authenticated',
}

export type SearchFormRequest = Pageable & {
    keyword?: string;
    scope: 'Private' | 'Team';
    teamId?: number;
    workspaceId: number;
}

export type CreateFormSectionRequest = {
    id?: number;
    code: string;
    variableName: string;
    title?: string;
    type: FormSectionType;
    description?: string;
    repeatable?: boolean;
    repeatButtonLabel?: string;
    fields?: FormField[];

    pageId: number;
    position: number;
}

export type UpdateFormSectionRequest = {
    code: string;
    variableName: string;
    title?: string;
    description?: string;
    repeatButtonLabel?: string;
}

export type MoveFormSectionRequest = {
    sectionCode: string;
    newPosition: number;
}

export type MoveFormFieldRequest = {
    fieldCode: string;
    newPosition: number;
}

export type CreateFormFieldRequest = {
    sectionCode: string;
    code: string;
    title?: string;
    description?: string;

    variableName: string;
    type: FormFieldType;

    placeholder?: string;
    required?: boolean;

    position: number;
}

export type UpdateFormFieldRequest = {
    code: string;
    title?: string;
    description?: string;

    variableName: string;
    type: FormFieldType;

    placeholder?: string;
    required?: boolean;

    content?: string;

    hideTitle?: boolean;

    url?: string;
    caption?: string;

    acceptedDomains?: string;

    minLength?: number;
    maxLength?: number;

    min?: number;
    max?: number;

    readonly?: boolean;

    options?: FormFieldOption[];
    multipleSelection?: boolean;

    showTime?: boolean;
}
