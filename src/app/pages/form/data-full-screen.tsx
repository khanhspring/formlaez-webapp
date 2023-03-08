import { Link, useParams } from "react-router-dom";
import ButtonAction from "../../components/layout/button-action";
import useFormDetail from "../../hooks/form/useFormDetail";
import FormDataTable from "./components/form-data-table";

function DataFullScreen() {

    const params = useParams();
    const { data: form } = useFormDetail(params.formCode);

    return (
        <div className="w-full flex flex-col gap-2 p-5">
            <div className="flex items-center justify-between min-h-[40px] mt-3">
                <div className="flex items-center gap-3">
                    <span>Total 75</span>
                    <div className="relative hidden md:block">
                        <div className="absolute w-7 h-full flex items-center justify-center text-xs text-gray-500">
                            <i className="fi fi-rr-search"></i>
                        </div>
                        <input placeholder="Search" className="px-1 py-1.5 pl-7 bg-gray-200/70 dark:bg-cinder-700 rounded outline-none text-sm" />
                    </div>
                    <div className="hidden md:flex gap-2 py-1.5 px-3 cursor-pointer text-gray-500 bg-slate-50 dark:bg-cinder-700 rounded items-center justify-center">
                        <i className="fi fi-rr-calendar text-xs text-gray-500"></i>
                        <span className="text-sm text-gray-500">All time</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <ButtonAction>
                        <i className="fi fi-rr-plus"></i>
                    </ButtonAction>
                    <ButtonAction>
                        <i className="fi fi-rr-cloud-upload-alt"></i>
                    </ButtonAction>
                    <ButtonAction>
                        <i className="fi fi-rr-cloud-download-alt"></i>
                    </ButtonAction>
                    <Link to={`/private/forms/${params.formCode}`}>
                        <ButtonAction>
                            <i className="fi fi-rr-compress"></i>
                        </ButtonAction>
                    </Link>
                </div>
            </div>
            <div className="mt-6">
                <FormDataTable
                    form={form}
                    sticky={{
                        offsetHeader: 0
                    }}
                />
            </div>
        </div >
    );
}

export default DataFullScreen;
