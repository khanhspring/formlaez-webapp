import { Link, useParams } from "react-router-dom";
import FormBuilder from "../../features/form-builder";
import useFormDetail from "../../hooks/form/useFormDetail";

function FormEdit() {

    const params = useParams();
    const { data: formDetail } = useFormDetail(params.formCode);

    return (
        <>
            <div className="px-10 py-3 flex items-center justify-between sticky top-0 z-50 bg-white border-b border-slate-900/10 dark:border-transparent dark:bg-cinder-700">
                <div className="flex items-center flex-1">
                    <Link to={`/private/forms/${formDetail?.code}`} className="flex items-center text-lg">
                        <i className="fi fi-rr-arrow-left"></i>
                    </Link>
                </div>
                <div className="flex items-center justify-center flex-1">
                    <span>{formDetail?.title}</span>
                </div>
                <div className="flex items-center justify-end flex-1 gap-5">
                    <Link to={`/private/forms/${formDetail?.code}/preview`} target="_blank">
                        <button className="flex items-center gap-1 text-sm">
                            <i className="fi fi-rr-eye"></i>
                            <span>Preview</span>
                        </button>
                    </Link>
                    <button className="flex items-center gap-1 text-sm">
                        <i className="fi fi-rr-heart"></i>
                        <span className="hidden">Favorite</span>
                    </button>
                    <button className="flex items-center gap-1 text-sm">
                        <i className="fi fi-rr-unlock"></i>
                        <span className="hidden">Lock</span>
                    </button>
                </div>
            </div>
            <div className="w-full flex flex-col pb-72">
                {
                    formDetail &&
                    <FormBuilder initForm={formDetail} />
                }
            </div>
        </>
    );
}

export default FormEdit;
