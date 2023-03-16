import RestClient from "../configurations/axios-config";
import { ResponseId } from "../models/common";
import { CreateFormFieldRequest, MoveFormFieldRequest, UpdateFormFieldRequest } from "../models/form";

function create(request: CreateFormFieldRequest): Promise<ResponseId> {
  return RestClient.post<ResponseId>("/admin/forms/fields", request).then(
    (response) => response.data
  );
}

function update(request: UpdateFormFieldRequest): Promise<any> {
  return RestClient.put<any>("/admin/forms/fields/" + request.code, request).then(
    (response) => response.data
  );
}

function remove(code: string): Promise<any> {
  return RestClient.delete<any>("/admin/forms/fields/" + code).then(
    (response) => response.data
  );
}

function move(request: MoveFormFieldRequest): Promise<any> {
  return RestClient.post<any>("/admin/forms/fields/" + request.fieldCode + "/move", request).then(
    (response) => response.data
  );
}

const FormFieldService = {
  create,
  update,
  remove,
  move
};

export default FormFieldService;
