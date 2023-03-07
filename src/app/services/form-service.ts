import RestClient from "../configurations/axios-config";
import { PageResponse, ResponseId } from "../models/common";
import {
  CreateFormRequest,
  Form,
  FormField,
  FormSection,
  SearchFormRequest
} from "../models/form";

function create(request: CreateFormRequest): Promise<ResponseId> {
  return RestClient.post<ResponseId>("/forms", request).then(
    (response) => response.data
  );
}

function search(request: SearchFormRequest): Promise<PageResponse<Form>> {
  return RestClient.get<any>("/forms", { params: request }).then(
    (response) => response.data
  );
}

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

function updateForm(request: Form): Promise<any> {
  return new Promise<any>((resolve, rejected) =>
    setTimeout(() => resolve({ id: 1 }), 500)
  );
}

function addFormSection(request: FormSection): Promise<any> {
  return new Promise<any>((resolve, rejected) =>
    setTimeout(() => resolve({ id: 1 }), 500)
  );
}

function addGroupField(request: FormField): Promise<any> {
  return new Promise<any>((resolve, rejected) =>
    setTimeout(() => resolve({ id: 1 }), 500)
  );
}

function reorderSection(request: any): Promise<any> {
  return new Promise<any>((resolve, rejected) =>
    setTimeout(() => resolve({ id: 1 }), 500)
  );
}

function reorderField(request: any): Promise<any> {
  return new Promise<any>((resolve, rejected) =>
    setTimeout(() => resolve({ id: 1 }), 500)
  );
}

function removeSection(request: any): Promise<any> {
  return new Promise<any>((resolve, rejected) =>
    setTimeout(() => resolve({ id: 1 }), 500)
  );
}

function removeField(request: any): Promise<any> {
  return new Promise<any>((resolve, rejected) =>
    setTimeout(() => resolve({ id: 1 }), 500)
  );
}

function updateField(request: any): Promise<any> {
  return new Promise<any>((resolve, rejected) =>
    setTimeout(() => resolve({ id: 1 }), 500)
  );
}

function updateSection(request: any): Promise<any> {
  return new Promise<any>((resolve, rejected) =>
    setTimeout(() => resolve({ id: 1 }), 500)
  );
}

const FormService = {
  create,
  search,
  findFormByCode,
  getFormDetailByCode,
  updateForm,
  addFormSection,
  addGroupField,
  reorderSection,
  reorderField,
  removeSection,
  removeField,
  updateField,
  updateSection,
};

export default FormService;
