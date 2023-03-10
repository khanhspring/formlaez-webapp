import RestClient from "../configurations/axios-config";
import {
  Form
} from "../models/form";

function findFormByCode(formCode?: string): Promise<Form> {
  return RestClient.get<any>("/forms/" + formCode).then(
    (response) => response.data
  );
}

function getFormDetailByCode(formCode?: string): Promise<Form> {
  return RestClient.get<any>("/forms/" + formCode + "/detail").then(
    (response) => response.data
  );
}

const PublishedFormService = {
  findFormByCode,
  getFormDetailByCode
};

export default PublishedFormService;
