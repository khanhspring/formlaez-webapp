import { useMutation } from "@tanstack/react-query";
import { UpdateTeamRequest } from "../../models/team";
import TeamService from "../../services/team-service";

export default function useUpdateTeam() {
   return useMutation((request: UpdateTeamRequest) => TeamService.update(request));
}