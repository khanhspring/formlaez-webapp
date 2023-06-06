import { FC, useEffect } from "react";
import { toast } from "react-toastify";
import Modal from "../../../components/common/modal";
import FormGenerator from "../../../features/form-generator";
import useUpdateSubmission from "../../../hooks/submissions/useUpdateSubmission";
import { Form } from "../../../models/form";
import { FormSubmission, UpdateFormSubmissionRequest } from "../../../models/form-submission";
import { showErrorIgnore403 } from "../../../util/common";
import RcForm from "rc-field-form";

type Props = {
    submission?: FormSubmission;
    form?: Form;
    onClose?: () => void;
    onReload?: () => void;
    visible: boolean;
}

const FormDataEditModal: FC<Props> = ({ submission, form, onClose, onReload, visible }) => {

    const { mutateAsync: update, isLoading } = useUpdateSubmission();
    const [rcForm] = RcForm.useForm();

    const onFinish = (values: any) => {
        if (!submission) {
            return Promise.reject();
        }

        const request: UpdateFormSubmissionRequest = {
            code: submission?.code,
            data: values
        }
        return update(request, {
            onError: (e) => showErrorIgnore403(e),
            onSuccess: () => {
                toast.success("Update submission successfully!");
                onReload?.();
            }
        }).then((response) => {
            onClose?.();
        })
    }

    const submitForm = () => {
        rcForm.submit();
    }

    return (
        <Modal
            title="Edit submission"
            visible={visible}
            width={750}
            onClose={onClose}
            destroyOnClose
            onOk={submitForm}
        >
            <div>
                {
                    form &&
                    <FormGenerator
                        formLayout={form}
                        initValues={submission?.data}
                        onFinish={onFinish}
                        loading={isLoading}
                        hideHeader
                        hideFooter
                        hideButton
                        formInstance={rcForm}
                        fullWidth
                    />
                }
            </div>
        </Modal>
    );
}

export default FormDataEditModal;
