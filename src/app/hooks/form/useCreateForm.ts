import { useMutation } from "@tanstack/react-query";
import { CreateFormRequest } from "../../models/form";
import FormService from "../../services/form-service";

export default function useCreateForm() {
   return useMutation((request: CreateFormRequest) => FormService.create(request));
}