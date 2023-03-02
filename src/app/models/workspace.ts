const WORKSPACE_TYPES = ['Free', 'Plus', 'Business', 'Enterprise'] as const;
export type WorkspaceType = typeof WORKSPACE_TYPES[number];

const WORKSPACE_MEMBER_ROLES = ['Owner', 'Admin', 'Member'] as const;
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

export type CreateWorkspaceRequest = {
    name: string;
    description?: string;
}

export type MemberWorkspaceResponse = {
    workspace: Workspace;
    role: WorkspaceMemberRole;
    joinedDate: Date;
}