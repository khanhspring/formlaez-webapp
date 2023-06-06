import RcForm from 'rc-field-form';
import { FC, useEffect } from 'react';
import { toast } from 'react-toastify';
import Modal from "../../../components/common/modal";
import useUpdatePageView from '../../../hooks/page-views/useUpdatePageView';
import { Form } from '../../../models/form';
import { PageView, UpdatePageViewRequest } from '../../../models/page-view';
import { showErrorIgnore403 } from '../../../util/common';
import JobBoardPageViewForm from './page-views/job-board-page-view-form';
import SimpleListPageViewForm from './page-views/simple-list-page-view-form';

type Props = {
    form: Form;
    visible: boolean;
    onClose: () => void;
    onSuccess: () => void;
    pageView: PageView;
}
const UpdatePageViewDetailModal: FC<Props> = ({ form, visible, onClose, onSuccess, pageView }) => {

    const [rcForm] = RcForm.useForm();
    const { mutateAsync: updatePageView, isLoading: submitting } = useUpdatePageView();

    const onOk = () => {
        rcForm.submit();
    }

    const onFinish = (values: any) => {
        const request: UpdatePageViewRequest = {
            id: pageView.id,
            code: values.code,
            title: values.title,
            description: values.description,
            detail: {
                type: 'Inactive'
            },
            listingFields: values.listingFields
        }
        updatePageView(request, {
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
            title="Update page view"
            onOk={onOk}
            loading={submitting}
            width={700}
        >
            {
                pageView.template.code === 'SimpleList' &&
                <SimpleListPageViewForm
                    formInstant={rcForm}
                    onFinish={onFinish}
                    form={form}
                    pageView={pageView}
                />
            }
            {
                pageView.template.code === 'JobBoard' &&
                <JobBoardPageViewForm
                    formInstant={rcForm}
                    onFinish={onFinish}
                    form={form}
                    pageView={pageView}
                />
            }
        </Modal>
    );
}

export default UpdatePageViewDetailModal;
