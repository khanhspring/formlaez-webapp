import Avatar from "../../components/common/avatar";
import Breadcrumb from "../../components/common/breadcrumb";

function Header() {

    const changeTheme = () => {
        document.documentElement.classList.toggle("dark");
    }

    return (
        <div className="sticky top-0 z-40 w-full h-[65px] bg-white border-b border-slate-900/10 dark:bg-cinder-700">
            <div className="flex h-full items-center justify-between">
                <Breadcrumb />
                <div className="flex flex-1 gap-2 items-center justify-end px-7">
                    <div className="hidden md:flex flex-1 gap-2 items-center justify-end">
                        <div className="w-9 h-9 p-2 text-lg rounded-full flex items-center justify-center transition cursor-pointer bg-slate-400/10 dark:bg-transparent hover:bg-slate-400/20 dark:hover:bg-cinder-800 group">
                            <i className="fi fi-rr-search text-slate-500 group-hover:text-blue-500 dark:text-gray-400 dark:group-hover:text-gray-100 transition"></i>
                        </div>
                        <div className="w-9 h-9 p-2 text-lg rounded-full flex items-center justify-center transition cursor-pointer bg-slate-400/10 dark:bg-transparent hover:bg-slate-400/20 dark:hover:bg-cinder-800 group">
                            <i className="fi fi-rr-bolt text-slate-500 group-hover:text-blue-500 dark:text-gray-400 dark:group-hover:text-gray-100 transition"></i>
                        </div>
                        <div className="w-9 h-9 p-2 text-lg rounded-full flex items-center justify-center transition cursor-pointer bg-slate-400/10 dark:bg-transparent hover:bg-slate-400/20 dark:hover:bg-cinder-800 group">
                            <i className="fi fi-rr-comment-alt text-slate-500 group-hover:text-blue-500 dark:text-gray-400 dark:group-hover:text-gray-100 transition"></i>
                        </div>
                        <div
                            onClick={changeTheme}
                            className="w-9 h-9 p-2 text-lg rounded-full flex items-center justify-center transition cursor-pointer bg-slate-400/10 dark:bg-transparent hover:bg-slate-400/20 dark:hover:bg-cinder-800 group"
                        >
                            <i className="fi fi-rr-moon-stars text-slate-500 group-hover:text-blue-500 dark:text-gray-400 dark:group-hover:text-gray-100 transition"></i>
                        </div>
                    </div>
                    <div className="p-1 ml-2">
                        <Avatar name="Trần Xuân Khánh" className="w-9 h-9 hover:ring-2" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
