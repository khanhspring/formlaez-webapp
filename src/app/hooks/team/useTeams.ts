import { useQuery } from "@tanstack/react-query";
import { SearchTeamRequest } from "../../models/team";
import TeamService from "../../services/team-service";

export default function useTeams(request: SearchTeamRequest) {
  return useQuery({
    queryKey: ["teams", request],
    queryFn: () => TeamService.search(request),
    enabled: !!request.workspaceId
  });
}
