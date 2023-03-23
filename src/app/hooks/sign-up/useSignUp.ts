import { useMutation } from "@tanstack/react-query";
import { SignUpRequest } from "../../models/sign-up";
import SignUpService from "../../services/signup-service";

export default function useSignUp() {
   return useMutation((request: SignUpRequest) => SignUpService.signUp(request));
}