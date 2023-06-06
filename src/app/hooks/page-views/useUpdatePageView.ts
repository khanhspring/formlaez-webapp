import { useMutation } from "@tanstack/react-query";
import { UpdatePageViewRequest } from "../../models/page-view";
import PageViewService from "../../services/page-view-service";

export default function useUpdatePageView() {
   return useMutation((request: UpdatePageViewRequest) => PageViewService.update(request));
}