import { useMutation } from "@tanstack/react-query";
import { CreateWorkspaceRequest } from "../../models/workspace";
import WorkspaceService from "../../services/workspace-service";

export default function useCreateWorkspace() {
   return useMutation((request: CreateWorkspaceRequest) => WorkspaceService.create(request));
}