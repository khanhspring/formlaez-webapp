import { HomeIcon } from "@heroicons/react/24/solid";
import { Outlet, useRouteLoaderData } from "react-router-dom";
import PageTitle from "../../components/layout/page-title";
import useWorkspaceContext from "../../hooks/auth/useWorkspaceContext";
import { Workspace } from "../../models/workspace";

function Settings() {

    const workspace = useRouteLoaderData("workspace") as Workspace;
    const workspaceContext = useWorkspaceContext();

    if (!workspaceContext.isOwner) {
        throw new Error();
    }

    return (
        <div className="flex-1 w-full flex flex-col gap-2">
            <PageTitle
                title={workspace.name} actions={<></>}
                shortTitle={<HomeIcon className='w-4 h-4' />}
                iconClassName="bg-gradient-to-r from-purple-600 to-rose-600"
            />
            <Outlet />
        </div>
    );
}

export default Settings;
