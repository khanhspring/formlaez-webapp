import { UserInfo } from "../slices/auth";

const parseJwt = (token: string) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};

const extractUserInfo = (token: string): UserInfo => {
  const jwt = JwtUtils.parseJwt(token);
  const fullName = jwt["name"];

  if (!fullName) {
    return {
      id: jwt["user_id"],
      email: jwt["email"],
      firstName: 'User',
      lastName: 'Formini'
    }
  }

  const fullNameArr: string[] = fullName.split(" ");
  const lastName = fullNameArr[fullNameArr.length - 1];
  fullNameArr[fullNameArr.length - 1] = "";
  const firstName = fullNameArr.join(" ");

  return {
    id: jwt["user_id"],
    email: jwt["email"],
    firstName: firstName,
    lastName: lastName,
  };
};

const JwtUtils = {
  parseJwt,
  extractUserInfo
};

export default JwtUtils;
