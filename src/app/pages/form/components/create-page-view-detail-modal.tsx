import RcForm from 'rc-field-form';
import { FC, useEffect } from 'react';
import { toast } from 'react-toastify';
import Modal from "../../../components/common/modal";
import useCreatePageView from '../../../hooks/page-views/useCreatePageView';
import { Form } from '../../../models/form';
import { CreatePageViewRequest } from '../../../models/page-view';
import { showErrorIgnore403 } from '../../../util/common';
import JobBoardPageViewForm from './page-views/job-board-page-view-form';
import SimpleListPageViewForm from './page-views/simple-list-page-view-form';

type Props = {
    form: Form;
    visible: boolean;
    onClose: () => void;
    templateCode: string;
    onSuccess: () => void;
}
const CreatePageViewDetailModal: FC<Props> = ({ form, visible, onClose, onSuccess, templateCode }) => {

    const [rcForm] = RcForm.useForm();
    const { mutateAsync: createPageView, isLoading: submitting } = useCreatePageView();

    useEffect(() => {
        if (visible) {
            rcForm.resetFields();
        }
    }, [visible, rcForm]);

    const onOk = () => {
        rcForm.submit();
    }

    const onFinish = (values: any) => {
        const request: CreatePageViewRequest = {
            code: values.code,
            title: values.title,
            description: values.description,
            formId: form.id,
            templateCode: templateCode,
            detail: {
                type: 'Inactive'
            },
            listingFields: values.listingFields
        }
        createPageView(request, {
            onSuccess: () => {
                toast.success("Created page view successfully!");
                onSuccess();
            },
            onError: (e) => showErrorIgnore403(e),
        }).finally(() => {
            onClose();
        });
    };

    return (
        <Modal
            visible={visible}
            onClose={onClose}
            title="Create page view"
            onOk={onOk}
            loading={submitting}
            width={700}
        >
            {
                templateCode === 'SimpleList' &&
                <SimpleListPageViewForm
                    formInstant={rcForm}
                    onFinish={onFinish}
                    form={form}
                />
            }
            {
                templateCode === 'JobBoard' &&
                <JobBoardPageViewForm
                    formInstant={rcForm}
                    onFinish={onFinish}
                    form={form}
                />
            }
        </Modal>
    );
}

export default CreatePageViewDetailModal;
