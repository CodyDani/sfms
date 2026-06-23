import api from "./axios";

export const getDashboardSummary = async () => {
  const response = await api.get("dashboard/summary.php");

  return response.data;
};
