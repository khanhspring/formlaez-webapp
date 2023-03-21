import { WorkspaceType } from "./workspace";

export type Subscription = {
    workspaceType: WorkspaceType;
    validFrom: Date;
    validTill: Date;
    cancelUrl: string;
    status: 'Active' | 'Cancelled';
}

export type ChangeWorkspacePlanRequest = {
    type: WorkspaceType;
    workspaceId: number;
}