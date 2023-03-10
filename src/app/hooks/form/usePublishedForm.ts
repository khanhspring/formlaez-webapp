import { useQuery } from "@tanstack/react-query";
import PublishedFormService from "../../services/published-form-service";

export default function usePublishedForm(code?: string) {
  return useQuery({
    queryKey: ["published-form", code],
    queryFn: () => PublishedFormService.findFormByCode(code),
    enabled: !!code
  });
}
