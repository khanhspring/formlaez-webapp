import RestClient from "../configurations/axios-config";
import { PageResponse, ResponseCode } from "../models/common";
import { CreateFormSubmissionRequest, FormSubmission, SearchFormSubmissionRequest, UpdateFormSubmissionRequest } from "../models/form-submission";
import StringUtils from "../util/string-utils";

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

function search(request: SearchFormSubmissionRequest): Promise<PageResponse<FormSubmission>> {
  const q = StringUtils.toQuery(request);
  return RestClient.get<any>("/admin/forms/" + request.formCode + "/submissions?" + q).then(
    (response) => response.data
  );
}

const FormSubmissionService = {
  create,
  update,
  archive,
  search
};

export default FormSubmissionService;
