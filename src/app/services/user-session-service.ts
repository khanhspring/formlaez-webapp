import RestClient from "../configurations/axios-config";
import { UserSession } from "../models/user-session";

export function getCurrentUserSession(): Promise<UserSession> {
    return RestClient
        .get<UserSession>("/user/session")
        .then(response => response.data);;
}

const UserSessionService = {
    getCurrentUserSession
};

export default UserSessionService;