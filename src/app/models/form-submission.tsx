import { Pageable } from "./common";
import { User } from "./user";

export type FormSubmission = {
    id: number;
    code: string;
    data: any;
    createdDate: Date;
    lastModifiedDate: Date;
    createdBy: User;
    lastModifiedBy: User;
}

export type CreateFormSubmissionRequest = {
    formCode: string;
    data: any;
}

export type SearchFormSubmissionRequest = Pageable & {
    formCode?: string;
    advance?: boolean;
    keywords?: string;
}