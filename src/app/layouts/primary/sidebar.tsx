import Dropdown from 'rc-dropdown';
import Menu, { MenuItem } from 'rc-menu';
import Tooltip from 'rc-tooltip';
import { Link, useLocation, useNavigate, useRouteLoaderData } from 'react-router-dom';
import Logo from '../../components/common/logo';
import ZigzagIcon from '../../components/icons/zigzag-icon';
import { FreePlan, Plans } from '../../constants/plans';
import useWorkspaceContext from '../../hooks/auth/useWorkspaceContext';
import { UserSession } from '../../models/user-session';
import { Workspace } from '../../models/workspace';
import StringUtils, { firstLetters } from '../../util/string-utils';
import { ChevronDoubleDownIcon, Cog6ToothIcon, UserGroupIcon, UserIcon } from '@heroicons/react/24/outline'

function SideBar() {

    const workspace = useRouteLoaderData("workspace") as Workspace;
    const userSession = useRouteLoaderData('private') as UserSession;
    const workspaceContext = useWorkspaceContext();
    const currentPlan = Plans[workspace.type] || FreePlan;

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
                                <span className='text-xs font-light inline-block px-1.5 py-0.5 rounded-xl bg-slate-200 dark:bg-slate-800'>Current</span>
                            }
                        </div>
                    </MenuItem>
                )
            }
        </Menu>
    )

    return (
        <div className="w-[290px] hidden md:block min-h-screen dark:bg-gray-900 border-r border-slate-900/10 dark:border-gray-800">
            <div className="sticky top-0 w-full h-full flex flex-col justify-start">
                <div className="px-2 flex items-center w-full h-[65px] bg-white border-b border-slate-900/10 dark:bg-gray-900 dark:border-gray-800">
                    <div className="flex w-full items-center justify-between gap-3 px-4">
                        <Logo />
                        <Dropdown overlay={switchWorkspaceDropdown} placement="bottomLeft" trigger={['click']}>
                            <div className='px-4 py-2 bg-slate-100 dark:bg-gray-800 rounded-3xl flex justify-center items-center gap-2 cursor-pointer'>
                                <span className='font-bold'>{shortName}</span>
                                <span className={
                                    'w-7 h-7 flex items-center justify-center rounded-full ring-2'
                                    + ` ${currentPlan.code === 'Free' ? 'bg-gray-400' : ''}`
                                    + ` ${currentPlan.code === 'Plus' ? 'bg-yellow-600' : ''}`
                                    + ` ${currentPlan.code === 'Business' ? 'bg-rose-700' : ''}`
                                }>
                                    {currentPlan.icon}
                                </span>
                                <ChevronDoubleDownIcon className='w-4 h-4' />
                            </div>
                        </Dropdown>
                    </div>
                </div>

                <div className="flex-1 flex flex-col py-2">
                    <div className='w-full flex flex-col items-start px-2 gap-2'>
                        <Link
                            to={`/${workspace.code}/p`}
                            className={
                                "w-full flex items-center gap-2 px-2.5 py-2 transition rounded"
                                + ` ${isActive('Private') ? 'text-slate-900 dark:text-white bg-slate-100 dark:bg-gray-800' : 'text-slate-900 dark:text-slate-500'}`
                            }
                        >
                            <UserIcon className="h-6 w-6 p-0.5 rounded" />
                            <span className="font-normal">Private</span>
                        </Link>
                        <Link
                            to={`/${workspace.code}/t`}
                            className={
                                "w-full flex items-center gap-2 px-2.5 py-2 transition rounded"
                                + ` ${isActive('Team') ? 'text-slate-900 dark:text-white bg-slate-100 dark:bg-gray-800' : 'text-slate-900 dark:text-slate-500'}`
                            }
                        >
                            <UserGroupIcon className="h-6 w-6 p-0.5 rounded" />
                            <span className="font-normal">Teams</span>
                        </Link>
                    </div>

                    {
                        workspaceContext.isOwner &&
                        <div className='w-full flex flex-col items-start px-2 gap-2 mt-2'>
                            <Link
                                to={`/${workspace.code}/settings`}
                                className={
                                    "w-full flex items-center gap-2 px-2.5 py-2 transition rounded"
                                    + ` ${isActive('Settings') ? 'text-slate-900 dark:text-white bg-slate-100 dark:bg-gray-800' : 'text-slate-900 dark:text-slate-500'}`
                                }
                            >
                                <Cog6ToothIcon className="h-6 w-6 p-0.5 rounded" />
                                <span className="font-normal">Settings</span>
                            </Link>
                        </div>
                    }
                </div>
            </div>
        </div >
    );
}

export default SideBar;
