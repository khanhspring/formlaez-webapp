import { useMutation } from "@tanstack/react-query";
import { UpdateWorkspaceMemberRoleRequest } from "../../models/workspace";
import WorkspaceService from "../../services/workspace-service";

export default function useUpdateWorkspaceMemberRole() {
   return useMutation((request: UpdateWorkspaceMemberRoleRequest) => WorkspaceService.updateMemberRole(request));
}