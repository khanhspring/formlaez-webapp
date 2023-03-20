import { useMutation } from "@tanstack/react-query";
import { UpdateTeamMemberRoleRequest } from "../../models/team";
import TeamService from "../../services/team-service";

export default function useUpdateTeamMemberRole() {
   return useMutation((request: UpdateTeamMemberRoleRequest) => TeamService.updateMemberRole(request));
}