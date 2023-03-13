import { MemberWorkspaceResponse } from "./workspace";

export type UserSession = {
    lastAccessedWorkspace?: MemberWorkspaceResponse;
    joinedWorkspaces?: MemberWorkspaceResponse[];
    onboarded: boolean;
}