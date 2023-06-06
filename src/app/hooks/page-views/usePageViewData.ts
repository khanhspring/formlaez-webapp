import { useQuery } from "@tanstack/react-query";
import { SearchPageViewDataRequest } from "../../models/page-view";
import PublishedPageViewService from "../../services/published-page-view-service";

export default function usePageViewData(request: SearchPageViewDataRequest) {
  return useQuery({
    queryKey: ["page-views-data", request],
    queryFn: () => PublishedPageViewService.getPageViewData(request),
    enabled: !!request.pageViewCode
  });
}
