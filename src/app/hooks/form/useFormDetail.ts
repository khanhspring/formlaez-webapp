import { useQuery } from "@tanstack/react-query";
import FormService from "../../services/form-service";

export default function useFormDetail(code?: string) {
  return useQuery({
    queryKey: ["form-detail", code],
    queryFn: () => FormService.getFormDetailByCode(code),
    enabled: !!code
  });
}
