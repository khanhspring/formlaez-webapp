import { useMutation } from "@tanstack/react-query";
import { ConfirmSignUpRequest } from "../../models/sign-up";
import SignUpService from "../../services/signup-service";

export default function useConfirmSignUp() {
   return useMutation((request: ConfirmSignUpRequest) => SignUpService.confirmSignUp(request));
}