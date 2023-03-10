import { useMutation } from "@tanstack/react-query";
import FormService from "../../services/form-service";

export default function usePublishForm() {
   return useMutation((id: number) => FormService.publish(id));
}