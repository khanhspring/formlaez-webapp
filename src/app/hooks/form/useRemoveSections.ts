import { useMutation } from "@tanstack/react-query";
import FormSectionService from "../../services/form-section-service";

export default function useRemoveSections() {
  return useMutation((codes: string[]) => FormSectionService.removeAll(codes));
}
