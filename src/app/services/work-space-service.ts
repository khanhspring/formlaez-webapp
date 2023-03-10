import RestClient from "../configurations/axios-config";
import { ResponseId } from "../models/common";
import { CreateWorkspaceRequest } from "../models/workspace";

export function create(request: CreateWorkspaceRequest): Promise<ResponseId> {
    return RestClient
        .post<ResponseId>("/admin/workspaces", request)
        .then(response => response.data);;
}

const WorkspaceService = {
    create
};

export default WorkspaceService;