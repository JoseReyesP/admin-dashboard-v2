export const getAuthTokenFromCookies = () => {
  //extrac token from cookies
  const cookies = document.cookie.split("; ");
  const tokenCookie = cookies.find((cookie) => cookie.startsWith("t="));
  const token = tokenCookie ? tokenCookie.split("=")[1] : null;
  return token;
};
