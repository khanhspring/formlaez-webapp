import { useMutation } from "@tanstack/react-query";
import { UpdateFormSettingsRequest } from "../../models/form";
import FormService from "../../services/form-service";

export default function useUpdateFormSettings() {
   return useMutation((request: UpdateFormSettingsRequest) => FormService.updateSettings(request));
}