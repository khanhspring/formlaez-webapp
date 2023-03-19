import { useRouteLoaderData } from "react-router-dom";
import { Team, TeamMemberRole } from "../../models/team";
import { selectUserId } from "../../slices/auth";
import { useAppSelector } from "../redux-hook";

export type TeamContext = {
  role?: TeamMemberRole;
  isOwner: boolean;
}

export default function useTeamContext(): TeamContext {

  const team = useRouteLoaderData("team") as Team | undefined;
  const userId = useAppSelector(selectUserId);

  if (!team || !userId) {
    return {
      isOwner: false
    }
  }

  const members = team.members?.filter(item => item.user.id === userId) || [];
  if (members.length === 0) {
    return {
      isOwner: false
    }
  }

  const role = members[0].role;

  return {
    role: role,
    isOwner: role === 'Owner'
  }
}
