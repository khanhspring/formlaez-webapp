import { useMutation } from "@tanstack/react-query";
import { ChangePasswordRequest } from "../../models/user-settings";
import UserSettingsService from "../../services/user-settings-service";

export default function useChangePassword() {
   return useMutation((request: ChangePasswordRequest) => UserSettingsService.changePassword(request));
}