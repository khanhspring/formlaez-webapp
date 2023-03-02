import { Tooltip } from 'ez-rc-tooltip';
import { Link, useRouteLoaderData } from 'react-router-dom';
import SimpleBar from 'simplebar-react';
import Logo from '../../components/common/logo';
import ZigzagIcon from '../../components/icons/zigzag-icon';
import StringUtils from '../../util/string-utils';

function SideBar() {

    const userSession: any = useRouteLoaderData('private');
    const currentWorkspace = userSession?.lastAccessedWorkspace?.workspace;

    const shortName = StringUtils.firstLetters(currentWorkspace?.name) || 'W';

    return (
        <div className="w-[90px] hidden md:block min-h-screen dark:bg-cinder-700">
            <div className="sticky top-0 w-full flex flex-col justify-start">
                <div className="px-3 flex items-center w-full h-[65px] dark:bg-cinder-800">
                    <Link to="/" className="flex w-full items-center justify-center">
                        <Logo />
                    </Link>
                </div>

                <SimpleBar style={{ maxHeight: 'calc(100vh - 65px)' }}>
                    <div className="py-3 mt-2 flex flex-col gap-1 items-center justify-center">
                        <Tooltip content={currentWorkspace?.name} placement="right" className="z-[1000]" spacing={2}>
                            <div className="text-lg font-semibold flex w-10 h-10 rounded-full ring-2 ring-blue-700 hover:ring-gray-50 items-center justify-center dark:bg-blue-700 text-gray-200 select-none transition">
                                {shortName}
                            </div>
                        </Tooltip>
                        <span className="flex items-center justify-center w-5 h-5 cursor-pointer group">
                            <i className="fi fi-rr-menu-dots text-gray-400 group-hover:text-gray-200 transition"></i>
                        </span>
                    </div>

                    <div className="flex flex-col justify-center pt-2 gap-1.5">
                        <div className="flex items-center justify-center">
                            <Link to="/" className="flex gap-2.5 flex-col items-center justify-center w-[70px] h-[70px] rounded-md group transition">
                                <i className="fi fi-rr-user text-xl transition dark:group-hover:text-sky-500 dark:text-sky-500"></i>
                                <span className="text-xs font-normal transition dark:group-hover:text-gray-100 dark:text-gray-100">Private</span>
                            </Link>
                        </div>
                        <div className="flex items-center justify-center">
                            <Link to="/teams" className="flex gap-2.5 flex-col items-center justify-center w-[70px] h-[70px] rounded-md group transition">
                                <i className="fi fi-rr-users-alt text-xl transition dark:group-hover:text-sky-500 dark:text-gray-500"></i>
                                <span className="text-xs font-normal transition dark:group-hover:text-gray-100 dark:text-gray-400">Teams</span>
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
                                <span className="text-xs font-normal transition dark:group-hover:text-gray-100 dark:text-gray-400">Billing</span>
                            </Link>
                        </div>
                        <div className="flex items-center justify-center">
                            <Link to="/" className="flex gap-2.5 flex-col items-center justify-center w-[70px] h-[70px] rounded-md group transition">
                                <i className="fi fi-rr-settings text-xl transition dark:group-hover:text-sky-500 dark:text-gray-500"></i>
                                <span className="text-xs font-normal transition dark:group-hover:text-gray-100 dark:text-gray-400">Settings</span>
                            </Link>
                        </div>
                    </div>
                </SimpleBar>
            </div>
        </div>
    );
}

export default SideBar;
