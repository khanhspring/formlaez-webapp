import RcForm from "rc-field-form";
import { FormInstance } from "rc-field-form/lib/interface";
import { FC, useEffect, useState } from "react";
import Dropdown from "../../../../components/form/form-controls/dropdown";
import Input from "../../../../components/form/form-controls/input";
import Textarea from "../../../../components/form/form-controls/textarea";
import FormItem from "../../../../components/form/form-item";
import FieldUtil from "../../../../features/form-builder/utils/field-util";
import { Form } from "../../../../models/form";
import { PageView } from "../../../../models/page-view";

type Props = {
    form: Form;
    onFinish: (values?: any) => void;
    formInstant: FormInstance<any>;
    pageView?: PageView;
}

const SimpleListPageViewForm: FC<Props> = ({ form, onFinish, formInstant, pageView }) => {

    useEffect(() => {
        if (pageView) {
            const fieldsValue = {
                title: pageView.listingFields.find(f => f.fieldCode === 'title')?.targetFieldCode,
                titleUrl: pageView.listingFields.find(f => f.fieldCode === 'titleUrl')?.targetFieldCode,
                description: pageView.listingFields.find(f => f.fieldCode === 'description')?.targetFieldCode,
                status: pageView.listingFields.find(f => f.fieldCode === 'status')?.targetFieldCode,
            }

            const values = {
                code: pageView.code,
                title: pageView.title,
                description: pageView.description,
                fields: fieldsValue
            }
            formInstant.setFieldsValue(values);
        }
    }, [formInstant, pageView]);

    const [fieldHovered, setFieldHovered] = useState<string>();

    const titleFields = [];
    const urlFields = [];
    const descriptionFields = [];
    const statusFields = [];

    if (form.pages && form.pages.length > 0 && form.pages[0].sections) {
        for (const section of form.pages[0].sections) {
            // only support Single section
            if (section && section.type === 'Single' && section.fields && section.fields.length > 0) {
                const field = section.fields[0];
                if (FieldUtil.isFormControl(field)) {
                    if (['InputText', 'LongText'].includes(field.type)) {
                        titleFields.push({ label: field.title, value: field.code });
                    }
                    if (['InputUrl'].includes(field.type)) {
                        urlFields.push({ label: field.title, value: field.code });
                    }
                    if (['InputText', 'LongText'].includes(field.type)) {
                        descriptionFields.push({ label: field.title, value: field.code });
                    }
                    if (['StatusList'].includes(field.type)) {
                        statusFields.push({ label: field.title, value: field.code });
                    }
                }
            }
        }
    }

    const onMouseEnter = (field: string) => {
        setFieldHovered(field);
    }

    const onSubmit = (values: any) => {
        const listingFields = [
            {
                type: 'ReferenceField',
                fieldCode: 'title',
                targetFieldCode: values.fields?.title
            },
            {
                type: 'ReferenceField',
                fieldCode: 'titleUrl',
                targetFieldCode: values.fields?.titleUrl
            },
            {
                type: 'ReferenceField',
                fieldCode: 'description',
                targetFieldCode: values.fields?.description
            },
            {
                type: 'ReferenceField',
                fieldCode: 'status',
                targetFieldCode: values.fields?.status
            }
        ]
        const data = {...values, listingFields};
        onFinish(data);
    }

    return (
        <>
            <RcForm
                form={formInstant}
                onFinish={onSubmit}
            >
                <FormItem
                    title="Page path"
                    name={'code'}
                    rules={[
                        { required: true, message: 'This field is required' },
                        { pattern: /^[0-9a-zA-Z-_]+$/g, message: 'Accept alpha numeric and - or _ only' },
                    ]}
                    help="The public URL will be: https://app.formini.so/pages/your-page-path"
                >
                    <Input placeholder="Eg: your-page-path" />
                </FormItem>
                <FormItem
                    title="Page title"
                    name={'title'}
                    rules={[
                        { required: true, message: 'This field is required' },
                    ]}
                >
                    <Input placeholder="Page title" />
                </FormItem>
                <FormItem
                    title="Page description"
                    name={'description'}
                >
                    <Textarea placeholder="Description" rows={2} autoHeight />
                </FormItem>

                <div className="p-5 border border-zinc-100 dark:border-steel-gray-900 rounded">
                    <div className="bg-zinc-100 dark:bg-steel-gray-900 shadow hover:shadow-sm transition px-5 py-4 rounded mb-5">
                        <div className="flex items-center justify-between">
                            <h2 className="font-semibold text-base mb-1">
                                <span className={`${fieldHovered === 'title' || fieldHovered === 'titleUrl' ? 'outline outline-2 outline-red-500' : ''}`}>Formini.so</span>
                            </h2>
                            <span className={`rounded-xl flex items-center px-2 py-0.5 text-xs text-white bg-green-600 ${fieldHovered === 'status' ? 'outline outline-2 outline-red-500' : ''}`}>
                                Success
                            </span>
                        </div>
                        <p className={`text-sm text-zinc-500 dark:text-zinc-200 ${fieldHovered === 'description' ? 'outline outline-2 outline-red-500' : ''}`}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry
                        </p>
                    </div>

                    <div className="mt-5" onMouseEnter={() => onMouseEnter('title')} onMouseLeave={() => setFieldHovered(undefined)}>
                        <FormItem
                            title="Title"
                            name={['fields', 'title']}
                            rules={[
                                { required: true, message: 'This field is required' },
                            ]}
                            help="Allow input text, long text field only"
                        >
                            <Dropdown options={titleFields} />
                        </FormItem>
                    </div>

                    <div onMouseEnter={() => onMouseEnter('titleUrl')} onMouseLeave={() => setFieldHovered(undefined)}>
                        <FormItem
                            title="Title link"
                            name={['fields', 'titleUrl']}
                            help="Allow URL field only"
                        >
                            <Dropdown options={urlFields} />
                        </FormItem>
                    </div>

                    <div onMouseEnter={() => onMouseEnter('description')} onMouseLeave={() => setFieldHovered(undefined)}>
                        <FormItem
                            title="Description"
                            name={['fields', 'description']}
                            rules={[
                                { required: true, message: 'This field is required' },
                            ]}
                            help="Allow input text, long text field only"
                        >
                            <Dropdown options={descriptionFields} />
                        </FormItem>
                    </div>

                    <div onMouseEnter={() => onMouseEnter('status')} onMouseLeave={() => setFieldHovered(undefined)}>
                        <FormItem
                            title="Status"
                            name={['fields', 'status']}
                            help="Allow status field only"
                        >
                            <Dropdown options={statusFields} allowClear />
                        </FormItem>
                    </div>
                </div>
            </RcForm >
        </>
    )
}

export default SimpleListPageViewForm;