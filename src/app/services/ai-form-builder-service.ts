import RestClient from "../configurations/axios-config";
import { AIFormRequest, AIFormResult } from "../models/ai-form-builder";

function generate(request: AIFormRequest): Promise<AIFormResult> {
  const formData = new FormData();
  formData.append("message", request.message);
  if (request.apiKey) {
    formData.append("apiKey", request.apiKey.apiKey);
    formData.append("apiModel", request.apiKey.model);
  }
  formData.append("formId", request.formId + "");
  if (request.file) {
    formData.append("file", request.file);
  }

  return RestClient.post<AIFormResult>("/admin/forms/ai/generate", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  }).then((response) => response.data);
}

const AIFormBuilderService = {
  generate,
};

export default AIFormBuilderService;
