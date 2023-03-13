import { useQuery } from "@tanstack/react-query";
import WorkspaceService from "../../services/work-space-service";

export default function useWorkspace(code?: string) {
  return useQuery({
    queryKey: ["workspace", code],
    queryFn: () => WorkspaceService.getByCode(code),
    enabled: !!code
  });
}
