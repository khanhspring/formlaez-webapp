import { useMutation } from "@tanstack/react-query";
import { CreatePageViewRequest } from "../../models/page-view";
import PageViewService from "../../services/page-view-service";

export default function useCreatePageView() {
   return useMutation((request: CreatePageViewRequest) => PageViewService.create(request));
}