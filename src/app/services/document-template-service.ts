import RestClient from "../configurations/axios-config";
import { PageResponse, ResponseId } from "../models/common";
import { CreateDocumentTemplateRequest, DocumentTemplate, SearchDocumentTemplateRequest, UpdateDocumentTemplateRequest } from "../models/document-template";

function search(request: SearchDocumentTemplateRequest): Promise<PageResponse<DocumentTemplate>> {
  return RestClient.get<any>("/admin/document-templates", { params: request }).then(
    (response) => response.data
  );
}

export function create(request: CreateDocumentTemplateRequest): Promise<ResponseId> {
  const formData = new FormData();
  formData.append("title", request.title);
  if (request.description) {
      formData.append("description", request.description);
  }
  formData.append("formId", request.formId + '');
  formData.append("file", request.file);

  return RestClient
      .post<ResponseId>("/admin/document-templates", formData, {headers: {"Content-Type": "multipart/form-data"}})
      .then(response => response.data);
}

function update(request: UpdateDocumentTemplateRequest): Promise<any> {
  return RestClient.put<ResponseId>("/admin/document-templates/" + request.id, request).then(
    (response) => response.data
  );
}

function getByFormId(formId?: number): Promise<DocumentTemplate[]> {
  return RestClient.get<any>("/document-templates", { params: {formId} }).then(
    (response) => response.data
  );
}

function remove(id: number): Promise<any> {
  return RestClient.delete<ResponseId>("/admin/document-templates/" + id).then(
    (response) => response.data
  );
}

const DocumentTemplateService = {
    search,
    create,
    update,
    getByFormId,
    remove
};

export default DocumentTemplateService;