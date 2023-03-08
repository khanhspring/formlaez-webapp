import { useMutation } from "@tanstack/react-query";
import { CreateFormSubmissionRequest } from "../../models/form-submission";
import FormSubmissionService from "../../services/form-submission-service";

export default function useCreateSubmission() {
   return useMutation((request: CreateFormSubmissionRequest) => FormSubmissionService.create(request));
}