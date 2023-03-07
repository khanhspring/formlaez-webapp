import { useQuery } from "@tanstack/react-query";
import FormService from "../../services/form-service";

export default function useForm(code?: string) {
  return useQuery({
    queryKey: ["form", code],
    queryFn: () => FormService.findFormByCode(code),
    enabled: !!code
  });
}
