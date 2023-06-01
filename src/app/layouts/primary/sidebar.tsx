import { ChartPieIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon, CogIcon, CreditCardIcon, LockClosedIcon, Square3Stack3DIcon, UsersIcon } from '@heroicons/react/24/solid';
import { FC } from 'react';
import { Link, useLocation, useRouteLoaderData } from 'react-router-dom';
import SimpleBar from 'simplebar-react';
import Logo from '../../components/common/logo';
import useWorkspaceContext from '../../hooks/auth/useWorkspaceContext';
import { useAppDispatch } from '../../hooks/redux-hook';
import useTeams from '../../hooks/team/useTeams';
import { Workspace } from '../../models/workspace';
import { setMenuVisible } from '../../slices/app-config';
import StringUtils, { firstLetters } from '../../util/string-utils';
import UserMenu from './components/user-menu';
import WorkspaceSwitcher from './components/workspace-switcher';

type Props = {
    collapsed?: boolean;
    setCollapsed?: (val: boolean) => void;
    hideCollapse?: boolean;
}

const SideBar: FC<Props> = ({ collapsed, hideCollapse, setCollapsed = () => { } }) => {

    const workspace = useRouteLoaderData("workspace") as Workspace;
    const workspaceContext = useWorkspaceContext();
    const { data: teams } = useTeams({ workspaceId: workspace?.id, page: 0, size: -1 });
    const { pathname } = useLocation();
    const dispatch = useAppDispatch();

    const isActive = (type: 'Private' | 'Team' | 'TeamItem' | 'Settings' | 'Members' | 'Billing' | 'Usages', suffix?: string) => {
        const workspaceUrlPrefix = "/" + workspace?.code;
        const path = StringUtils.trimCharAtEnd(pathname, '/');

        if (type === 'Team') {
            return path.endsWith(workspaceUrlPrefix + "/t");
        }

        if (type === 'TeamItem') {
            return path.startsWith(workspaceUrlPrefix + "/t/" + suffix);
        }

        if (type === 'Settings') {
            return path.endsWith(workspaceUrlPrefix + "/settings");
        }

        if (type === 'Members') {
            return path.endsWith(workspaceUrlPrefix + "/settings/members");
        }

        if (type === 'Billing') {
            return path.endsWith(workspaceUrlPrefix + "/settings/billing");
        }

        if (type === 'Usages') {
            return path.endsWith(workspaceUrlPrefix + "/settings/usages");
        }

        if (type === 'Private') {
            return path.startsWith(workspaceUrlPrefix + "/p") || (path === workspaceUrlPrefix)
        }
    }

    const closeMenu = () => {
        dispatch(setMenuVisible(false));
    }

    if (collapsed) {
        return (
            <div className="w-full h-full relative">
                <div
                    className='absolute w-7 h-7 bottom-3 -right-3 rounded bg-zinc-200 dark:bg-steel-gray-900 flex items-center justify-center py-2 cursor-pointer z-[1000]'
                    onClick={() => setCollapsed(false)}
                >
                    <ChevronDoubleRightIcon className='w-5 h-5 text-slate-900 dark:text-steel-gray-300' />
                </div>
                <div className="sticky top-0">
                    <div className='w-full'>
                        <div className="px-7 flex items-center w-full h-[65px]">
                            <div className="flex flex-col w-full items-center justify-center gap-3">
                                <WorkspaceSwitcher />
                            </div>
                        </div>

                        <div className="flex-1 flex flex-col py-2 px-2 mt-1">
                            <UserMenu collapsed />
                        </div>
                    </div>
                    <SimpleBar style={{ height: 'calc(100vh - 160px)' }} autoHide={false}>
                        <div className="flex-1 flex flex-col py-2 px-4 mt-4 pb-10">
                            <div className='w-full flex flex-col items-center justify-center gap-2'>
                                <Link
                                    onClick={closeMenu}
                                    to={`/${workspace.code}/p`}
                                    className={`w-full flex items-center justify-center gap-3 px-3 py-2.5 rounded text-white group ${isActive('Private') ? 'bg-zinc-200 dark:bg-zinc-800' : 'bg-transparent'}`}
                                >
                                    <LockClosedIcon className={`h-5 w-5 group-hover:text-zinc-500 dark:group-hover:text-white transition ${isActive('Private') ? 'text-zinc-500 dark:text-white' : 'text-zinc-400 dark:text-zinc-600'}`} />
                                </Link>
                                <Link
                                    onClick={closeMenu}
                                    to={`/${workspace.code}/t`}
                                    className={`w-full flex items-center justify-center gap-3 px-3 py-2.5 rounded text-white group ${isActive('Team') ? 'bg-zinc-200 dark:bg-zinc-800' : 'bg-transparent'}`}
                                >
                                    <Square3Stack3DIcon className={`h-5 w-5 group-hover:text-zinc-500 dark:group-hover:text-white transition ${isActive('Team') ? 'text-zinc-500 dark:text-white' : 'text-zinc-400 dark:text-zinc-600'}`} />
                                </Link>
                            </div>

                            {
                                (teams?.content.length || 0) > 0 &&
                                <div className='w-full flex flex-col items-center justify-center gap-2 mt-2'>
                                    {
                                        teams?.content.map((item, index) =>
                                            <Link
                                                onClick={closeMenu}
                                                to={`/${workspace.code}/t/${item.code}`}
                                                className={`w-full flex items-center justify-center gap-3 px-3 py-2.5 rounded group ${isActive('TeamItem', item.code) ? 'bg-zinc-200 dark:bg-zinc-800' : 'bg-transparent'}`}
                                                key={index}
                                            >
                                                <span className={`flex justify-center items-center w-6 h-6 rounded-md border border-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 text-xs group-hover:text-zinc-600 dark:group-hover:text-white transition ${isActive('TeamItem', item.code) ? 'text-zinc-600 dark:text-white' : 'text-zinc-400 dark:text-zinc-600'}`}>
                                                    {firstLetters(item.name)}
                                                </span>
                                            </Link>
                                        )
                                    }
                                </div>
                            }

                            {
                                workspaceContext.isOwner &&
                                <div className='w-full flex flex-col items-center justify-center gap-2 mt-2'>
                                    <Link
                                        onClick={closeMenu}
                                        to={`/${workspace.code}/settings`}
                                        className={`w-full flex items-center justify-center gap-3 px-3 py-2.5 rounded text-white group ${isActive('Settings') ? 'bg-zinc-200 dark:bg-zinc-800' : 'bg-transparent'}`}
                                    >
                                        <CogIcon className={`h-5 w-5 group-hover:text-zinc-500 dark:group-hover:text-white transition ${isActive('Settings') ? 'text-zinc-500 dark:text-white' : 'text-zinc-400 dark:text-zinc-600'}`} />
                                    </Link>
                                    <Link
                                        onClick={closeMenu}
                                        to={`/${workspace.code}/settings/members`}
                                        className={`w-full flex items-center justify-center gap-3 px-3 py-2.5 rounded text-white group ${isActive('Members') ? 'bg-zinc-200 dark:bg-zinc-800' : 'bg-transparent'}`}
                                    >
                                        <UsersIcon className={`h-5 w-5 group-hover:text-zinc-500 dark:group-hover:text-white transition ${isActive('Members') ? 'text-zinc-500 dark:text-white' : 'text-zinc-400 dark:text-zinc-600'}`} />
                                    </Link>
                                    <Link
                                        onClick={closeMenu}
                                        to={`/${workspace.code}/settings/billing`}
                                        className={`w-full flex items-center justify-center gap-3 px-3 py-2.5 rounded text-white group ${isActive('Billing') ? 'bg-zinc-200 dark:bg-zinc-800' : 'bg-transparent'}`}
                                    >
                                        <CreditCardIcon className={`h-5 w-5 group-hover:text-zinc-500 dark:group-hover:text-white transition ${isActive('Billing') ? 'text-zinc-500 dark:text-white' : 'text-zinc-400 dark:text-zinc-600'}`} />
                                    </Link>
                                    <Link
                                        onClick={closeMenu}
                                        to={`/${workspace.code}/settings/usages`}
                                        className={`w-full flex items-center justify-center gap-3 px-3 py-2.5 rounded text-white group ${isActive('Usages') ? 'bg-zinc-200 dark:bg-zinc-800' : 'bg-transparent'}`}
                                    >
                                        <ChartPieIcon className={`h-5 w-5 group-hover:text-zinc-500 dark:group-hover:text-white transition ${isActive('Usages') ? 'text-zinc-500 dark:text-white' : 'text-zinc-400 dark:text-zinc-600'}`} />
                                    </Link>
                                </div>
                            }
                        </div>
                    </SimpleBar>
                </div>
            </div >
        );
    }

    return (
        <div className="w-full h-full relative">
            {
                !hideCollapse &&
                <div
                    className='absolute w-7 h-7 bottom-3 -right-3 rounded bg-zinc-200 dark:bg-steel-gray-900 flex items-center justify-center py-2 cursor-pointer z-[1000]'
                    onClick={() => setCollapsed(true)}
                >
                    <ChevronDoubleLeftIcon className='w-5 h-5 text-slate-900 dark:text-steel-gray-300' />
                </div>
            }
            <div className="sticky top-0">
                <div className='w-full'>
                    <div className="px-7 flex items-center w-full h-[65px]">
                        <div className="flex w-full items-center justify-between gap-3">
                            <Logo />
                            <WorkspaceSwitcher />
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col py-2 px-7 mt-4">
                        <UserMenu />
                    </div>
                </div>

                <SimpleBar style={{ height: 'calc(100vh - 160px)' }} autoHide={false}>
                    <div className="flex-1 flex flex-col py-2 px-4 mt-4 pb-10">
                        <div className='w-full flex flex-col items-start gap-2'>
                            <Link
                                onClick={closeMenu}
                                to={`/${workspace.code}/p`}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded group ${isActive('Private') ? 'bg-zinc-200 dark:bg-zinc-800' : 'bg-transparent'}`}
                            >
                                <LockClosedIcon className={`h-5 w-5 group-hover:text-zinc-500 dark:group-hover:text-white transition ${isActive('Private') ? 'text-zinc-500 dark:text-white' : 'text-zinc-400 dark:text-zinc-600'}`} />
                                <span className="font-normal">Private</span>
                            </Link>
                            <Link
                                onClick={closeMenu}
                                to={`/${workspace.code}/t`}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded group ${isActive('Team') ? 'bg-zinc-200 dark:bg-zinc-800' : 'bg-transparent'}`}
                            >
                                <Square3Stack3DIcon className={`h-5 w-5 group-hover:text-zinc-500 dark:group-hover:text-white transition ${isActive('Team') ? 'text-zinc-500 dark:text-white' : 'text-zinc-400 dark:text-zinc-600'}`} />
                                <span className="font-normal">Teams</span>
                            </Link>
                        </div>

                        {
                            (teams?.content.length || 0) > 0 &&
                            <div className='w-full flex flex-col items-start gap-2 mt-2'>
                                <div className='text-xs px-2.5 py-1 mt-2 text-zinc-400'>
                                    Teams
                                </div>
                                {
                                    teams?.content.map((item, index) =>
                                        <Link
                                            onClick={closeMenu}
                                            to={`/${workspace.code}/t/${item.code}`}
                                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded group ${isActive('TeamItem', item.code) ? 'bg-zinc-200 dark:bg-zinc-800' : 'bg-transparent'}`}
                                            key={index}
                                        >
                                            <span className={`flex justify-center items-center w-6 h-6 rounded-md border border-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 text-xs group-hover:text-zinc-600 dark:group-hover:text-white transition ${isActive('TeamItem', item.code) ? 'text-zinc-600 dark:text-white' : 'text-zinc-400 dark:text-zinc-600'}`}>
                                                {firstLetters(item.name)}
                                            </span>
                                            <span className="font-normal">{item.name}</span>
                                        </Link>
                                    )
                                }
                            </div>
                        }

                        {
                            workspaceContext.isOwner &&
                            <div className='w-full flex flex-col items-start gap-2 mt-2'>
                                <div className='text-xs px-2.5 py-1 mt-2 text-zinc-400'>
                                    Workspace
                                </div>
                                <Link
                                    onClick={closeMenu}
                                    to={`/${workspace.code}/settings`}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded group ${isActive('Settings') ? 'bg-zinc-200 dark:bg-zinc-800' : 'bg-transparent'}`}
                                >
                                    <CogIcon className={`h-5 w-5 group-hover:text-zinc-500 dark:group-hover:text-white transition ${isActive('Settings') ? 'text-zinc-500 dark:text-white' : 'text-zinc-400 dark:text-zinc-600'}`} />
                                    <span className="font-normal">Settings</span>
                                </Link>
                                <Link
                                    onClick={closeMenu}
                                    to={`/${workspace.code}/settings/members`}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded group ${isActive('Members') ? 'bg-zinc-200 dark:bg-zinc-800' : 'bg-transparent'}`}
                                >
                                    <UsersIcon className={`h-5 w-5 group-hover:text-zinc-500 dark:group-hover:text-white transition ${isActive('Members') ? 'text-zinc-500 dark:text-white' : 'text-zinc-400 dark:text-zinc-600'}`} />
                                    <span className="font-normal">Members</span>
                                </Link>
                                <Link
                                    onClick={closeMenu}
                                    to={`/${workspace.code}/settings/billing`}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded group ${isActive('Billing') ? 'bg-zinc-200 dark:bg-zinc-800' : 'bg-transparent'}`}
                                >
                                    <CreditCardIcon className={`h-5 w-5 group-hover:text-zinc-500 dark:group-hover:text-white transition ${isActive('Billing') ? 'text-zinc-500 dark:text-white' : 'text-zinc-400 dark:text-zinc-600'}`} />
                                    <span className="font-normal">Plan & Billing</span>
                                </Link>
                                <Link
                                    onClick={closeMenu}
                                    to={`/${workspace.code}/settings/usages`}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded group ${isActive('Usages') ? 'bg-zinc-200 dark:bg-zinc-800' : 'bg-transparent'}`}
                                >
                                    <ChartPieIcon className={`h-5 w-5 group-hover:text-zinc-500 dark:group-hover:text-white transition ${isActive('Usages') ? 'text-zinc-500 dark:text-white' : 'text-zinc-400 dark:text-zinc-600'}`} />
                                    <span className="font-normal">Usages</span>
                                </Link>
                            </div>
                        }
                    </div>
                </SimpleBar>
            </div>
        </div >
    );
}

export default SideBar;
