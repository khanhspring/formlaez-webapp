import { Link, Outlet, useLocation, useRouteLoaderData } from "react-router-dom";
import useWorkspaceContext from "../../hooks/auth/useWorkspaceContext";
import { Workspace } from "../../models/workspace";
import StringUtils from "../../util/string-utils";

function Settings() {

    const workspace = useRouteLoaderData("workspace") as Workspace;
    const {pathname} = useLocation();
    const workspaceContext = useWorkspaceContext();

    const isActive = (key: string) => {
        const path = StringUtils.trimCharAtEnd(pathname, "/");
        return path.endsWith(key);
    }

    if (!workspaceContext.isOwner) {
        throw new Error();
    }

    return (
        <div className="flex gap-5 items-start">
            <div className="w-[290px] bg-slate-50 dark:bg-gray-800/50 flex flex-col rounded">
                <div className="px-5 py-4 border-b border-slate-900/10 dark:border-slate-700 flex items-center gap-2 overflow-hidden">
                    <span className="text-sm font-bold whitespace-nowrap text-ellipsis overflow-hidden">
                        {workspace.name}
                    </span>
                </div>
                <div className="flex flex-col p-4 gap-2">
                    <Link to={`/${workspace.code}/settings`}>
                        <div className={
                            "px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-600/80 cursor-pointer text-sm flex items-center gap-2 rounded transition"
                            + ` ${isActive('settings') ? 'bg-slate-100 dark:bg-slate-600/80' : ''}`
                        }>
                            <i className="fi fi-rs-building"></i>
                            <span>Workspace</span>
                        </div>
                    </Link>
                    <Link to={`/${workspace.code}/settings/members`}>
                        <div className={
                            "px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-600/80 cursor-pointer text-sm flex items-center gap-2 rounded transition"
                            + ` ${isActive('members') ? 'bg-slate-100 dark:bg-slate-600/80' : ''}`
                        }>
                            <i className="fi fi-rr-users-alt"></i>
                            <span>Members</span>
                        </div>
                    </Link>
                    <Link to={`/${workspace.code}/settings/billing`}>
                        <div className={
                            "px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-600/80 cursor-pointer text-sm flex items-center gap-2 rounded transition"
                            + ` ${isActive('billing') ? 'bg-slate-100 dark:bg-slate-600/80' : ''}`
                        }>
                            <i className="fi fi-rr-credit-card"></i>
                            <span>Plan & Billing</span>
                        </div>
                    </Link>
                    <Link to={`/${workspace.code}/settings/usages`}>
                        <div className={
                            "px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-600/80 cursor-pointer text-sm flex items-center gap-2 rounded transition"
                            + ` ${isActive('usages') ? 'bg-slate-100 dark:bg-slate-600/80' : ''}`
                        }>
                            <i className="fi fi-rr-pulse"></i>
                            <span>Usages</span>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="flex-1 bg-slate-50 dark:bg-gray-800/50 flex flex-col rounded min-h-full">
                <Outlet />
            </div>
        </div>
    );
}

export default Settings;
