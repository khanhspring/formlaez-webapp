import { useQuery } from "@tanstack/react-query";
import TeamService from "../../services/team-service";

export default function useTeam(code?: string) {
  return useQuery({
    queryKey: ["team", code],
    queryFn: () => TeamService.getByCode(code),
    enabled: !!code
  });
}
