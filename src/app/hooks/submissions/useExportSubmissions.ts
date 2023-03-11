import { useMutation } from "@tanstack/react-query";
import { ExportFormSubmissionRequest } from "../../models/form-submission";
import FormSubmissionService from "../../services/form-submission-service";

export default function useExportSubmissions() {
   return useMutation((request: ExportFormSubmissionRequest) => FormSubmissionService.exportCsv(request));
}