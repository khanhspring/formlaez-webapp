import RcForm from 'rc-field-form';
import { FC, useEffect } from 'react';
import Modal from "../../../components/common/modal";
import Input from '../../../components/form/form-controls/input';
import FormItem from '../../../components/form/form-item';
import useUpdateDocumentTemplate from '../../../hooks/document-template/useUpdateDocumentTemplate';
import { DocumentTemplate, UpdateDocumentTemplateRequest } from '../../../models/document-template';
import { showError, showSuccess } from '../../../util/common';

type Props = {
    visible: boolean;
    onClose: () => void;
    refetch?: () => void;
    documentTemplate: DocumentTemplate;
}
const UpdateDocumentTemplateModal: FC<Props> = ({ visible, onClose, refetch, documentTemplate }) => {

    const [rcForm] = RcForm.useForm();
    const { mutateAsync: updateTemplate, isLoading: submitting } = useUpdateDocumentTemplate();

    useEffect(() => {
        if (visible) {
            rcForm.setFieldsValue({...documentTemplate});
        }
    }, [visible, rcForm, documentTemplate]);

    const onOk = () => {
        rcForm.submit();
    }

    const onFinish = (values: any) => {
        const request: UpdateDocumentTemplateRequest = {
            id: documentTemplate.id,
            title: values.title,
            description: values.description,
        }
        updateTemplate(request, {
            onSuccess: showSuccess,
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
            title="Update document template"
            onOk={onOk}
            loading={submitting}
        >
            <RcForm
                onFinish={onFinish}
                form={rcForm}
                initialValues={{...documentTemplate}}
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
            </RcForm>
        </Modal>
    );
}

export default UpdateDocumentTemplateModal;
