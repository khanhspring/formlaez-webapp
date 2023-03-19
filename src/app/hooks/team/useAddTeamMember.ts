import { useMutation } from "@tanstack/react-query";
import { AddTeamMemberRequest } from "../../models/team";
import TeamService from "../../services/team-service";

export default function useAddTeamMember() {
   return useMutation((request: AddTeamMemberRequest) => TeamService.addMember(request));
}