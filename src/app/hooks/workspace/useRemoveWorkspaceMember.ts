import { useMutation } from "@tanstack/react-query";
import { RemoveWorkspaceMemberRequest } from "../../models/workspace";
import WorkspaceService from "../../services/workspace-service";

export default function useRemoveWorkspaceMember() {
   return useMutation((request: RemoveWorkspaceMemberRequest) => WorkspaceService.removeMember(request));
}