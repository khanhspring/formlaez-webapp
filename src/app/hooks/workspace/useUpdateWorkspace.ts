import { useMutation } from "@tanstack/react-query";
import { UpdateWorkspaceRequest } from "../../models/workspace";
import WorkspaceService from "../../services/workspace-service";

export default function useUpdateWorkspace() {
   return useMutation((request: UpdateWorkspaceRequest) => WorkspaceService.update(request));
}