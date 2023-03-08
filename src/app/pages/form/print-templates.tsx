import Empty from "../../components/common/empty";
import PageTitle from "../../components/layout/page-title";
import FormPageMenu from "./components/form-page-menu";

function PrintTemplates() {

    return (
        <div className="w-full flex flex-col gap-2">
            <PageTitle title="Hồ sơ lao động" actions={<FormPageMenu />} />
            <div className="flex items-center justify-between min-h-[40px] mt-3">
                <div className="flex items-center gap-3">
                    <span>Total 0</span>
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex items-center justify-center w-7 h-7 text-gray-400 dark:bg-cinder-600 rounded dark:hover:text-gray-200 transition">
                        <i className="fi fi-rr-plus"></i>
                        <span className="hidden">Add new</span>
                    </button>
                </div>
            </div>
            <div className="mt-6">
                <Empty description="No data" />
            </div>
        </div>
    );
}

export default PrintTemplates;
