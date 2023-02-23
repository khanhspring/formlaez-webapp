import FormGenerator from "../../features/form-generator";
import { FORM_LAYOUT } from "../../features/form-generator/data";

function FormPreview() {

    return (
        <div>
            <FormGenerator
                formLayout={FORM_LAYOUT}
                initValues={{}}
            />
        </div>
    );
}

export default FormPreview;
