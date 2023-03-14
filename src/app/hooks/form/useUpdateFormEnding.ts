import { useMutation } from "@tanstack/react-query";
import { UpdateFormEndingRequest } from "../../models/form-ending";
import FormEndingService from "../../services/form-ending-service";

export default function useUpdateFormEnding() {
   return useMutation((request: UpdateFormEndingRequest) => FormEndingService.update(request));
}