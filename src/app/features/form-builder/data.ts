import { Form } from "../../models/form";

export const EMPTY_FORM: Form = {
    id: 1,
    code: 'f',
    title: 'Form 1',
    scope: 'Private',
    pages: [
        {
            id: 1,
            code: 'p1',
            title: 'Page 1',
            sections: []
        }
    ]
}

export const FORM: Form = {
    id: 1,
    code: 'f',
    title: 'Form 1',
    scope: 'Private',
    pages: [
        {
            id: 1,
            code: 'p1',
            title: 'Page 1',
            sections: [
                {
                    id: 1,
                    code: 's1',
                    variableName: 'section1',
                    title: 'Section 1',
                    type: 'Single',
                    repeatable: false,
                    fields: [
                        {
                            id: 101,
                            code: 'f1',
                            variableName: 'inputNumber',
                            title: 'Input number',
                            type: 'InputNumber',
                        }
                    ]
                },
                {
                    id: 2,
                    code: 's2',
                    variableName: 'section2',
                    title: 'Section 2',
                    type: 'Single',
                    repeatable: false,
                    fields: [
                        {
                            id: 201,
                            code: 'f2',
                            variableName: 'inputText',
                            title: 'Input text',
                            type: 'InputText',
                        }
                    ]
                },
                {
                    id: 3,
                    code: 's3',
                    variableName: 'section3',
                    title: 'Section 3',
                    type: 'Group',
                    repeatable: true,
                    fields: [
                        {
                            id: 301,
                            code: 'f301',
                            variableName: 'inputText',
                            title: 'Input text',
                            type: 'InputText',
                        },
                        {
                            id: 302,
                            code: 'f302',
                            variableName: 'inputText',
                            title: 'Input text',
                            type: 'InputText',
                        },
                        {
                            id: 303,
                            code: 'f303',
                            variableName: 'inputText',
                            title: 'Input number',
                            type: 'InputNumber',
                        }
                    ]
                },
                {
                    id: 4,
                    code: 's4',
                    variableName: 'section4',
                    title: 'Section 4',
                    type: 'Group',
                    repeatable: true,
                    fields: [
                        {
                            id: 401,
                            code: 'f401',
                            variableName: 'inputText',
                            title: 'Input text',
                            type: 'InputText',
                        },
                        {
                            id: 402,
                            code: 'f402',
                            variableName: 'inputText',
                            title: 'Input text',
                            type: 'InputText',
                        }
                    ]
                },
                {
                    id: 5,
                    code: 's5',
                    variableName: 'section5',
                    title: 'Section 5',
                    type: 'Group',
                    repeatable: true,
                    fields: [
                        {
                            id: 501,
                            code: 'f501',
                            variableName: 'inputText',
                            title: 'Input text',
                            type: 'InputText',
                        },
                        {
                            id: 502,
                            code: 'f502',
                            variableName: 'inputText',
                            title: 'Input text',
                            type: 'InputText',
                        },
                        {
                            id: 503,
                            code: 'f503',
                            variableName: 'inputText',
                            title: 'Input number',
                            type: 'InputNumber',
                        }
                    ]
                },
                {
                    id: 6,
                    code: 's6',
                    variableName: 'section6',
                    title: 'Section 6',
                    type: 'Single',
                    repeatable: false,
                    fields: [
                        {
                            id: 601,
                            code: 'f2',
                            variableName: 'inputText',
                            title: 'Input text',
                            type: 'Text',
                        }
                    ]
                },
            ]
        }
    ]
}