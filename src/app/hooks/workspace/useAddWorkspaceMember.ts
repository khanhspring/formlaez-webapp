import { useMutation } from "@tanstack/react-query";
import { AddWorkspaceMemberRequest } from "../../models/workspace";
import WorkspaceService from "../../services/workspace-service";

export default function useAddWorkspaceMember() {
   return useMutation((request: AddWorkspaceMemberRequest) => WorkspaceService.addMember(request));
}