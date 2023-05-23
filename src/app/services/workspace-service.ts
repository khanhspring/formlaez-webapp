import RestClient from "../configurations/axios-config";
import { PageResponse, ResponseId } from "../models/common";
import { AddWorkspaceMemberRequest, CreateWorkspaceRequest, RemoveWorkspaceMemberRequest, SearchWorkspaceMemberRequest, UpdateWorkspaceMemberRoleRequest, UpdateWorkspaceOpenAIApiRequest, UpdateWorkspaceRequest, Workspace, WorkspaceMember, WorkspaceOpenAIApiSetting } from "../models/workspace";

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
    return RestClient.get<any>("/admin/workspaces/" + request?.workspaceId + "/members", {params: request}).then(
      (response) => response.data
    );
}

export function addMember(request: AddWorkspaceMemberRequest): Promise<ResponseId> {
    return RestClient
        .post<ResponseId>("/admin/workspaces/" + request.workspaceId + "/members", request)
        .then(response => response.data);;
}

export function removeMember(request: RemoveWorkspaceMemberRequest): Promise<any> {
    return RestClient
        .delete<any>("/admin/workspaces/" + request.workspaceId + "/members/" + request.userId)
        .then(response => response.data);;
}

export function updateMemberRole(request: UpdateWorkspaceMemberRoleRequest): Promise<any> {
    return RestClient
        .put<any>("/admin/workspaces/" + request.workspaceId + "/members/" + request.userId, request)
        .then(response => response.data);;
}

export function getOpenAIApiSetting(workspaceId: number): Promise<WorkspaceOpenAIApiSetting> {
    return RestClient
        .get<any>("/admin/workspaces/" + workspaceId + "/openai-api")
        .then(response => response.data);;
}

export function updateOpenAIApiSetting(request: UpdateWorkspaceOpenAIApiRequest): Promise<any> {
    return RestClient
        .post<any>("/admin/workspaces/" + request.workspaceId + "/openai-api", request)
        .then(response => response.data);;
}

const WorkspaceService = {
    create,
    update,
    getByCode,
    searchMembers,
    addMember,
    removeMember,
    updateMemberRole,
    getOpenAIApiSetting,
    updateOpenAIApiSetting
};

export default WorkspaceService;