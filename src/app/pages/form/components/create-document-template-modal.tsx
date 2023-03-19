import RcForm from 'rc-field-form';
import { FC, useEffect } from 'react';
import { toast } from 'react-toastify';
import Modal from "../../../components/common/modal";
import FileUpload from '../../../components/form/form-controls/file-upload';
import Input from '../../../components/form/form-controls/input';
import FormItem from '../../../components/form/form-item';
import useCreateDocumentTemplate from '../../../hooks/document-template/useCreateDocumentTemplate';
import { CreateDocumentTemplateRequest } from '../../../models/document-template';
import { Form } from '../../../models/form';
import { showError } from '../../../util/common';

type Props = {
    form: Form;
    visible: boolean;
    onClose: () => void;
    refetch?: () => void;
}
const CreateDocumentTemplateModal: FC<Props> = ({ form, visible, onClose, refetch }) => {

    const [rcForm] = RcForm.useForm();
    const { mutateAsync: createDocumentTemplate, isLoading: submitting } = useCreateDocumentTemplate();

    useEffect(() => {
        if (visible) {
            rcForm.resetFields();
        }
    }, [visible, rcForm]);

    const onOk = () => {
        rcForm.submit();
    }

    const onFinish = (values: any) => {
        const request: CreateDocumentTemplateRequest = {
            title: values.title,
            description: values.description,
            formId: form.id,
            file: values.files[0]
        }
        createDocumentTemplate(request, {
            onSuccess: () => toast.success("Added document template successfully!"),
            onError: showError,
        })
            .finally(() => {
                onClose();
                refetch?.();
            });
    };

    return (
        <Modal
            visible={visible}
            onClose={onClose}
            title="Create document template"
            onOk={onOk}
            loading={submitting}
        >
            <RcForm
                onFinish={onFinish}
                form={rcForm}
            >
                <FormItem
                    title='Title'
                    name={'title'}
                    rules={[
                        { required: true, message: "This field is required" },
                    ]}
                >
                    <Input placeholder="Title" maxLength={255} />
                </FormItem>
                <FormItem
                    title='Description'
                    name={'description'}
                >
                    <Input placeholder="Description" maxLength={1000} />
                </FormItem>
                <FormItem
                    title='Template file'
                    name={'files'}
                    rules={[
                        { required: true, message: "This field is required" },
                    ]}
                >
                    <FileUpload
                        accept='.docx'
                        placeholder='Drag .DOCX file here or click to upload'
                        className=''
                    />
                </FormItem>
            </RcForm>
        </Modal>
    );
}

export default CreateDocumentTemplateModal;
