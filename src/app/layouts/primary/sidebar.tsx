import { Link } from 'react-router-dom';
import Logo from '../../components/common/logo';
import ZigzagIcon from '../../components/icons/zigzag-icon';

function SideBar() {
    return (
        <div className="w-[90px] hidden md:flex min-h-screen">
            <div className="w-full flex flex-col justify-start dark:bg-cinder-700">
                <div className="sticky top-0 px-3 flex items-center w-full h-[65px] dark:bg-cinder-800">
                    <Link to="/" className="flex w-full items-center justify-center">
                        <Logo />
                    </Link>
                </div>

                <div className="py-3 mt-2 flex flex-col gap-1 items-center justify-center">
                    <div className="text-lg font-semibold flex w-10 h-10 rounded-full ring-2 ring-gray-600 hover:ring-sky-500 items-center justify-center dark:bg-cinder-800 text-gray-200 select-none transition">TX</div>
                    <span className="flex items-center justify-center w-5 h-5 cursor-pointer group">
                        <i className="fi fi-rr-menu-dots text-gray-400 group-hover:text-gray-200 transition"></i>
                    </span>
                </div>

                <div className="flex flex-col justify-center gap-1.5 pt-2">
                    <div className="flex items-center justify-center">
                        <Link to="/" className="flex gap-2.5 flex-col items-center justify-center w-[70px] h-[70px] rounded-md group transition">
                            <i className="fi fi-rr-user text-xl transition dark:group-hover:text-sky-500 dark:text-sky-500"></i>
                            <span className="text-xs font-semibold transition dark:group-hover:text-gray-100 dark:text-gray-100">Private</span>
                        </Link>
                    </div>
                    <div className="flex items-center justify-center">
                        <Link to="/teams" className="flex gap-2.5 flex-col items-center justify-center w-[70px] h-[70px] rounded-md group transition">
                            <i className="fi fi-rr-users-alt text-xl transition dark:group-hover:text-sky-500 dark:text-gray-500"></i>
                            <span className="text-xs font-semibold transition dark:group-hover:text-gray-100 dark:text-gray-400">Teams</span>
                        </Link>
                    </div>

                    <div className="py-2 flex items-center justify-center">
                        <span className="w-5">
                            <ZigzagIcon className="fill-gray-700/90" />
                        </span>
                    </div>

                    <div className="flex items-center justify-center">
                        <Link to="/" className="flex gap-2.5 flex-col items-center justify-center w-[70px] h-[70px] rounded-md group transition">
                            <i className="fi fi-rr-credit-card text-xl transition dark:group-hover:text-sky-500 dark:text-gray-500"></i>
                            <span className="text-xs font-semibold transition dark:group-hover:text-gray-100 dark:text-gray-400">Billing</span>
                        </Link>
                    </div>
                    <div className="flex items-center justify-center">
                        <Link to="/" className="flex gap-2.5 flex-col items-center justify-center w-[70px] h-[70px] rounded-md group transition">
                            <i className="fi fi-rr-settings text-xl transition dark:group-hover:text-sky-500 dark:text-gray-500"></i>
                            <span className="text-xs font-semibold transition dark:group-hover:text-gray-100 dark:text-gray-400">Settings</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SideBar;
