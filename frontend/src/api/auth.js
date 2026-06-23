import api from "./axios";

export const checkAuth = async () => {
  const response = await api.get("auth/check.php");
  return response.data;
};

export const logout = async () => {
  const response = await api.post("auth/logout.php");

  return response.data;
};
