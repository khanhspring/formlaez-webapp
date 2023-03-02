import { useQuery } from "@tanstack/react-query";
import UserSessionService from "../../services/user-session-service";

export default function useCurrentUserSession() {
  return useQuery({
    queryKey: ["currentUserSession",],
    queryFn: () => UserSessionService.getCurrentUserSession(),
    cacheTime: -1,
  });
}
