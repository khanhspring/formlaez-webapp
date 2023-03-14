import { RcFile } from "rc-upload/lib/interface";
import { Pageable } from "./common";

export type DocumentTemplate = {
    id: number;
    code: string;
    attachmentCode: string;
    title: string;
    description: string;
    extension: string;
    size: number;
    originalName: string;
    createdDate: Date;
    lastModifiedDate: Date;
}

export type CreateDocumentTemplateRequest = {
    title: string;
    description?: string;
    formId: number;
    file: RcFile;
}

export type SearchDocumentTemplateRequest = Pageable & {
    keyword?: string;
    formId?: number;
}