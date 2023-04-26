import { ChartPieIcon, CogIcon, CreditCardIcon, LockClosedIcon, Square3Stack3DIcon, UsersIcon } from '@heroicons/react/24/solid';
import { Link, useLocation, useRouteLoaderData } from 'react-router-dom';
import Logo from '../../components/common/logo';
import useWorkspaceContext from '../../hooks/auth/useWorkspaceContext';
import useTeams from '../../hooks/team/useTeams';
import { Workspace } from '../../models/workspace';
import StringUtils, { firstLetters } from '../../util/string-utils';
import UserMenu from './components/user-menu';
import WorkspaceSwitcher from './components/workspace-switcher';
import { useAppDispatch } from '../../hooks/redux-hook';
import { setMenuVisible } from '../../slices/app-config';
import { useEffect } from 'react';

function SideBar() {

    const workspace = useRouteLoaderData("workspace") as Workspace;
    const workspaceContext = useWorkspaceContext();
    const { data: teams } = useTeams({ workspaceId: workspace?.id, page: 0, size: -1 });
    const { pathname } = useLocation();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setMenuVisible(false));
    }, [pathname]);

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

    return (
        <div className="w-full min-h-screen bg-gray-950">
            <div className="sticky top-0">
                <div className="px-7 flex items-center w-full h-[65px]">
                    <div className="flex w-full items-center justify-between gap-3">
                        <Logo />
                        <WorkspaceSwitcher />
                    </div>
                </div>

                <div className="flex-1 flex flex-col py-2 px-7 mt-4">
                    <UserMenu />
                </div>

                <div className="flex-1 flex flex-col py-2 px-4 mt-4">
                    <div className='w-full flex flex-col items-start gap-2'>
                        <Link
                            to={`/${workspace.code}/p`}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded text-white ${isActive('Private') ? 'bg-neutral-800' : 'bg-transparent'}`}
                        >
                            <LockClosedIcon className={`h-5 w-5 ${isActive('Private') ? 'text-white' : 'text-neutral-600'}`} />
                            <span className="font-normal">Private</span>
                        </Link>
                        <Link
                            to={`/${workspace.code}/t`}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded text-white ${isActive('Team') ? 'bg-neutral-800' : 'bg-transparent'}`}
                        >
                            <Square3Stack3DIcon className={`h-5 w-5 ${isActive('Team') ? 'text-white' : 'text-neutral-600'}`} />
                            <span className="font-normal">Teams</span>
                        </Link>
                    </div>

                    {
                        (teams?.content.length || 0) > 0 &&
                        <div className='w-full flex flex-col items-start gap-2 mt-2'>
                            <div className='text-xs px-2.5 py-1 mt-2 text-neutral-400'>
                                Teams
                            </div>
                            {
                                teams?.content.map((item, index) =>
                                    <Link
                                        to={`/${workspace.code}/t/${item.code}`}
                                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded ${isActive('TeamItem', item.code) ? 'bg-neutral-800' : 'bg-transparent'}`}
                                        key={index}
                                    >
                                        <span className={`flex justify-center items-center w-6 h-6 rounded-md border border-neutral-700 bg-neutral-800 text-xs ${isActive('TeamItem', item.code) ? 'text-white' : 'text-neutral-600'}`}>
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
                            <div className='text-xs px-2.5 py-1 mt-2 text-neutral-400'>
                                Workspace
                            </div>
                            <Link
                                to={`/${workspace.code}/settings`}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded text-white ${isActive('Settings') ? 'bg-neutral-800' : 'bg-transparent'}`}
                            >
                                <CogIcon className={`h-5 w-5 ${isActive('Settings') ? 'text-white' : 'text-neutral-600'}`} />
                                <span className="font-normal">Settings</span>
                            </Link>
                            <Link
                                to={`/${workspace.code}/settings/members`}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded text-white ${isActive('Members') ? 'bg-neutral-800' : 'bg-transparent'}`}
                            >
                                <UsersIcon className={`h-5 w-5 ${isActive('Members') ? 'text-white' : 'text-neutral-600'}`} />
                                <span className="font-normal">Members</span>
                            </Link>
                            <Link
                                to={`/${workspace.code}/settings/billing`}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded text-white ${isActive('Billing') ? 'bg-neutral-800' : 'bg-transparent'}`}
                            >
                                <CreditCardIcon className={`h-5 w-5 ${isActive('Billing') ? 'text-white' : 'text-neutral-600'}`} />
                                <span className="font-normal">Plan & Billing</span>
                            </Link>
                            <Link
                                to={`/${workspace.code}/settings/usages`}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded text-white ${isActive('Usages') ? 'bg-neutral-800' : 'bg-transparent'}`}
                            >
                                <ChartPieIcon className={`h-5 w-5 ${isActive('Usages') ? 'text-white' : 'text-neutral-600'}`} />
                                <span className="font-normal">Usages</span>
                            </Link>
                        </div>
                    }
                </div>
            </div>
        </div >
    );
}

export default SideBar;
