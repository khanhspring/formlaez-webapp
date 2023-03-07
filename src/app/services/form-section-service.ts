import RestClient from "../configurations/axios-config";
import { ResponseId } from "../models/common";
import { CreateFormSectionRequest, MoveFormSectionRequest } from "../models/form";

function create(request: CreateFormSectionRequest): Promise<ResponseId> {
  return RestClient.post<ResponseId>("/forms/sections", request).then(
    (response) => response.data
  );
}

function move(request: MoveFormSectionRequest): Promise<any> {
  return RestClient.post<any>("/forms/sections/" + request.sectionCode + "/move", request).then(
    (response) => response.data
  );
}

const FormSectionService = {
  create,
  move
};

export default FormSectionService;
