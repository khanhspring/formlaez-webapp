import Switch from "rc-switch";
import { Link } from "react-router-dom";

function FormSettings() {
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
            <div className="mt-6 flex flex-col gap-6">
                <h2 className="pb-1 border-b border-cinder-700">Settings</h2>
                <div className="flex items-center justify-between gap-10">
                    <div className="flex flex-col gap-0.5">
                        <h3 className="text-sm">Access scope</h3>
                        <p className="text-xs">
                            Customize access scope for this form
                        </p>
                    </div>
                    <div className="flex items-center">
                        <button className="flex items-center gap-1 px-2.5 h-8 rounded bg-cinder-700 text-sm">
                            <span>Public</span>
                            <i className="fi fi-rr-caret-down"></i>
                        </button>
                    </div>
                </div>
                <div className="flex items-center justify-between gap-10">
                    <div className="flex flex-col gap-0.5">
                        <h3 className="text-sm">Accept response</h3>
                        <p className="text-xs">
                            When disabled, users cannot access this form and cannot submit the response
                        </p>
                    </div>
                    <div className="flex items-center">
                        <Switch />
                    </div>
                </div>
                <div className="flex items-center justify-between gap-10">
                    <div className="flex flex-col gap-0.5">
                        <h3 className="text-sm">Allow to print</h3>
                        <p className="text-xs">
                            Users can download PDF files (based on print templates) as soon as they submit the response
                        </p>
                    </div>
                    <div className="flex items-center">
                        <Switch />
                    </div>
                </div>

                <h2 className="pb-1 border-b border-cinder-700 mt-3">Notifications</h2>
                <div className="flex items-center justify-between gap-10">
                    <div className="flex flex-col gap-0.5">
                        <h3 className="text-sm">Email notifications</h3>
                        <p className="text-xs">
                            Receive email updates on new responses
                        </p>
                    </div>
                    <div className="flex items-center">
                        <Switch />
                    </div>
                </div>

                <h2 className="pb-1 border-b border-cinder-700 mt-3">Danger zone</h2>
                <div className="flex items-center justify-between gap-10">
                    <div className="flex flex-col gap-0.5">
                        <h3 className="text-sm">Archive this form</h3>
                        <p className="text-xs">
                            Mark this form as archived and read-only
                        </p>
                    </div>
                    <div className="flex items-center">
                        <button className="flex items-center gap-1 px-2.5 h-8 rounded bg-cinder-700 text-sm text-rose-700 whitespace-nowrap">
                            <span>Archive this form</span>
                            <i className="fi fi-rr-archive"></i>
                        </button>
                    </div>
                </div>
                <div className="flex items-center justify-between gap-10">
                    <div className="flex flex-col gap-0.5">
                        <h3 className="text-sm">Delete this form</h3>
                        <p className="text-xs">
                            Once you delete this form, there is no going back, all responses to this form will also be deleted. Please be certain
                        </p>
                    </div>
                    <div className="flex items-center">
                        <button className="flex items-center gap-1 px-2.5 h-8 rounded bg-cinder-700 text-sm text-rose-700 whitespace-nowrap">
                            <span>Delete this form</span>
                            <i className="fi fi-rr-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormSettings;
