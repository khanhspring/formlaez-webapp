import { useMutation } from "@tanstack/react-query";
import FormService from "../../services/form-service";

export default function useRemoveForm() {
   return useMutation((id: number) => FormService.remove(id));
}