import { Pageable } from "./common";
import { User } from "./user";

const WORKSPACE_TYPES = ['Free', 'Plus', 'Business', 'Enterprise'] as const;
export type WorkspaceType = typeof WORKSPACE_TYPES[number];

const WORKSPACE_MEMBER_ROLES = ['Owner' , 'Member'] as const;
export type WorkspaceMemberRole = typeof WORKSPACE_MEMBER_ROLES[number];

export type Workspace = {
    id: number;
    code: string;
    name: string;
    type: WorkspaceType;
    description: string;
    createdDate: Date;
    lastModifiedDate: Date;
}

export type WorkspaceMember = {
    user: User;
    role: WorkspaceMemberRole;
    joinedDate: Date;
}

export type CreateWorkspaceRequest = {
    name: string;
    description?: string;
}

export type UpdateWorkspaceRequest = {
    id: number;
    name: string;
    description?: string;
}

export type MemberWorkspaceResponse = {
    workspace: Workspace;
    role: WorkspaceMemberRole;
    joinedDate: Date;
}

export type SearchWorkspaceMemberRequest = Pageable & {
    workspaceId: number;
    keyword?: string;
}

export type AddWorkspaceMemberRequest = {
    workspaceId: number;
    userId: string;
    role: WorkspaceMemberRole;
}

export type RemoveWorkspaceMemberRequest = {
    workspaceId: number;
    userId: string;
}

export type UpdateWorkspaceMemberRoleRequest = {
    workspaceId: number;
    userId: string;
    role: WorkspaceMemberRole;
}