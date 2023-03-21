import { useMutation } from "@tanstack/react-query";
import DocumentTemplateService from "../../services/document-template-service";

export default function useRemoveDocumentTemplate() {
   return useMutation((id: number) => DocumentTemplateService.remove(id));
}