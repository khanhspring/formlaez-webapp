import RestClient from "../configurations/axios-config";
import { ConfirmSignUpRequest, SignUpRequest } from "../models/sign-up";

export function signUp(request: SignUpRequest): Promise<any> {
    return RestClient
        .post<any>("/auth/sign-up", request)
        .then(response => response.data);;
}

export function confirmSignUp(request: ConfirmSignUpRequest): Promise<any> {
    return RestClient
        .post<any>("/auth/sign-up/confirmations", request)
        .then(response => response.data);;
}

const SignUpService = {
    signUp,
    confirmSignUp
};

export default SignUpService;