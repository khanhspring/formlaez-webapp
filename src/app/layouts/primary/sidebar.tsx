import Tooltip from 'rc-tooltip';
import { Link, useLocation, useRouteLoaderData } from 'react-router-dom';
import SimpleBar from 'simplebar-react';
import Logo from '../../components/common/logo';
import ZigzagIcon from '../../components/icons/zigzag-icon';
import { Workspace } from '../../models/workspace';
import StringUtils from '../../util/string-utils';

function SideBar() {

    const workspace = useRouteLoaderData("workspace") as Workspace;
    const userSession: any = useRouteLoaderData('private');
    const currentWorkspace = userSession?.lastAccessedWorkspace?.workspace;
    const { pathname } = useLocation();

    const shortName = StringUtils.firstLetters(currentWorkspace?.name)?.toUpperCase() || 'W';

    const isActive = (include: string, notInclude?: string) => {
        const isInclude = pathname?.includes(include);
        if (!notInclude) {
            return isInclude;
        }
        return isInclude && !pathname?.includes(notInclude);
    }

    return (
        <div className="w-[90px] hidden md:block min-h-screen bg-slate-50 dark:bg-cinder-700 border-r border-slate-900/10 dark:border-transparent">
            <div className="sticky top-0 w-full flex flex-col justify-start">
                <div className="px-3 flex items-center w-full h-[65px] bg-white border-b border-slate-900/10 dark:bg-cinder-800">
                    <Link to="/" className="flex w-full items-center justify-center">
                        <Logo />
                    </Link>
                </div>

                <SimpleBar style={{ maxHeight: 'calc(100vh - 65px)' }}>
                    <div className="py-3 mt-2 flex flex-col gap-1 items-center justify-center">
                        <Tooltip overlay={currentWorkspace?.name || 'Workspace'} placement="right">
                            <div className="text-lg font-semibold flex w-10 h-10 rounded-full ring-2 items-center justify-center select-none bg-gradient-to-r from-cyan-500 to-blue-500 text-white transition">
                                {shortName}
                            </div>
                        </Tooltip>
                        <span className="flex items-center justify-center w-5 h-5 cursor-pointer group">
                            <i className="fi fi-rr-menu-dots text-slate-700 group-hover:text-blue-500 dark:text-gray-400 dark:group-hover:text-gray-200 transition"></i>
                        </span>
                    </div>

                    <div className="flex flex-col justify-center pt-2 gap-1.5">
                        <div className="flex items-center justify-center">
                            <Link
                                to={`/${workspace.code}/p`}
                                className={
                                    "flex gap-2.5 flex-col items-center justify-center w-[70px] h-[70px] rounded-md group transition"
                                    + ` ${isActive('/p') ? 'text-slate-900 dark:text-white' : 'text-slate-900/60 dark:text-slate-500'}`
                                }
                            >
                                <i className="fi fi-rr-user text-xl"></i>
                                <span className="text-xs font-normal">Private</span>
                            </Link>
                        </div>
                        <div className="flex items-center justify-center">
                            <Link
                                to={`/${workspace.code}/t`}
                                className={
                                    "flex gap-2.5 flex-col items-center justify-center w-[70px] h-[70px] rounded-md group transition"
                                    + ` ${isActive('/t') ? 'text-slate-900 dark:text-white' : 'text-slate-900/60 dark:text-slate-500'}`
                                }
                            >
                                <i className="fi fi-rr-users-alt text-xl"></i>
                                <span className="text-xs font-normal">Teams</span>
                            </Link>
                        </div>

                        <div className="py-2 flex items-center justify-center">
                            <span className="w-5">
                                <ZigzagIcon className="fill-slate-900/60 dark:fill-gray-700/90" />
                            </span>
                        </div>

                        <div className="flex items-center justify-center">
                            <Link
                                to={`/${workspace.code}/settings`}
                                className={
                                    "flex gap-2.5 flex-col items-center justify-center w-[70px] h-[70px] rounded-md group transition"
                                    + ` ${isActive('settings', '/f/') ? 'text-slate-900 dark:text-white' : 'text-slate-900/60 dark:text-slate-500'}`
                                }
                            >
                                <i className="fi fi-rr-settings text-xl"></i>
                                <span className="text-xs font-normal">Settings</span>
                            </Link>
                        </div>
                    </div>
                </SimpleBar>
            </div>
        </div>
    );
}

export default SideBar;
