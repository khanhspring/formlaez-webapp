import { useMutation } from "@tanstack/react-query";
import PageViewService from "../../services/page-view-service";

export default function useUnPublishPageView() {
   return useMutation((id: number) => PageViewService.unPublish(id));
}