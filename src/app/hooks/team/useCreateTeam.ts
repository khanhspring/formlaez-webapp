import { useMutation } from "@tanstack/react-query";
import { CreateTeamRequest } from "../../models/team";
import TeamService from "../../services/team-service";

export default function useCreateTeam() {
   return useMutation((request: CreateTeamRequest) => TeamService.create(request));
}