import {TOKEN_KEY} from "../constants/global";

const storage = localStorage;

export function saveToken(token: string) {
    storage.setItem(TOKEN_KEY, token);
}

export function removeToken() {
    storage.removeItem(TOKEN_KEY);
}

export function getToken() {
    return storage.getItem(TOKEN_KEY);
}

export function getTokenHeader() {
    return 'Bearer ' + storage.getItem(TOKEN_KEY);
}

export function existsToken() {
    const token = storage.getItem(TOKEN_KEY);
    return !!token;
}

const TokenStorageService = {
    saveToken,
    removeToken,
    getToken,
    getTokenHeader,
    existsToken
};

export default TokenStorageService;