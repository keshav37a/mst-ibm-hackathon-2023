import Cookie from "js-cookie";

export const getUserCookieValidity = () => {
  const userFromCookie = Cookie.get("user");
  if (
    userFromCookie &&
    JSON.parse(userFromCookie) &&
    JSON.parse(userFromCookie).token
  ) {
    return true;
  }
  return false;
};

export const getUserFromCookie = () => {
  const userFromCookie = Cookie.get("user");
  if (
    userFromCookie &&
    JSON.parse(userFromCookie) &&
    JSON.parse(userFromCookie).token
  ) {
    return JSON.parse(userFromCookie);
  }
  return null;
};
