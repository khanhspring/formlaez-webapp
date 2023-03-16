import { useMutation } from "@tanstack/react-query";
import { UpdateDocumentTemplateRequest } from "../../models/document-template";
import DocumentTemplateService from "../../services/document-template-service";

export default function useUpdateDocumentTemplate() {
   return useMutation((request: UpdateDocumentTemplateRequest) => DocumentTemplateService.update(request));
}
