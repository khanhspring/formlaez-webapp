import { useQuery } from "@tanstack/react-query";
import PublishedFormService from "../../services/published-form-service";

export default function usePublishedFormDetail(code?: string) {
  return useQuery<any, any>({
    queryKey: ["published-form-detail", code],
    queryFn: () => PublishedFormService.getFormDetailByCode(code),
    enabled: !!code
  });
}
