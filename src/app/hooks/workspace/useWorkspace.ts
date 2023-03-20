import { useQuery } from "@tanstack/react-query";
import WorkspaceService from "../../services/workspace-service";

export default function useWorkspace(code?: string, enabled: boolean = true) {
  return useQuery({
    queryKey: ["workspace", code],
    queryFn: () => WorkspaceService.getByCode(code),
    enabled: !!code && !!enabled
  });
}
