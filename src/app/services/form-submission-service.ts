import RestClient from "../configurations/axios-config";
import { PageResponse, ResponseCode } from "../models/common";
import { CreateFormSubmissionRequest, ExportFormSubmissionRequest, FormSubmission, MergeDocumentRequest, SearchFormSubmissionRequest, UpdateFormSubmissionRequest } from "../models/form-submission";
import { saveFile } from "../util/file-util";

function create(request: CreateFormSubmissionRequest): Promise<ResponseCode> {
  return RestClient.post<ResponseCode>("/forms/" + request.formCode + "/submissions", request).then(
    (response) => response.data
  );
}

function update(request: UpdateFormSubmissionRequest): Promise<ResponseCode> {
  return RestClient.put<ResponseCode>("/admin/forms/submissions/" + request.code, request).then(
    (response) => response.data
  );
}

function archive(code: string): Promise<ResponseCode> {
  return RestClient.post<ResponseCode>("/admin/forms/submissions/" + code + "/archive").then(
    (response) => response.data
  );
}

function mergeDocument(request: MergeDocumentRequest): Promise<any> {
  return RestClient.post<any>(
    "/admin/forms/submissions/" + request.code + "/document-merge",
    request,
    { responseType: "arraybuffer" }
  ).then((response) => {
    saveFile(response, request.fileName);
  });
}

function search(request: SearchFormSubmissionRequest): Promise<PageResponse<FormSubmission>> {
  return RestClient.get<any>("/admin/forms/" + request.formCode + "/submissions", {params: request}).then(
    (response) => response.data
  );
}

function exportCsv(request: ExportFormSubmissionRequest): Promise<any> {
  return RestClient.post<any>(
    "/admin/forms/" + request.formCode + "/submissions/export",
    request,
    { responseType: "arraybuffer" }
  ).then((response) => {
    saveFile(response, request.fileName);
  });
}

function mergeSubmittedDocument(request: MergeDocumentRequest): Promise<any> {
  return RestClient.post<any>(
    "/submissions/" + request.code + "/document-merge",
    request,
    { responseType: "arraybuffer" }
  ).then((response) => {
    saveFile(response, request.fileName);
  });
}

const FormSubmissionService = {
  create,
  update,
  archive,
  mergeDocument,
  search,
  exportCsv,
  mergeSubmittedDocument
};

export default FormSubmissionService;
