import { useQuery } from "@tanstack/react-query";
import { SearchWorkspaceMemberRequest } from "../../models/workspace";
import WorkspaceService from "../../services/workspace-service";

export default function useWorkspaceMembers(request?: SearchWorkspaceMemberRequest) {
  return useQuery({
    queryKey: ["workspace-members", request],
    queryFn: () => WorkspaceService.searchMembers(request),
    enabled: !!request?.workspaceId
  });
}
