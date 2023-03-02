import RestClient from "../configurations/axios-config";
import { UserSessionResponse } from "../models/user-session";

export function getCurrentUserSession(): Promise<UserSessionResponse> {
    return RestClient
        .get<UserSessionResponse>("/user/session")
        .then(response => response.data);;
}

const UserSessionService = {
    getCurrentUserSession
};

export default UserSessionService;