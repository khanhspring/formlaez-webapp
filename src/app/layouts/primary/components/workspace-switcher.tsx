import Dropdown from 'rc-dropdown';
import Menu, { MenuItem } from 'rc-menu';
import { FC } from 'react';
import { useNavigate, useRouteLoaderData } from 'react-router-dom';
import { FreePlan, Plans } from '../../../constants/plans';
import { UserSession } from '../../../models/user-session';
import { Workspace } from '../../../models/workspace';
import StringUtils, { firstLetters } from '../../../util/string-utils';

type Props = {
}

const WorkspaceSwitcher: FC<Props> = ({ }) => {

    const userSession = useRouteLoaderData('private') as UserSession;
    const workspace = useRouteLoaderData("workspace") as Workspace;
    const currentPlan = Plans[workspace.type] || FreePlan;
    const shortName = StringUtils.firstLetters(workspace?.name, 1)?.toUpperCase() || 'W';

    const navigate = useNavigate();

    const switchWorkspace = (workspace: Workspace) => {
        navigate(`/${workspace.code}/p`);
    }

    const switchWorkspaceDropdown = (
        <Menu className="text-sm flex flex-col gap-2">
            <MenuItem className='w-full text-xs dark:text-white' disabled key="-1">
                Your workspaces
            </MenuItem>
            {
                userSession?.joinedWorkspaces?.map((item, index) =>
                    <MenuItem
                        key={index}
                        onClick={() => switchWorkspace(item.workspace)}
                    >
                        <div className="flex gap-3 items-center px-2">
                            <span className='bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center ring-2 text-xs'>
                                {firstLetters(item.workspace.name, 1)}
                            </span>
                            <div className='flex flex-col'>
                                <div className='flex gap-2'>
                                    <span>{item.workspace.name}</span>
                                    {
                                        workspace.code === item.workspace.code &&
                                        <span className='text-xs font-light inline-block px-1.5 py-0.5 rounded-xl bg-slate-200 dark:bg-neutral-700'>Current</span>
                                    }
                                </div>
                                <div className='text-xs opacity-50'>
                                    {item.workspace.type}
                                </div>
                            </div>
                        </div>
                    </MenuItem>
                )
            }
        </Menu>
    );

    return (
        <Dropdown overlay={switchWorkspaceDropdown}>
            <div className="pr-1 flex items-center justify-center bg-slate-700 rounded-lg select-none cursor-pointer text-white ring-2 bg-gradient-to-r from-cyan-500 to-blue-500">
                <div className="h-7 w-7 flex items-center justify-center font-semibold">{shortName}</div>
                <div className={
                    'w-5 h-5 p-1 flex items-center justify-center rounded-full'
                    + ` ${currentPlan.code === 'Free' ? 'bg-neutral-400' : ''}`
                    + ` ${currentPlan.code === 'Plus' ? 'bg-yellow-600' : ''}`
                    + ` ${currentPlan.code === 'Business' ? 'bg-rose-700' : ''}`
                }>
                    {currentPlan.icon}
                </div>
            </div>
        </Dropdown>
    );
}

export default WorkspaceSwitcher;
