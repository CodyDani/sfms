import api from "./axios";

export const checkAuth = async () => {
  const response = await api.get("auth/check.php");
  return response.data;
};

export const logout = async () => {
  const response = await api.post("auth/logout.php");

  return response.data;
};

export const registerUser = async (userData) => {
  const response = await api.post("auth/register.php", userData);

  return response.data;
};

export const loginUser = async (userData) => {
  const response = await api.post("auth/login.php", userData);

  return response.data;
};
