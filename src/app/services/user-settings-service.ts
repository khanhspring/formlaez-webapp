import RestClient from "../configurations/axios-config";
import { ChangePasswordRequest } from "../models/user-settings";

export function changePassword(request: ChangePasswordRequest): Promise<any> {
    return RestClient
        .post<any>("/user/settings/change-password", request)
        .then(response => response.data);;
}

const UserSettingsService = {
    changePassword
};

export default UserSettingsService;