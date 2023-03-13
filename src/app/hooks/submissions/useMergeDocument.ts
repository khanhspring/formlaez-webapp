import { useMutation } from "@tanstack/react-query";
import { MergeDocumentRequest } from "../../models/form-submission";
import FormSubmissionService from "../../services/form-submission-service";

export default function useMergeDocument() {
   return useMutation((request: MergeDocumentRequest) => FormSubmissionService.mergeDocument(request));
}