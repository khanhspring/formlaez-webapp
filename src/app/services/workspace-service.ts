import RestClient from "../configurations/axios-config";
import { PageResponse, ResponseId } from "../models/common";
import { AddWorkspaceMemberRequest, CreateWorkspaceRequest, SearchWorkspaceMemberRequest, UpdateWorkspaceRequest, Workspace, WorkspaceMember } from "../models/workspace";

export function create(request: CreateWorkspaceRequest): Promise<ResponseId> {
    return RestClient
        .post<ResponseId>("/admin/workspaces", request)
        .then(response => response.data);;
}

export function update(request: UpdateWorkspaceRequest): Promise<any> {
    return RestClient
        .put<any>("/admin/workspaces/" + request.id, request)
        .then(response => response.data);;
}

function getByCode(workspaceCode?: string): Promise<Workspace> {
    return RestClient.get<any>("/admin/workspaces/" + workspaceCode).then(
      (response) => response.data
    );
}

function searchMembers(request?: SearchWorkspaceMemberRequest): Promise<PageResponse<WorkspaceMember>> {
    return RestClient.get<any>("/admin/workspaces/" + request?.workspaceId + "/members").then(
      (response) => response.data
    );
}

export function addMember(request: AddWorkspaceMemberRequest): Promise<ResponseId> {
    return RestClient
        .post<ResponseId>("/admin/workspaces/" + request.workspaceId + "/members", request)
        .then(response => response.data);;
}

const WorkspaceService = {
    create,
    update,
    getByCode,
    searchMembers,
    addMember
};

export default WorkspaceService;