import { nanoid } from 'nanoid';
import RcForm from 'rc-field-form';
import { FC, useEffect } from 'react';
import { toast } from 'react-toastify';
import Modal from "../../../components/common/modal";
import FileUpload from '../../../components/form/form-controls/file-upload';
import Textarea from '../../../components/form/form-controls/textarea';
import FormItem from '../../../components/form/form-item';
import { addSections, setSelectedItems } from '../../../features/form-builder/slice';
import useAIGenerateForm from '../../../hooks/ai-form-builder/useAIGenerateForm';
import { useAppDispatch } from '../../../hooks/redux-hook';
import { AIFormRequest, AIFormResult } from '../../../models/ai-form-builder';
import { AddFormSections, Form, FormSection, SelectionItem } from '../../../models/form';
import StorageService from '../../../services/storage-service';
import { showError, showErrorByCondition, showErrorIgnore403 } from '../../../util/common';
import Drawer from '../../../components/drawer/drawer';
import Button from '../../../components/common/button';

type Props = {
    visible: boolean;
    onClose: () => void;
    refetch?: () => void;
    formDetail: Form;
}
const AIFormBuilderBox: FC<Props> = ({ formDetail, visible, onClose, refetch }) => {

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
        const apiKeyVal = StorageService.getItem("OpenAIApiKey");
        const model = StorageService.getItem("OpenAIModel") || 'gpt-3.5-turbo';
        let apiKey = undefined;

        if (apiKeyVal) {
            apiKey = {
                apiKey: apiKeyVal,
                model: model
            }
        }
        const request: AIFormRequest = {
            formId: formDetail.id,
            message: values.message,
            apiKey: apiKey
        };
        if (values.files && values.files.length > 0) {
            request.file = values.files[0];
        }
        aiGenerateForm(request, {
            onSuccess: (response) => { onAddSections(response) },
            onError: (e: any) => {
                if (e.response.data.code === '991') {
                    toast.error("OpenAI API key is not set, please ask workspace owner or add your own API in user menu", { autoClose: 6500 });
                    return;
                }
                if (e.response.data.code === '990') {
                    let message = undefined;
                    if (e.response.data.message) {
                        message = `[OpenAI API error] ${e.response.data.message}`;
                    } else {
                        message = "Something went wrong. Please try again!";
                    }
                    toast.error(message, { autoClose: 5000 });
                    return;
                }
                showError();
            },
        }).finally(() => {
            onClose();
            refetch?.();
        });
    };

    const onAddSections = (aiFormResult: AIFormResult) => {
        if (!aiFormResult || !aiFormResult.fields) {
            toast.error("Could not generate the form according to your description. Please try again!", { autoClose: 5000 });
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
                scrollToBottom();
            });
    }

    const scrollToBottom = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
        })
    }

    const onKeyDown = (e: any) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            onClose();
            e.preventDefault();
        }
    }

    return (
        <Drawer
            open={visible}
            onClose={onClose}
            placement='bottom'
            width={'100wv'}
        >
            <div className='m-auto w-full max-w-[640px]'>
                <RcForm
                    onFinish={onFinish}
                    form={rcForm}
                    onKeyDown={onKeyDown}
                >
                    <FormItem
                        name={'message'}
                        rules={[
                            { required: true, message: "This field is required" },
                        ]}
                    >
                        <Textarea placeholder="Description of the form you want the AI to build..." rows={3} autoHeight autoFocus className='rounded-3xl'/>
                    </FormItem>
                </RcForm>
            </div>
        </Drawer>
    );
}

export default AIFormBuilderBox;
