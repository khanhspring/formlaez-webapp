import { useMutation } from "@tanstack/react-query";
import { CreateDocumentTemplateRequest } from "../../models/document-template";
import DocumentTemplateService from "../../services/document-template-service";

export default function useCreateDocumentTemplate() {
   return useMutation((request: CreateDocumentTemplateRequest) => DocumentTemplateService.create(request));
}