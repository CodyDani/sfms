import api from "./axios";

export const getDashboardSummary = async () => {
  const response = await api.get("dashboard/summary.php");

  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get("profile/me.php");

  return response.data;
};
