import { useMutation } from "@tanstack/react-query";
import { UpdateWorkspaceOpenAIApiRequest } from "../../models/workspace";
import WorkspaceService from "../../services/workspace-service";

export default function useUpdateWorkspaceOpenApi() {
   return useMutation((request: UpdateWorkspaceOpenAIApiRequest) => WorkspaceService.updateOpenAIApiSetting(request));
}