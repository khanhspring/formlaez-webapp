import { useQuery } from "@tanstack/react-query";
import PublishedPageViewService from "../../services/published-page-view-service";

export default function usePublishedPageView(code?: string) {
  return useQuery<any, any>({
    queryKey: ["published-page-view", code],
    queryFn: () => PublishedPageViewService.findByCode(code),
    enabled: !!code
  });
}
