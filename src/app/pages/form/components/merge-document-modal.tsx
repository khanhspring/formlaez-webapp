import RcForm from 'rc-field-form';
import { FC, useEffect } from 'react';
import { toast } from 'react-toastify';
import Modal from "../../../components/common/modal";
import Dropdown from '../../../components/form/form-controls/dropdown';
import FormItem from '../../../components/form/form-item';
import useDocumentTemplates from '../../../hooks/document-template/useDocumentTemplates';
import useMergeDocument from '../../../hooks/submissions/useMergeDocument';
import { Form } from '../../../models/form';
import { FormSubmission, MergeDocumentRequest } from '../../../models/form-submission';
import { showErrorIgnore403 } from '../../../util/common';

type Props = {
    form?: Form;
    submission?: FormSubmission;
    visible: boolean;
    onClose: () => void;
}
const MergeDocumentModal: FC<Props> = ({ form, submission, visible, onClose }) => {

    const [rcForm] = RcForm.useForm();
    const { data: templatePages } = useDocumentTemplates({ formId: form?.id, size: -1 });
    const { mutateAsync: mergeDocument, isLoading } = useMergeDocument();

    useEffect(() => {
        if (visible) {
            rcForm.resetFields();
        }
        if (submission && templatePages && templatePages.totalElements > 0) {
            rcForm.setFieldValue("templateCode", templatePages.content[0].code);
            rcForm.setFieldValue("fileType", 'Docx');
        }
    }, [visible, rcForm, submission, templatePages]);

    const onOk = () => {
        rcForm.submit();
    }

    const onFinish = (values: any) => {
        if (!submission) {
            return;
        }
        const templates = templatePages?.content.filter(item => item.code === values.templateCode) || [];

        if (templates?.length === 0) {
            return;
        }
        const selectedTemplate = templates[0];
        const fileType: any = values.fileType;

        const request: MergeDocumentRequest = {
            code: submission.code,
            templateId: selectedTemplate.id,
            fileName: selectedTemplate.title + "." + fileType.toLowerCase(),
            fileType: fileType
        }
        mergeDocument(request, {
            onError: (e) => showErrorIgnore403(e),
            onSuccess: () => toast.success("Merged successfully!")
        }).finally(onClose)
    }

    const templateOptions = templatePages?.content?.map(item => ({ ...item, value: item.code, label: item.title }));
    const fileTypeOptions = [{value: 'Docx', label: 'Docx'}, {value: 'Pdf', label: 'PDF'}]

    return (
        <Modal
            visible={visible}
            onClose={onClose}
            title="Document merge"
            onOk={onOk}
            loading={isLoading}
        >
            <RcForm
                onFinish={onFinish}
                form={rcForm}
            >
                <FormItem
                    title='Template'
                    name={'templateCode'}
                    rules={[
                        { required: true, message: "This field is required" },
                    ]}
                >
                    <Dropdown options={templateOptions} placeholder="Select a template" />
                </FormItem>
                <FormItem
                    title='File format'
                    name={'fileType'}
                    rules={[
                        { required: true, message: "This field is required" },
                    ]}
                >
                    <Dropdown options={fileTypeOptions} placeholder="Select a file format" />
                </FormItem>
            </RcForm>
        </Modal>
    );
}

export default MergeDocumentModal;
