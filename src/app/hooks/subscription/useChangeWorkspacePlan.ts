import { useMutation } from "@tanstack/react-query";
import { ChangeWorkspacePlanRequest } from "../../models/subscription";
import SubscriptionService from "../../services/subscription-service";

export default function useChangeWorkspacePlan() {
   return useMutation((request: ChangeWorkspacePlanRequest) => SubscriptionService.changeWorkspacePlan(request));
}