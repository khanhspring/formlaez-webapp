import RestClient from "../configurations/axios-config";
import { PageResponse, ResponseCode } from "../models/common";
import { CreateFormSubmissionRequest, FormSubmission, SearchFormSubmissionRequest } from "../models/form-submission";
import StringUtils from "../util/string-utils";

function create(request: CreateFormSubmissionRequest): Promise<ResponseCode> {
  return RestClient.post<ResponseCode>("/forms/" + request.formCode + "/submissions", request).then(
    (response) => response.data
  );
}

function search(request: SearchFormSubmissionRequest): Promise<PageResponse<FormSubmission>> {
  const q = StringUtils.toQuery(request);
  return RestClient.get<any>("/forms/" + request.formCode + "/submissions?" + q).then(
    (response) => response.data
  );
}

const FormSubmissionService = {
  create,
  search
};

export default FormSubmissionService;
