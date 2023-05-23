import { useQuery } from "@tanstack/react-query";
import WorkspaceService from "../../services/workspace-service";

export default function useWorkspaceOpenApiSetting(workspaceId: number) {
  return useQuery({
    queryKey: ["workspace-openai-api", workspaceId],
    queryFn: () => WorkspaceService.getOpenAIApiSetting(workspaceId)
  });
}
