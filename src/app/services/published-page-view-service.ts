import RestClient from "../configurations/axios-config";
import { PageResponse } from "../models/common";
import { PageView, SearchPageViewDataRequest } from "../models/page-view";

function findByCode(code?: string): Promise<PageView> {
  return RestClient.get<any>("/page-views/" + code)
  .then((response) => response.data);
}

function getPageViewData(request: SearchPageViewDataRequest): Promise<PageResponse<any>> {
  return RestClient.get<any>("/page-views/" + request.pageViewCode + "/data", {params: request})
  .then((response) => response.data);
}

const PublishedPageViewService = {
  findByCode,
  getPageViewData
};

export default PublishedPageViewService;
