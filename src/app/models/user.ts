import { Pageable } from "./common";

export type User = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
}

export type SearchUserRequest = Pageable & {
    keyword?: string;
    email?: string;
}