import { useRouteLoaderData } from "react-router-dom";
import { UserSession } from "../../models/user-session";
import { Workspace, WorkspaceMemberRole } from "../../models/workspace";

export type WorkspaceContext = {
  role?: WorkspaceMemberRole;
  isOwner: boolean;
}

export default function useWorkspaceContext(): WorkspaceContext {

  const workspace = useRouteLoaderData("workspace") as Workspace;
  const userSession = useRouteLoaderData('private') as UserSession;
  const joinedWorkspaces = userSession?.joinedWorkspaces?.filter(item => item.workspace.code === workspace.code) || [];

  if (joinedWorkspaces.length === 0) {
    return {
      isOwner: false
    }
  }

  const role = joinedWorkspaces[0].role;

  return {
    role: joinedWorkspaces[0].role,
    isOwner: role === 'Owner'
  }
}
