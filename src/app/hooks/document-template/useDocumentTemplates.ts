import { useQuery } from "@tanstack/react-query";
import { SearchDocumentTemplateRequest } from "../../models/document-template";
import DocumentTemplateService from "../../services/document-template-service";

export default function useDocumentTemplates(request: SearchDocumentTemplateRequest) {
  return useQuery({
    queryKey: ["document-templates", request],
    queryFn: () => DocumentTemplateService.search(request),
    enabled: !!request.formId
  });
}
