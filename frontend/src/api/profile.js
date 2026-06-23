import api from "./axios";

export const getProfile = async () => {
  const response = await api.get("profile/get_profile.php");

  return response.data;
};

export const updateProfile = async (data) => {
  const response = await api.post("profile/update_profile.php", data);

  return response.data;
};

export const changePassword = async (data) => {
  const response = await api.post("profile/change_password.php", data);

  return response.data;
};
