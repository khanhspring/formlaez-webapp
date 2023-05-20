import { useMutation } from "@tanstack/react-query";
import { AIFormRequest } from "../../models/ai-form-builder";
import AIFormBuilderService from "../../services/ai-form-builder-service";

export default function useAIGenerateForm() {
   return useMutation((request: AIFormRequest) => AIFormBuilderService.generate(request));
}