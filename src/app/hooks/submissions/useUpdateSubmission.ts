import { useMutation } from "@tanstack/react-query";
import { UpdateFormSubmissionRequest } from "../../models/form-submission";
import FormSubmissionService from "../../services/form-submission-service";

export default function useUpdateSubmission() {
   return useMutation((request: UpdateFormSubmissionRequest) => FormSubmissionService.update(request));
}