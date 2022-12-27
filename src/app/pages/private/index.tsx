import FormItem from "../../components/common/form-item";
import { Link } from 'react-router-dom';

function Private() {
    return (
        <div className="w-full flex flex-col gap-2">
            <div className="flex items-center justify-between min-h-[40px]">
                <div className="flex items-center gap-3">
                    <span>Total 72</span>
                    <div className="relative">
                        <div className="absolute w-7 h-full flex items-center justify-center text-xs text-gray-500">
                            <i className="fi fi-rr-search"></i>
                        </div>
                        <input placeholder="Search" className="px-1 py-1.5 pl-7 dark:bg-cinder-700 rounded outline-none text-sm" />
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex items-center justify-center w-7 h-7 text-gray-400 dark:bg-cinder-600 rounded dark:hover:text-gray-200 transition">
                        <i className="fi fi-rr-plus"></i>
                        <span className="hidden">Add new</span>
                    </button>
                    <button className="flex items-center justify-center w-7 h-7 text-gray-400 dark:bg-cinder-600 rounded dark:hover:text-gray-200 transition">
                        <i className="fi fi-rr-heart"></i>
                        <span className="hidden">Favorite</span>
                    </button>
                    <button className="flex items-center justify-center w-7 h-7 text-gray-400 dark:bg-cinder-600 rounded dark:hover:text-gray-200 transition">
                        <i className="fi fi-rr-apps"></i>
                        <span className="hidden">Grid</span>
                    </button>
                    <button className="flex items-center justify-center w-7 h-7 text-gray-400 dark:bg-cinder-600 rounded dark:hover:text-gray-200 transition">
                        <i className="fi fi-rr-menu-burger"></i>
                        <span className="hidden">List</span>
                    </button>
                </div>
            </div>
            <div className="grid gap-5 grid-cols-1 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 mt-6">
                <Link to="/pages/example-page">
                    <FormItem />
                </Link>
                <Link to="/pages/example-page">
                    <FormItem favorite={true} />
                </Link>
                <Link to="/pages/example-page">
                    <FormItem />
                </Link>
                <Link to="/pages/example-page">
                    <FormItem />
                </Link>
                <Link to="/pages/example-page">
                    <FormItem favorite={true} />
                </Link>
                <Link to="/pages/example-page">
                    <FormItem />
                </Link>
                <Link to="/pages/example-page">
                    <FormItem />
                </Link>
                <Link to="/pages/example-page">
                    <FormItem />
                </Link>
            </div>
        </div>
    );
}

export default Private;
