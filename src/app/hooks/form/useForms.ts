import { useQuery } from "@tanstack/react-query";
import { SearchFormRequest } from "../../models/form";
import FormService from "../../services/form-service";

export default function useForms(request: SearchFormRequest) {
  return useQuery({
    queryKey: ["forms", request],
    queryFn: () => FormService.search(request),
  });
}
