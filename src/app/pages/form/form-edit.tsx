import { Link } from "react-router-dom";
import FormBuilder from "../../features/form-builder";
import { EMPTY_FORM } from "../../features/form-builder/data";

function FormEdit() {

    return (
        <>
            <div className="px-10 py-3 flex items-center justify-between sticky top-0 z-50 dark:bg-cinder-700">
                <div className="flex items-center flex-1">
                    <Link to={"/private/forms/example"} className="flex items-center text-lg">
                        <i className="fi fi-rr-arrow-left"></i>
                    </Link>
                </div>
                <div className="flex items-center justify-center flex-1">
                    <span>Hợp đồng lao động vô thời hạn</span>
                </div>
                <div className="flex items-center justify-end flex-1 gap-5">
                    <Link to={"/private/forms/example/preview"} target="_blank">
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
            <div className="w-full max-w-[580px] m-auto flex flex-col mt-10 pb-72">
                <FormBuilder initForm={EMPTY_FORM} />
            </div>
        </>
    );
}

export default FormEdit;
