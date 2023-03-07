import RestClient from "../configurations/axios-config";
import { ResponseId } from "../models/common";
import { CreateFormSectionRequest } from "../models/form";

function create(request: CreateFormSectionRequest): Promise<ResponseId> {
  return RestClient.post<ResponseId>("/forms/sections", request).then(
    (response) => response.data
  );
}

const FormSectionService = {
  create,
};

export default FormSectionService;
