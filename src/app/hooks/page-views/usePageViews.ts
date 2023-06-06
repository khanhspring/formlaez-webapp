import { useQuery } from "@tanstack/react-query";
import PageViewService from "../../services/page-view-service";

export default function usePageViews(formId?: number) {
  return useQuery({
    queryKey: ["page-views", formId],
    queryFn: () => PageViewService.findByFormId(formId),
    enabled: !!formId
  });
}
