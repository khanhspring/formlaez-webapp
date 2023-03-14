import { useQuery } from "@tanstack/react-query";
import FormEndingService from "../../services/form-ending-service";

export default function useFormEnding(formId: number) {
  return useQuery({
    queryKey: ["form-ending", formId],
    queryFn: () => FormEndingService.getByFormId(formId),
  });
}
