import RestClient from "../configurations/axios-config";
import { ResponseId } from "../models/common";
import { CreateFormFieldRequest, UpdateFormFieldRequest } from "../models/form";

function create(request: CreateFormFieldRequest): Promise<ResponseId> {
  return RestClient.post<ResponseId>("/forms/fields", request).then(
    (response) => response.data
  );
}

function update(request: UpdateFormFieldRequest): Promise<any> {
  return RestClient.put<any>("/forms/fields/" + request.code, request).then(
    (response) => response.data
  );
}

const FormFieldService = {
  create,
  update
};

export default FormFieldService;
