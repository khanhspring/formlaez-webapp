import { FC } from "react";
import { toast } from "react-toastify";
import Drawer from "../../../components/drawer/drawer";
import FormGenerator from "../../../features/form-generator";
import useUpdateSubmission from "../../../hooks/submissions/useUpdateSubmission";
import { Form } from "../../../models/form";
import { FormSubmission, UpdateFormSubmissionRequest } from "../../../models/form-submission";
import { showError } from "../../../util/common";

type Props = {
    submission?: FormSubmission;
    form?: Form;
    onClose?: () => void;
    visible: boolean;
}

const FormDataEditDrawer: FC<Props> = ({ submission, form, onClose, visible }) => {

    const { mutateAsync: update, isLoading } = useUpdateSubmission();

    const onFinish = (values: any) => {
        if (!submission) {
            return Promise.reject();
        }

        const request: UpdateFormSubmissionRequest = {
            code: submission?.code,
            data: values
        }
        return update(request, {
            onError: showError,
            onSuccess: () => toast.success("Update submission successfully!")
        }).then((response) => {
            onClose?.();
        })
    }

    return (
        <Drawer
            title={submission?.code}
            open={visible}
            width={600}
            onClose={onClose}
            destroyOnClose
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
                    />
                }
            </div>
        </Drawer>
    );
}

export default FormDataEditDrawer;
