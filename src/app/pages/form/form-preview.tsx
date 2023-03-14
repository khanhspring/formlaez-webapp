import Tooltip from "rc-tooltip";
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
        <div className="w-full relative">
            <div className="absolute top-3 left-1/2 -translate-x-1/2 z-[1000] text-center">
                <Tooltip placement="bottom" overlay={<div className="max-w-[300px]">Submission will not be recorded in preview mode</div>}>
                    <span className="px-3 py-1 rounded-2xl bg-black/50 text-xs text-white cursor-default">Preview mode</span>
                </Tooltip>
            </div>
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
