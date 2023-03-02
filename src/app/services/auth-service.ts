import RestClient from "../configurations/axios-config";

import { removeToken } from './token-storage-service';


export function getTokenByCode(code: string) {
    return RestClient
        .get("/auth/token?code=" + code)
        .then((response) => {
            return response.data;
        });
}

export function logout() {
  removeToken();
  return new Promise<any>((resolve) =>
      setTimeout(() => resolve(true), 0)
  );
}

const AuthService = {
  getTokenByCode,
  logout
};

export default AuthService;
