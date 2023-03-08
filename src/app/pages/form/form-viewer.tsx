import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import FormGenerator from "../../features/form-generator";
import useFormDetail from "../../hooks/form/useFormDetail";
import useCreateSubmission from "../../hooks/submissions/useCreateSubmission";
import { CreateFormSubmissionRequest } from "../../models/form-submission";
import { showError } from "../../util/common";

function FormViewer() {

    const params = useParams();
    const navigate = useNavigate();
    const { data: formDetail } = useFormDetail(params.formCode);
    const { mutateAsync: submit, isLoading } = useCreateSubmission();

    const onFinish = (values: any) => {
        if (!params.formCode) {
            return Promise.resolve();
        }
        const request: CreateFormSubmissionRequest = {
            formCode: params.formCode,
            data: values
        }
        return submit(request, {
            onError: showError,
            onSuccess: () => toast.success("Submitted form successfully!")
        }).then((response) => {
            return navigate(`/f/v/${params.formCode}/s/${response.code}`);
        })
    }

    return (
        <div>
            {
                formDetail &&
                <FormGenerator
                    formLayout={formDetail}
                    initValues={{}}
                    onFinish={onFinish}
                    loading={isLoading}
                />
            }
        </div>
    );
}

export default FormViewer;
