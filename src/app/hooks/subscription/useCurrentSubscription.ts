import { useQuery } from "@tanstack/react-query";
import SubscriptionService from "../../services/subscription-service";

export default function useCurrentSubscription(workspaceId: number) {
  return useQuery({
    queryKey: ["current-subscription", workspaceId],
    queryFn: () => SubscriptionService.getCurrentSubscription(workspaceId),
    enabled: !!workspaceId
  });
}
