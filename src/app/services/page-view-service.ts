import RestClient from "../configurations/axios-config";
import { ResponseId } from "../models/common";
import { CreatePageViewRequest, PageView, UpdatePageViewRequest } from "../models/page-view";

function create(request: CreatePageViewRequest): Promise<ResponseId> {
  return RestClient.post<any>(`/admin/forms/${request.formId}/page-views`, request).then(
    (response) => response.data
  );
}

function findByFormId(formId?: number): Promise<PageView[]> {
  return RestClient.get<any>(`/admin/forms/${formId}/page-views`).then(
    (response) => response.data
  );
}

function update(request: UpdatePageViewRequest): Promise<any> {
  return RestClient.put<any>("/admin/page-views/" + request.id, request).then(
    (response) => response.data
  );
}

function publish(id: number): Promise<any> {
  return RestClient.post<any>("/admin/page-views/" + id + "/publish").then(
    (response) => response.data
  );
}

function unPublish(id: number): Promise<any> {
  return RestClient.post<any>("/admin/page-views/" + id + "/unpublish").then(
    (response) => response.data
  );
}

function remove(id: number): Promise<any> {
  return RestClient.delete<any>("/admin/page-views/" + id).then(
    (response) => response.data
  );
}

const PageViewService = {
  create,
  findByFormId,
  update,
  publish,
  unPublish,
  remove
};

export default PageViewService;
