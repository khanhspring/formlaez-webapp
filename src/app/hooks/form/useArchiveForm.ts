import { useMutation } from "@tanstack/react-query";
import FormService from "../../services/form-service";

export default function useArchiveForm() {
   return useMutation((id: number) => FormService.archive(id));
}