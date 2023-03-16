import RestClient from "../configurations/axios-config";
import {
  Form
} from "../models/form";

function findFormByCode(formCode?: string): Promise<Form> {
  return RestClient.get<any>("/forms/" + formCode, {params: {ignore401: true, ignore403: true}}).then(
    (response) => response.data
  );
}

function getFormDetailByCode(formCode?: string): Promise<Form> {
  return RestClient.get<any>("/forms/" + formCode + "/detail", {params: {ignore401: true, ignore403: true}}).then(
    (response) => response.data
  );
}

const PublishedFormService = {
  findFormByCode,
  getFormDetailByCode
};

export default PublishedFormService;
