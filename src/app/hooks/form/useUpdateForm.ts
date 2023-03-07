import { useMutation } from "@tanstack/react-query";
import { UpdateFormRequest } from "../../models/form";
import FormService from "../../services/form-service";

export default function useUpdateForm() {
   return useMutation((request: UpdateFormRequest) => FormService.update(request));
}