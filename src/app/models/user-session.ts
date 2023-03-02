import { MemberWorkspaceResponse } from "./workspace";

export type UserSessionResponse = {
    lastAccessedWorkspace?: MemberWorkspaceResponse;
    joinedWorkspaces?: MemberWorkspaceResponse[];
    onboarded: boolean;
}