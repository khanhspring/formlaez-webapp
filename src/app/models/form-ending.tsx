export type UpdateFormEndingRequest = {
    formId: number;
    content?: string;
    hideButton: boolean;
}

export type FormEnding = {
    content?: string;
    hideButton: boolean;
}