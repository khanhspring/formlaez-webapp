import RestClient from "../configurations/axios-config";
import { PageResponse, ResponseCode, ResponseId } from "../models/common";
import {
  CreateFormRequest,
  Form,
  FormField,
  FormSection,
  SearchFormRequest,
  UpdateFormRequest,
  UpdateFormSettingsRequest
} from "../models/form";

function create(request: CreateFormRequest): Promise<ResponseCode> {
  return RestClient.post<any>("/admin/forms", request).then(
    (response) => response.data
  );
}

function search(request: SearchFormRequest): Promise<PageResponse<Form>> {
  return RestClient.get<any>("/admin/forms", { params: request }).then(
    (response) => response.data
  );
}

function findFormByCode(formCode?: string): Promise<Form> {
  return RestClient.get<any>("/admin/forms/" + formCode).then(
    (response) => response.data
  );
}

function getFormDetailByCode(formCode?: string): Promise<Form> {
  return RestClient.get<any>("/admin/forms/" + formCode + "/detail").then(
    (response) => response.data
  );
}

function update(request: UpdateFormRequest): Promise<any> {
  return RestClient.put<ResponseId>("/admin/forms/" + request.id, request).then(
    (response) => response.data
  );
}

function updateSettings(request: UpdateFormSettingsRequest): Promise<any> {
  return RestClient.put<ResponseId>("/admin/forms/" + request.id + "/settings", request).then(
    (response) => response.data
  );
}

function publish(id: number): Promise<any> {
  return RestClient.post<ResponseId>("/admin/forms/" + id + "/publish").then(
    (response) => response.data
  );
}

function archive(id: number): Promise<any> {
  return RestClient.post<ResponseId>("/admin/forms/" + id + "/archive").then(
    (response) => response.data
  );
}

function remove(id: number): Promise<any> {
  return RestClient.delete<ResponseId>("/admin/forms/" + id).then(
    (response) => response.data
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
  update,
  updateSettings,
  publish,
  archive,
  remove,
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
