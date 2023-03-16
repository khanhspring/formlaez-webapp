import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import FormGenerator from "../../features/form-generator";
import usePublishedFormDetail from "../../hooks/form/usePublishedFormDetail";
import useCreateSubmission from "../../hooks/submissions/useCreateSubmission";
import { CreateFormSubmissionRequest } from "../../models/form-submission";
import { showError } from "../../util/common";
import Error from "../error/Error";
import FormError401 from "./components/form-error-401";
import FormError403 from "./components/form-error-403";

function FormViewer() {

    const params = useParams();
    const navigate = useNavigate();
    const { data: formDetail, error } = usePublishedFormDetail(params.formCode);
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

    if (error?.response?.status === 401) {
        return (
            <FormError401 />
        );
    }

    if (error?.response?.status === 403) {
        return (
            <FormError403 />
        );
    }

    if (error) {
        return (
            <Error />
        );
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
