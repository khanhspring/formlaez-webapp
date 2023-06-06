import { useMutation } from "@tanstack/react-query";
import PageViewService from "../../services/page-view-service";

export default function useRemovePageView() {
   return useMutation((id: number) => PageViewService.remove(id));
}