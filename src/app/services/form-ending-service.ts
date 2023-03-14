import RestClient from "../configurations/axios-config";
import { FormEnding, UpdateFormEndingRequest } from "../models/form-ending";

function update(request: UpdateFormEndingRequest): Promise<any> {
  return RestClient.post<any>("/admin/forms/" + request.formId + "/ending", request).then(
    (response) => response.data
  );
}

function getByFormId(formId: number): Promise<FormEnding> {
  return RestClient.get<any>("/admin/forms/" + formId + "/ending").then(
    (response) => response.data
  );
}

const FormEndingService = {
  update,
  getByFormId
};

export default FormEndingService;
