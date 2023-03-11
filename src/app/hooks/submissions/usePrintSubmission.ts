import { useMutation } from "@tanstack/react-query";
import { PrintFormSubmissionRequest } from "../../models/form-submission";
import FormSubmissionService from "../../services/form-submission-service";

export default function usePrintSubmission() {
   return useMutation((request: PrintFormSubmissionRequest) => FormSubmissionService.print(request));
}