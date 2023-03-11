import { useMutation } from "@tanstack/react-query";
import FormSubmissionService from "../../services/form-submission-service";

export default function useArchiveSubmission() {
   return useMutation((code: string) => FormSubmissionService.archive(code));
}