import jwtDecode from "jwt-decode";

export const isAuthenticated = () => !!sessionStorage.getItem("token");

export const getRole = () => {
  const token = sessionStorage.getItem("token");
  if (!token) return "";

  const decoded = jwtDecode(token);

  return decoded.role;
};

export const logout = () => {
  sessionStorage.removeItem("token");
  window.location.href = "/";
};

export const getDecodedUsername = () => {
  const token = sessionStorage.getItem("token");
  if (!token) return "";

  return jwtDecode(token).sub;
};
