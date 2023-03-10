import { useQuery } from "@tanstack/react-query";
import { SearchFormSubmissionRequest } from "../../models/form-submission";
import FormSubmissionService from "../../services/form-submission-service";

export default function useSubmissions(request: SearchFormSubmissionRequest) {
  return useQuery({
    queryKey: ["form-submissions", request],
    queryFn: () => FormSubmissionService.search(request),
    enabled: !!request.formCode,
    refetchInterval: 1 * 60 * 1000
  });
}
