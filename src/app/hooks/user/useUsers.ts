import { useQuery } from "@tanstack/react-query";
import { SearchUserRequest } from "../../models/user";
import UserService from "../../services/user-service";

export default function useUsers(request?: SearchUserRequest) {
  return useQuery({
    queryKey: ["users", request],
    queryFn: () => UserService.search(request),
    enabled: !!request?.keyword || !!request?.email
  });
}
