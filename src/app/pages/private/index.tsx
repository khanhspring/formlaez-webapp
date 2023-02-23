import { useState } from 'react';
import { Link } from 'react-router-dom';
import FormItem from "../../components/common/form-item";
import CreateFormModal from './create-form-modal';

function Private() {

    const [createModalVisible, setCreateModelVisible] = useState(false);


    const showCreateModal = () => {
        setCreateModelVisible(true);
    }

    const closeCreateModal = () => {
        setCreateModelVisible(false);
    }

    return (
        <>
            <div className="w-full flex flex-col gap-2">
                <div className="py-2 border-b dark:bg-cinder-900 border-cinder-600 z-20 sticky top-[64px] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-6 h-6 bg-gradient-to-r from-yellow-600 to-red-600 rounded-full transition group-hover:ring-2">
                            <span className="font-semibold">P</span>
                        </div>
                        <h2 className="font-semibold text-lg">Private</h2>
                    </div>
                    <div className="flex gap-2 text-xs transition">
                        <span className="dark:text-gray-500 dark:hover:text-gray-300 cursor-pointer">Settings</span>
                        <span className="dark:text-gray-500 dark:hover:text-gray-300 cursor-pointer">
                            <i className="fi fi-bs-menu-dots"></i>
                        </span>
                    </div>
                </div>
                <div className="flex items-center justify-between min-h-[40px] mt-3">
                    <div className="flex items-center gap-3">
                        <span>Total 72</span>
                        <div className="relative hidden md:block">
                            <div className="absolute w-7 h-full flex items-center justify-center text-xs text-gray-500">
                                <i className="fi fi-rr-search"></i>
                            </div>
                            <input placeholder="Search" className="px-1 py-1.5 pl-7 dark:bg-cinder-700 rounded outline-none text-sm" />
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            className="flex items-center justify-center w-7 h-7 text-gray-400 dark:bg-cinder-600 rounded dark:hover:text-gray-200 transition"
                            onClick={showCreateModal}
                        >
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
                    <Link to="/private/forms/example-page">
                        <FormItem />
                    </Link>
                    <Link to="/private/forms/example-page">
                        <FormItem favorite={true} />
                    </Link>
                    <Link to="/private/forms/example-page">
                        <FormItem />
                    </Link>
                    <Link to="/private/forms/example-page">
                        <FormItem />
                    </Link>
                    <Link to="/private/forms/example-page">
                        <FormItem favorite={true} />
                    </Link>
                    <Link to="/private/forms/example-page">
                        <FormItem />
                    </Link>
                    <Link to="/private/forms/example-page">
                        <FormItem />
                    </Link>
                    <Link to="/private/forms/example-page">
                        <FormItem />
                    </Link>
                </div>
            </div>
            <CreateFormModal
                visible={createModalVisible}
                onClose={closeCreateModal}
            />
        </>
    );
}

export default Private;
