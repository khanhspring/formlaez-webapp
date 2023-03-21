import RestClient from "../configurations/axios-config";
import { ChangeWorkspacePlanRequest, Subscription } from "../models/subscription";

function getCurrentSubscription(workspaceId: number): Promise<Subscription> {
  return RestClient.get<any>(
    "/admin/workspaces/" + workspaceId + "/subscription"
  ).then((response) => response.data);
}

export function changeWorkspacePlan(request: ChangeWorkspacePlanRequest): Promise<any> {
  return RestClient
      .put<any>("/admin/workspaces/" + request.workspaceId + "/subscription/plan", request)
      .then(response => response.data);;
}

const SubscriptionService = {
  getCurrentSubscription,
  changeWorkspacePlan
};

export default SubscriptionService;
