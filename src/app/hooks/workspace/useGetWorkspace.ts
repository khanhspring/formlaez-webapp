import { useMutation } from "@tanstack/react-query";
import WorkspaceService from "../../services/workspace-service";

export default function useGetWorkspace() {
   return useMutation((code: string) => WorkspaceService.getByCode(code));
}