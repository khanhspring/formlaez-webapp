import { useQuery } from "@tanstack/react-query";
import FormDataAnalysisService from "../../services/form-data-analysis";

export default function useFormDataAnalysis(formCode?: string) {
  return useQuery({
    queryKey: ["form-data-analysis", formCode],
    queryFn: () => FormDataAnalysisService.getAnalysis(formCode),
    enabled: !!formCode
  });
}
