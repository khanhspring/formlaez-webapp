import { useQuery } from "@tanstack/react-query";
import { SearchTeamMemberRequest } from "../../models/team";
import TeamService from "../../services/team-service";

export default function useTeamMembers(request: SearchTeamMemberRequest) {
  return useQuery({
    queryKey: ["team-members", request],
    queryFn: () => TeamService.searchMember(request),
    enabled: !!request.teamId
  });
}
