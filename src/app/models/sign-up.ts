export type SignUpRequest = {
    email: string;
}

export type ConfirmSignUpRequest = {
    firstName: string;
    lastName: string;
    password: string;
    verificationCode: string;
    email: string;
}