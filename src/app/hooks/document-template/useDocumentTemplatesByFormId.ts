import { useQuery } from "@tanstack/react-query";
import DocumentTemplateService from "../../services/document-template-service";

export default function useDocumentTemplatesByFormId(formId?: number, enabled?: boolean) {
  return useQuery({
    queryKey: ["document-templates-form-id", formId],
    queryFn: () => DocumentTemplateService.getByFormId(formId),
    enabled: !!formId && enabled
  });
}
