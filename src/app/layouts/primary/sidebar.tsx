import Dropdown from 'rc-dropdown';
import Menu, { MenuItem } from 'rc-menu';
import Tooltip from 'rc-tooltip';
import { Link, useLocation, useNavigate, useRouteLoaderData } from 'react-router-dom';
import SimpleBar from 'simplebar-react';
import Logo from '../../components/common/logo';
import ZigzagIcon from '../../components/icons/zigzag-icon';
import useWorkspaceContext from '../../hooks/auth/useWorkspaceContext';
import { UserSession } from '../../models/user-session';
import { Workspace } from '../../models/workspace';
import StringUtils, { firstLetters } from '../../util/string-utils';

function SideBar() {

    const workspace = useRouteLoaderData("workspace") as Workspace;
    const userSession = useRouteLoaderData('private') as UserSession;
    const workspaceContext = useWorkspaceContext();

    const { pathname } = useLocation();
    const navigate = useNavigate();

    const shortName = StringUtils.firstLetters(workspace?.name, 2)?.toUpperCase() || 'W';

    const isActive = (type: 'Private' | 'Team' | 'Settings') => {
        const workspaceUrlPrefix = "/" + workspace?.code;
        const path = StringUtils.trimCharAtEnd(pathname, '/');

        if (type === 'Team') {
            return path.startsWith(workspaceUrlPrefix + "/t");
        }

        if (type === 'Settings') {
            return path.startsWith(workspaceUrlPrefix + "/settings");
        }

        if (type === 'Private') {
            return path.startsWith(workspaceUrlPrefix + "/p")
            || (path === workspaceUrlPrefix)
        }
    }

    const switchWorkspace = (workspace: Workspace) => {
        navigate(`/${workspace.code}/p`);
    }

    const switchWorkspaceDropdown = (
        <Menu className="text-sm">
            {
                userSession?.joinedWorkspaces?.map((item, index) =>
                    <MenuItem key={item.workspace.code} onClick={() => switchWorkspace(item.workspace)}>
                        <div className="flex gap-3 items-center px-2">
                            <span className='bg-gradient-to-r from-cyan-500 to-blue-500 text-white transition rounded-full w-6 h-6 flex items-center justify-center ring-2 text-xs'>
                                {firstLetters(item.workspace.name, 2)}
                            </span>
                            <span>{item.workspace.name}</span>
                            {
                                workspace.code === item.workspace.code &&
                                <span className='text-xs font-light inline-block px-1.5 py-0.5 rounded-xl bg-slate-200 dark:bg-cinder-800'>Current</span>
                            }
                        </div>
                    </MenuItem>
                )
            }
        </Menu>
    )

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
                        <Tooltip overlay={workspace?.name || 'Workspace'} placement="right">
                            <div className="text-lg font-semibold flex w-10 h-10 rounded-full ring-2 items-center justify-center select-none bg-gradient-to-r from-cyan-500 to-blue-500 text-white transition">
                                {shortName}
                            </div>
                        </Tooltip>
                        <Dropdown overlay={switchWorkspaceDropdown} placement="bottomRight" trigger={['click']}>
                            <span className="flex items-center justify-center w-10 h-6 cursor-pointer group text-lg">
                                <i className="fi fi-rr-menu-dots text-slate-700 group-hover:text-blue-500 dark:text-gray-400 dark:group-hover:text-gray-200 transition"></i>
                            </span>
                        </Dropdown>
                    </div>

                    <div className="flex flex-col justify-center pt-2 gap-1.5">
                        <div className="flex items-center justify-center">
                            <Link
                                to={`/${workspace.code}/p`}
                                className={
                                    "flex gap-2.5 flex-col items-center justify-center w-[70px] h-[70px] rounded-md group transition"
                                    + ` ${isActive('Private') ? 'text-slate-900 dark:text-white' : 'text-slate-900/60 dark:text-slate-500'}`
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
                                    + ` ${isActive('Team') ? 'text-slate-900 dark:text-white' : 'text-slate-900/60 dark:text-slate-500'}`
                                }
                            >
                                <i className="fi fi-rr-users-alt text-xl"></i>
                                <span className="text-xs font-normal">Teams</span>
                            </Link>
                        </div>

                        {
                            workspaceContext.isOwner &&
                            <>
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
                                            + ` ${isActive('Settings') ? 'text-slate-900 dark:text-white' : 'text-slate-900/60 dark:text-slate-500'}`
                                        }
                                    >
                                        <i className="fi fi-rr-settings text-xl"></i>
                                        <span className="text-xs font-normal">Settings</span>
                                    </Link>
                                </div>
                            </>
                        }
                    </div>
                </SimpleBar>
            </div>
        </div>
    );
}

export default SideBar;
