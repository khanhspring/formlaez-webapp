import { useMutation } from "@tanstack/react-query";
import PageViewService from "../../services/page-view-service";

export default function usePublishPageView() {
   return useMutation((id: number) => PageViewService.publish(id));
}