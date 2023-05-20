import { nanoid } from 'nanoid';
import RcForm from 'rc-field-form';
import { FC, useEffect } from 'react';
import { toast } from 'react-toastify';
import Modal from "../../../components/common/modal";
import Textarea from '../../../components/form/form-controls/textarea';
import FormItem from '../../../components/form/form-item';
import { addSections, setSelectedItems } from '../../../features/form-builder/slice';
import useAIGenerateForm from '../../../hooks/ai-form-builder/useAIGenerateForm';
import { useAppDispatch } from '../../../hooks/redux-hook';
import { AIFormRequest, AIFormResult } from '../../../models/ai-form-builder';
import { AddFormSections, Form, FormSection, SelectionItem } from '../../../models/form';
import { showErrorIgnore403 } from '../../../util/common';
import FileUpload from '../../../components/form/form-controls/file-upload';

type Props = {
    visible: boolean;
    onClose: () => void;
    refetch?: () => void;
    formDetail: Form;
}
const AIFormBuilderModal: FC<Props> = ({ formDetail, visible, onClose, refetch }) => {

    const [rcForm] = RcForm.useForm();
    const { mutateAsync: aiGenerateForm, isLoading: submitting } = useAIGenerateForm();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (visible) {
            rcForm.resetFields();
        }
    }, [visible, rcForm]);

    const onOk = () => {
        rcForm.submit();
    }

    const onFinish = (values: any) => {
        if (!formDetail) {
            return;
        }
        const request: AIFormRequest = {
            formId: formDetail.id,
            message: values.message,
            apiKey: {
                model: 'gpt-3.5-turbo',
                apiKey: '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'
            }
        };
        if (values.files && values.files.length > 0) {
            request.file = values.files[0];
        }
        aiGenerateForm(request, {
            onSuccess: (response) => {onAddSections(response)},
            onError: (e) => showErrorIgnore403(e),
        }).finally(() => {
            onClose();
            refetch?.();
        });
    };

    const onAddSections = (aiFormResult: AIFormResult) => {
        if (!aiFormResult || !aiFormResult.fields) {
            toast.error("We can not understand your idea. Please try again!");
            return;
        }
        const sections = formDetail.pages[0].sections || [];

        const newSections: FormSection[] = [];
        for (const field of aiFormResult.fields) {
            field.options?.forEach(option => {
                option.code = nanoid();
            });
            const newField = {
                ...field,
                code: nanoid(),
                variableName: field.code,
                placeholder: field.title,
            }
            const newSection: FormSection = {
                code: nanoid(),
                type: "Single",
                variableName: nanoid(),
                fields: [newField],
              };
              newSections.push(newSection);
        }

        const sectionIndex = sections.length - 1;
        const addSectionsCommand: AddFormSections = {
            sectionIndex: sectionIndex,
            sections: newSections
        }
        dispatch(addSections(addSectionsCommand))
            .then(() => {
                const selectedItems: SelectionItem[] = [];
                for (let i = 0; i < newSections.length; i++) {
                    const section = newSections[i];
                    selectedItems.push({
                        sectionCode: section.code,
                        sectionIndex: i + sectionIndex
                    })
                }
                dispatch(setSelectedItems(selectedItems));
            });
    }

    return (
        <Modal
            visible={visible}
            onClose={onClose}
            title="Ask AI to build your form"
            onOk={onOk}
            loading={submitting}
            width={700}
            okText='Generate'
        >
            <RcForm
                onFinish={onFinish}
                form={rcForm}
            >
                <FormItem
                    title='Message'
                    name={'message'}
                    rules={[
                        { required: true, message: "This field is required" },
                    ]}
                >
                    <Textarea placeholder="Description of the form you want the AI to build..." rows={3} autoHeight autoFocus/>
                </FormItem>
                <FormItem
                    title='Reference file'
                    name={'files'}
                    help='File helps AI know the details of your request'
                >
                    <FileUpload
                        accept='.docx,.pdf'
                        placeholder='Drag .DOCX, .PDF file here or click to upload'
                        className=''
                    />
                </FormItem>
            </RcForm>
        </Modal>
    );
}

export default AIFormBuilderModal;
