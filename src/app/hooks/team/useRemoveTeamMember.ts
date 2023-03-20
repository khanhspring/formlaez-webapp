import { useMutation } from "@tanstack/react-query";
import { RemoveTeamMemberRequest } from "../../models/team";
import TeamService from "../../services/team-service";

export default function useRemoveTeamMember() {
   return useMutation((request: RemoveTeamMemberRequest) => TeamService.removeMember(request));
}