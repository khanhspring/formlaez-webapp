import { useQuery } from "@tanstack/react-query";
import WorkspaceUsageService from "../../services/workspace-usage-service";

export default function useWorkspaceCurrentUsage(workspaceId: number) {
  return useQuery({
    queryKey: ["workspace-usage", workspaceId],
    queryFn: () => WorkspaceUsageService.getCurrentUsage(workspaceId),
  });
}
