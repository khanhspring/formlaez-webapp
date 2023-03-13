import RestClient from "../configurations/axios-config";
import { ResponseId } from "../models/common";
import { CreateWorkspaceRequest, Workspace } from "../models/workspace";

export function create(request: CreateWorkspaceRequest): Promise<ResponseId> {
    return RestClient
        .post<ResponseId>("/admin/workspaces", request)
        .then(response => response.data);;
}

function getByCode(workspaceCode?: string): Promise<Workspace> {
    return RestClient.get<any>("/admin/workspaces/" + workspaceCode).then(
      (response) => response.data
    );
  }

const WorkspaceService = {
    create,
    getByCode
};

export default WorkspaceService;