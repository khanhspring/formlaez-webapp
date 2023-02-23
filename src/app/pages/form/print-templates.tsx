import { Link } from "react-router-dom";
import Empty from "../../components/common/empty";

function PrintTemplates() {
    return (
        <div className="w-full flex flex-col gap-2">
            <div className="py-2 border-b dark:bg-cinder-900 border-cinder-600 z-20 sticky top-[64px] flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-6 h-6 bg-gradient-to-r from-yellow-600 to-red-600 rounded-full transition group-hover:ring-2">
                        <span className="font-semibold">H</span>
                    </div>
                    <h2 className="font-semibold text-lg">Hợp đồng lao động</h2>
                </div>
                <div className="flex gap-2 text-xs transition">
                    <Link to={"/private/forms/example-page"}>
                        <span className="dark:text-gray-500 dark:hover:text-gray-300 cursor-pointer">Database</span>
                    </Link>
                    <Link to={"/private/forms/example-page/edit"}>
                        <span className="dark:text-gray-500 dark:hover:text-gray-300 cursor-pointer">Builder</span>
                    </Link>
                    <Link to={"/private/forms/example-page/print-templates"}>
                        <span className="dark:text-gray-500 dark:hover:text-gray-300 cursor-pointer">Print templates</span>
                    </Link>
                    <Link to={"/private/forms/example-page/settings"}>
                        <span className="dark:text-gray-500 dark:hover:text-gray-300 cursor-pointer">Settings</span>
                    </Link>
                </div>
            </div>
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
