import {FormField} from './form';

export type FormDataAnalysis = {
    count: number;
    items: FormDataAnalysisItem[];
}

export type FormDataAnalysisItem = {
    field: FormField;
    values: ValueItem[];
    count: number;

    // number
    total: number;
    avg?: number;
    min?: number;
    max?: number;

    // date;
    years?: ValueItem[];
    dates?: ValueItem[];
    dateTimes?: ValueItem[];
}

export type ValueItem = {
    value: string | number;
    count: number;
}