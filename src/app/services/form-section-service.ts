import RestClient from "../configurations/axios-config";
import { ResponseId } from "../models/common";
import { CreateFormSectionRequest, MoveFormSectionRequest, UpdateFormSectionRequest } from "../models/form";

function create(request: CreateFormSectionRequest): Promise<ResponseId> {
  return RestClient.post<ResponseId>("/admin/forms/sections", request).then(
    (response) => response.data
  );
}

function update(request: UpdateFormSectionRequest): Promise<any> {
  return RestClient.put<any>("/admin/forms/sections/" + request.code, request).then(
    (response) => response.data
  );
}

function move(request: MoveFormSectionRequest): Promise<any> {
  return RestClient.post<any>("/admin/forms/sections/" + request.sectionCode + "/move", request).then(
    (response) => response.data
  );
}

function remove(code: string): Promise<any> {
  return RestClient.delete<any>("/admin/forms/sections/" + code).then(
    (response) => response.data
  );
}

const FormSectionService = {
  create,
  update,
  move,
  remove
};

export default FormSectionService;
