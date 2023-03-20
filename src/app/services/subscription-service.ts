import RestClient from "../configurations/axios-config";
import { Subscription } from "../models/subscription";

function getCurrentSubscription(workspaceId: number): Promise<Subscription> {
  return RestClient.get<any>(
    "/admin/workspaces/" + workspaceId + "/subscription"
  ).then((response) => response.data);
}

const SubscriptionService = {
  getCurrentSubscription,
};

export default SubscriptionService;
