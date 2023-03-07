import { useParams } from "react-router-dom";
import FormGenerator from "../../features/form-generator";
import useFormDetail from "../../hooks/form/useFormDetail";

function FormPreview() {

    const params = useParams();
    const { data: formDetail } = useFormDetail(params.formCode);

    return (
        <div>
            {
                formDetail &&
                <FormGenerator
                    formLayout={formDetail}
                    initValues={{}}
                />
            }
        </div>
    );
}

export default FormPreview;
