import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import FormGenerator from "../../features/form-generator";
import useFormDetail from "../../hooks/form/useFormDetail";

function FormPreview() {

    const params = useParams();
    const { data: formDetail } = useFormDetail(params.formCode);

    const onFinish = (values: any): Promise<any> => {
        toast.success("Submission will not be recorded in preview mode");
        return Promise.resolve();
    }

    return (
        <div>
            {
                formDetail &&
                <FormGenerator
                    formLayout={formDetail}
                    initValues={{}}
                    onFinish={onFinish}
                />
            }
        </div>
    );
}

export default FormPreview;
