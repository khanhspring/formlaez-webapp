import RestClient from "../configurations/axios-config";


export function getTokenByCode(code: string) {
  return RestClient.get("/auth/token?code=" + code).then((response) => {
    return response.data;
  });
}

export function logout() {
  return new Promise<any>((resolve) => setTimeout(() => resolve(true), 0));
}

export function validate(token: string) {
  return RestClient.post("/auth/token/validation", { token }).then(
    (response) => {
      return response.data;
    }
  );
}

const AuthService = {
  getTokenByCode,
  logout,
  validate,
};

export default AuthService;
