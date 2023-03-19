import { Pageable } from "./common";
import { User } from "./user";

export const TEAM_MEMBER_ROLES = ['Owner', 'Member'] as const;
export type TeamMemberRole = typeof TEAM_MEMBER_ROLES[number];

export type Team = {
    id: number;
    code: string;
    name: string;
    description: string;
    createdDate: Date;
    lastModifiedDate: Date;
    members: TeamMember[];
}

export type TeamMember = {
    user: User;
    role: TeamMemberRole;
    joinedDate: Date;
}

export type CreateTeamRequest = {
    name: string;
    description?: string;
    workspaceId: number;
}

export type UpdateTeamRequest = {
    id: number;
    name: string;
    description?: string;
}

export type SearchTeamRequest = Pageable & {
    workspaceId: number;
    keyword?: string;
}

export type AddTeamMemberRequest = {
    teamId: number;
    userId: string;
    role: TeamMemberRole;
}

export type SearchTeamMemberRequest = Pageable & {
    teamId: number;
}